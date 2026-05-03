/**
 * Calculate eco-score based on product attributes
 * Scoring breakdown: sustainability 30pts, recycled 25pts, carbon 20pts, packaging 15pts, certs 10pts
 * @param {Object} product - Product object with eco attributes
 * @returns {number} Eco-score value from 0-100
 */
function calculateEcoScore(product) {
  // Validation
  if (!product || typeof product !== 'object') return 0;
  
  const scoreRubric = {
    sustainability: { enabled: product.isSustainable, points: 30 },
    recycled: { enabled: product.hasRecycledContent, points: 25 },
    carbon: { enabled: product.carbonFootprint && product.carbonFootprint < 5, points: 20 },
    packaging: { enabled: product.isBiodegradable, points: 15 },
    certifications: { enabled: product.hasCertifications, points: 10 }
  };
  
  let score = 0;
  Object.values(scoreRubric).forEach(rubric => {
    if (rubric.enabled) score += rubric.points;
  });
  
  return Math.min(score, 100);
}

module.exports = { calculateEcoScore };
