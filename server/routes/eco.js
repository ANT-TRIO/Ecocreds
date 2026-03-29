const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { getEcoScore, getBestAlternative } = require("../services/geminiService");

const jsonPath = path.join(__dirname, "..", "src", "data", "products_with_images.json");
let productsCache = null;

function loadProducts() {
  if (!productsCache) {
    const raw = fs.readFileSync(jsonPath, "utf8");
    productsCache = JSON.parse(raw);
  }
  return productsCache;
}

// ─────────────────────────────────────────────────────────────
//  Helper: find candidates from DB matching a search query
//  Returns products whose name OR category contains the query.
//  Excludes the original product by its _id.
// ─────────────────────────────────────────────────────────────
function findCandidates(searchQuery, excludeId) {
  const products = loadProducts();
  const q = (searchQuery || "").toLowerCase().trim();

  return products.filter((p) => {
    if (excludeId && (p._id === excludeId || String(p._id) === String(excludeId))) {
      return false; // skip the original product
    }
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    );
  });
}

// ═══════════════════════════════════════════════════════════
//  POST /eco/score
//  Body: full product object
//  Returns: ecoScore, carbonFootprint, breakdown, badges, explanation
// ═══════════════════════════════════════════════════════════
router.post("/score", async (req, res) => {
  const product = req.body;

  if (!product || !product.name) {
    return res.status(400).json({
      success: false,
      message: "Request body must include at least a product name.",
    });
  }

  try {
    const result = await getEcoScore(product);
    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("[/eco/score]", error);
    return res.status(500).json({ success: false, message: "Eco score calculation failed." });
  }
});

// ═══════════════════════════════════════════════════════════
//  POST /eco/alternative
//
//  Body:
//    product     – the product the user is currently viewing
//    searchQuery – the original search term (to find similar DB items)
//
//  Flow:
//    1. Find candidate products in DB matching searchQuery (exclude current product).
//    2. Ask Gemini to pick the best eco-friendly alternative by NAME.
//    3. Fuzzy-match the returned name back to a DB record.
//    4. Call getEcoScore() for the chosen alternative.
//    5. Return the alternative product + its eco score.
// ═══════════════════════════════════════════════════════════
router.post("/alternative", async (req, res) => {
  const { product, searchQuery } = req.body;

  if (!product || !searchQuery) {
    return res.status(400).json({
      success: false,
      message: "Both 'product' and 'searchQuery' are required.",
    });
  }

  try {
    // ── Step 1: find candidates ──────────────────────────────
    const candidates = findCandidates(searchQuery, product._id);

    if (candidates.length === 0) {
      return res.json({
        success: true,
        data: {
          found: false,
          message: "No similar products found in the database for this search.",
          alternative: null,
          ecoScore: null,
        },
      });
    }

    // ── Step 2: ask Gemini for the best alternative name ─────
    const { productName, reason } = await getBestAlternative(product, candidates);

    if (!productName) {
      return res.json({
        success: true,
        data: {
          found: false,
          message: "AI could not determine a greener alternative.",
          alternative: null,
          ecoScore: null,
        },
      });
    }

    // ── Step 3: fuzzy-match name → DB record ─────────────────
    //   First try exact match (case-insensitive), then substring match.
    const nameLower = productName.toLowerCase();
    let matchedProduct =
      candidates.find((p) => p.name.toLowerCase() === nameLower) ||
      candidates.find((p) => p.name.toLowerCase().includes(nameLower)) ||
      candidates.find((p) => nameLower.includes(p.name.toLowerCase()));

    // Absolute fallback: first candidate if nothing matched
    if (!matchedProduct) {
      console.warn(
        `[/eco/alternative] Could not match "${productName}" to a DB record. Using first candidate.`
      );
      matchedProduct = candidates[0];
    }

    // ── Step 4: get eco score for the chosen alternative ─────
    const alternativeEcoScore = await getEcoScore(matchedProduct);

    // ── Step 5: respond ──────────────────────────────────────
    return res.json({
      success: true,
      data: {
        found: true,
        alternative: matchedProduct,
        ecoScore: alternativeEcoScore,
        aiReason: reason,
      },
    });
  } catch (error) {
    console.error("[/eco/alternative]", error);
    return res.status(500).json({ success: false, message: "Alternative recommendation failed." });
  }
});

module.exports = router;