/**
 * Creates a URL for a placeholder image with text
 * @param {string} text - Text to display on the placeholder
 * @param {number} width - Width of the placeholder
 * @param {number} height - Height of the placeholder
 * @returns {string} - URL for the placeholder image
 */
export const createPlaceholderImage = (text = 'Image', width = 400, height = 300) => {
  return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
};

/**
 * Handles image loading errors by applying fallbacks
 * @param {Event} event - The error event
 * @param {string} fallbackUrl - Optional fallback URL
 * @param {string} entityName - Name to use in placeholder if fallback fails
 */
export const handleImageError = (event, fallbackUrl, entityName = 'Image') => {
  const element = event.target;
  
  // If we already tried the fallback URL, use a placeholder
  if (element.src === fallbackUrl || !fallbackUrl) {
    element.src = createPlaceholderImage(entityName);
    element.onerror = null; // Prevent infinite error loop
    return;
  }
  
  // Try the fallback URL
  element.src = fallbackUrl;
}; 