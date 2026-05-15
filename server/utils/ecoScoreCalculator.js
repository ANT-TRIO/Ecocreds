/**
 * Calculate eco-score based on product attributes
 * Scoring breakdown: sustainability 30pts, recycled 25pts, carbon 20pts, packaging 15pts, certs 10pts
 * @param {Object} product - Product object with eco attributes
 * @returns {number} Eco-score value from 0-100
 */
function calculateEcoScore(product) {
  // Input validation
  if (!product || typeof product !== 'object') return 0;
  
  let ecoScore = 0;
  
  // Sustainability factors scoring
  if (product.isSustainable) ecoScore += 30;
  if (product.hasRecycledContent) ecoScore += 25;
  if (product.carbonFootprint !== undefined && product.carbonFootprint < 5) ecoScore += 20;
  if (product.isBiodegradable) ecoScore += 15;
  if (product.hasCertifications) ecoScore += 10;
  
  return Math.min(ecoScore, 100);
}

module.exports = { calculateEcoScore };


module.exports = { calculateEcoScore };
