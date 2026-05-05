/**
 * Calculate eco-score based on product attributes
 * @param {Object} product - Product object with eco attributes
 * @returns {number} Eco-score value from 0-100
 */
function calculateEcoScore(product) {
  if (!product || typeof product !== 'object') return 0;
  
  let score = 0;
  
  // Base score for sustainable materials
  if (product.isSustainable) score += 30;
  
  // Points for recycled content
  if (product.hasRecycledContent) score += 25;
  
  // Points for low carbon footprint
  if (product.carbonFootprint < 5) score += 20;
  
  // Points for biodegradable packaging
  if (product.isBiodegradable) score += 15;
  
  // Bonus points for certifications
  if (product.hasCertifications) score += 10;
  
  return Math.min(score, 100);
}

module.exports = { calculateEcoScore };
