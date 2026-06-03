export const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80';

/** Primary catalog image — always the main `image` field. */
export function getMainProductImage(product) {
  return product?.image || PLACEHOLDER_IMAGE;
}

/** Ordered unique URLs for listing cards (main first, then alternates). */
export function getProductImageSources(product) {
  if (!product) return [PLACEHOLDER_IMAGE];
  const urls = [product.image, ...(product.images || [])].filter(Boolean);
  const unique = [...new Set(urls)];
  return unique.length > 0 ? unique : [PLACEHOLDER_IMAGE];
}
