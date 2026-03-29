const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─────────────────────────────────────────────
//  CARBON INTENSITY REFERENCE TABLE (kg CO₂e)
//  Used inside prompts so Gemini reasons from
//  real-world emission factors, not guesswork.
// ─────────────────────────────────────────────
const CARBON_REFERENCE = `
MATERIAL CARBON INTENSITY (kg CO₂e per kg of material):
  - Virgin Plastic (PET/PP/PE): 3.5 – 6.0
  - Recycled Plastic:           1.5 – 2.5
  - Aluminium (virgin):         8.0 – 12.0
  - Aluminium (recycled):       0.5 – 1.0
  - Steel (virgin):             1.8 – 2.5
  - Steel (recycled):           0.4 – 0.8
  - Glass:                      0.8 – 1.2
  - Cotton (conventional):      5.0 – 8.0
  - Organic Cotton:             2.0 – 3.5
  - Polyester fabric:           5.5 – 7.0
  - Wood / Bamboo:              0.1 – 0.5
  - Paper / Cardboard:          0.7 – 1.2
  - Leather:                    14.0 – 20.0
  - Rubber (natural):           1.0 – 2.0
  - Ceramic / Porcelain:        1.0 – 2.0
  - Silicone:                   3.0 – 5.0

PACKAGING CARBON INTENSITY (kg CO₂e per unit):
  - No packaging / minimal:     0.01 – 0.05
  - Recycled cardboard box:     0.1 – 0.3
  - Virgin cardboard:           0.2 – 0.5
  - Plastic wrap / bag:         0.3 – 0.8
  - Styrofoam / foam:           0.5 – 1.5
  - Excessive multi-layer:      1.0 – 2.5

ECO SCORE FORMULA (0 – 100, higher = greener):
  Score = 100 – (normalised total carbon footprint × 100)
  Where total = material_carbon + packaging_carbon + manufacturing_overhead
  Clamp final score between 0 and 100.
`;

// ─────────────────────────────────────────────
//  SAFE JSON PARSER
//  Gemini sometimes wraps JSON in markdown fences.
// ─────────────────────────────────────────────
function parseJSON(text) {
  // Strip ```json ... ``` or ``` ... ``` fences
  const clean = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
  return JSON.parse(clean);
}

// ─────────────────────────────────────────────
//  FALLBACK ECO DATA  (used if Gemini fails)
// ─────────────────────────────────────────────
function fallbackEcoData(reason = "AI error") {
  return {
    ecoScore: null,
    carbonFootprint: null,
    breakdown: null,
    badges: [],
    explanation: reason,
    isFallback: true,
  };
}

// ═══════════════════════════════════════════════════════════════
//  getEcoScore(product)
//  Returns: { ecoScore, carbonFootprint, breakdown, badges, explanation }
// ═══════════════════════════════════════════════════════════════
async function getEcoScore(product) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an environmental impact analyst. Estimate the carbon footprint and eco score for the product below.

── PRODUCT DETAILS ──────────────────────────────────────
Name        : ${product.name || "Unknown"}
Category    : ${product.category || "Unknown"}
Material(s) : ${product.material || product.materials || "Unknown"}
Packaging   : ${product.packaging || "Unknown"}
Brand       : ${product.brand || "Unknown"}
Weight (kg) : ${product.weight || "estimate based on category"}
Origin      : ${product.origin || product.country || "Unknown"}
──────────────────────────────────────────────────────────

── CARBON REFERENCE DATA ────────────────────────────────
${CARBON_REFERENCE}
──────────────────────────────────────────────────────────

TASK:
1. Identify each material and its estimated weight fraction.
2. Multiply material weight by its carbon intensity from the table.
3. Add packaging carbon.
4. Add a manufacturing overhead (10–30% of material carbon typical).
5. Compute total carbon footprint (kg CO₂e).
6. Compute eco score using the formula above (clamp 0–100).
7. Assign eco badges from: ["Recycled Materials", "Biodegradable", "Low Carbon", "Plastic-Free", "Sustainably Sourced", "Minimal Packaging", "Long Lifespan"]

Respond ONLY with a valid JSON object (no markdown fences, no extra text):
{
  "ecoScore": <integer 0-100>,
  "carbonFootprint": <float, kg CO2e>,
  "breakdown": {
    "materialCarbon": <float>,
    "packagingCarbon": <float>,
    "manufacturingOverhead": <float>,
    "transportEstimate": <float>
  },
  "badges": [<string>, ...],
  "explanation": "<2-3 sentence plain-English summary of the score>"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = parseJSON(text);

    // Validate required fields
    if (
      typeof parsed.ecoScore !== "number" ||
      typeof parsed.carbonFootprint !== "number"
    ) {
      throw new Error("Invalid JSON shape from Gemini");
    }

    // Clamp score just in case
    parsed.ecoScore = Math.max(0, Math.min(100, Math.round(parsed.ecoScore)));

    return parsed;
  } catch (error) {
    console.error("[geminiService] getEcoScore error:", error.message);
    return fallbackEcoData("Could not calculate eco score: " + error.message);
  }
}

// ═══════════════════════════════════════════════════════════════
//  getBestAlternative(originalProduct, candidateProducts)
//
//  candidateProducts – array of product objects from DB
//  Returns: { productName: string, reason: string }
//           where productName matches EXACTLY one candidate
// ═══════════════════════════════════════════════════════════════
async function getBestAlternative(originalProduct, candidateProducts) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build a compact, informative list for Gemini to reason over
    const candidateList = candidateProducts
      .map(
        (p, i) =>
          `${i + 1}. Name: "${p.name}" | Material: ${p.material || "?"} | Packaging: ${p.packaging || "?"} | Category: ${p.category || "?"}`
      )
      .join("\n");

    const prompt = `
You are a sustainability expert choosing the most eco-friendly product alternative.

── ORIGINAL PRODUCT (user is currently viewing) ─────────
Name        : ${originalProduct.name || "Unknown"}
Material(s) : ${originalProduct.material || originalProduct.materials || "Unknown"}
Packaging   : ${originalProduct.packaging || "Unknown"}
Category    : ${originalProduct.category || "Unknown"}
─────────────────────────────────────────────────────────

── CANDIDATE ALTERNATIVES (from our database) ──────────
${candidateList}
─────────────────────────────────────────────────────────

── CARBON REFERENCE DATA ────────────────────────────────
${CARBON_REFERENCE}
─────────────────────────────────────────────────────────

TASK:
Select the SINGLE best eco-friendly alternative from the candidate list.
Criteria (in order of importance):
  1. Lower carbon footprint based on materials and packaging.
  2. Presence of recycled / biodegradable / natural materials.
  3. Minimal or plastic-free packaging.
  4. Do NOT pick the original product itself.

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
  "productName": "<exact product name copied from the list above>",
  "reason": "<one sentence explaining why this is greener>"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = parseJSON(text);

    if (!parsed.productName) {
      throw new Error("Gemini did not return a productName");
    }

    return {
      productName: parsed.productName.trim(),
      reason: parsed.reason || "Most eco-friendly option available",
    };
  } catch (error) {
    console.error("[geminiService] getBestAlternative error:", error.message);
    return {
      productName: null,
      reason: "Could not determine alternative: " + error.message,
    };
  }
}

module.exports = { getEcoScore, getBestAlternative };