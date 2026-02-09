import { bags, sneakers } from "./products";

// Lightweight client-safe selector to derive hero slides
export function getHeroSlides(limit = 4) {
  // Prefer featured items if present
  const combined = [...bags, ...sneakers];
  const featured = combined.filter((p) => p.featured);
  const source = featured.length ? featured : combined;

  // Keep only unique images and limit to the requested number
  const seen = new Set();
  const slides = [];
  for (const p of source) {
    if (slides.length >= limit) break;
    if (!p.image) continue;
    if (seen.has(p.image)) continue;
    seen.add(p.image);
    slides.push({
      id: p.id,
      image: p.image,
      category: p.category || (p.id >= 200 ? "Sneaker" : "Bag"),
      title: p.name,
    });
  }
  return slides;
}
