/**
 * Calculate eco-score based on product attributes
 * Scoring breakdown: sustainability 30pts, recycled 25pts, carbon 20pts, packaging 15pts, certs 10pts
 * @param {Object} product - Product object with eco attributes
 * @returns {number} Eco-score value from 0-100
 */
function calculateEcoScore(product) {
  // Input validation
  if (!product || typeof product !== 'object') return 0;
  
  const ecoScoreCriteria = {
    isSustainable: 30,
    hasRecycledContent: 25,
    isBiodegradable: 15,
    hasCertifications: 10
  };
  
  let ecoScore = 0;
  
  // Apply base criteria
  Object.entries(ecoScoreCriteria).forEach(([criterion, points]) => {
    if (product[criterion]) ecoScore += points;
  });
  
  // Apply carbon footprint criteria with validation
  if (product.carbonFootprint !== undefined && product.carbonFootprint < 5) {
    ecoScore += 20;
  }
  
  return Math.min(ecoScore, 100);
}

module.exports = { calculateEcoScore };
