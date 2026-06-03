import { useState } from 'react';
import {
  getMainProductImage,
  getProductImageSources,
  PLACEHOLDER_IMAGE,
} from '../utils/productImage';

/** Single main image (product detail, cart, etc.) */
export function ProductMainImage({ product, alt, className = '', ...props }) {
  const [src, setSrc] = useState(() => getMainProductImage(product));

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setSrc(PLACEHOLDER_IMAGE)}
      {...props}
    />
  );
}

/** Listing card image — tries main URL then alternates before placeholder */
export function ProductCardImage({ product, alt, className = '', ...props }) {
  const sources = getProductImageSources(product);
  const [index, setIndex] = useState(0);
  const src = index < sources.length ? sources[index] : PLACEHOLDER_IMAGE;

  const handleError = () => {
    if (index < sources.length - 1) setIndex(index + 1);
    else if (src !== PLACEHOLDER_IMAGE) setIndex(sources.length);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      {...props}
    />
  );
}
