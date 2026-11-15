// Eager Asset Preloading Engine for Coco's Birthday Sanctuary
// Pre-caches all images, cutout cats, stickers, and sounds into memory on initial site entry

export const ASSETS_TO_PRELOAD = [
  // Interactive 3D & Core Cutouts (Ultra-fast WebP + PNG)
  'knife_cat.webp',
  'knife_cat.png',
  'gift_box.png',
  'torn_paper.png',
  'background.jpg',

  // All 7 Interactive Orbiting Cats (Ultra-fast WebP + PNG)
  'cats/cat1.webp',
  'cats/cat2.webp',
  'cats/cat3.webp',
  'cats/cat4.webp',
  'cats/cat5.webp',
  'cats/cat6.webp',
  'cats/cat7.webp',
  'cats/cat1.png',
  'cats/cat2.png',
  'cats/cat3.png',
  'cats/cat4.png',
  'cats/cat5.png',
  'cats/cat6.png',
  'cats/cat7.png',

  // Curated Exhibition Photos (1 to 9)
  'photos/photo1.jpg',
  'photos/photo2.jpg',
  'photos/photo3.jpg',
  'photos/photo4.jpg',
  'photos/photo5.jpg',
  'photos/photo6.jpg',
  'photos/photo7.jpg',
  'photos/photo8.jpg',
  'photos/photo9.jpg',

  // Interactive Cat Stickers
  'stickers/cat_sticker_1.png',
  'stickers/cat_sticker_2.png',
  'stickers/cat_sticker_3.png',
  'stickers/cat_sticker_4.png',
  'stickers/cat_sticker_5.png',
  'stickers/cat_sticker_6.png',
  'stickers/cat_sticker_7.png',
  'stickers/cat_sticker_8.png',
  'stickers/cat_sticker_9.png',
  'stickers/cat_sticker_10.png',
  'stickers/cat_sticker_11.png',
  'stickers/cat_sticker_12.png',
];

/**
 * Preload and hardware-decode a single image into browser GPU cache
 */
function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    if (typeof img.decode === 'function') {
      img.decode().then(() => resolve(url)).catch(() => resolve(url));
    } else if (img.complete) {
      resolve(url);
    } else {
      img.onload = () => resolve(url);
      img.onerror = () => resolve(url); // Don't block if single image fails
    }
  });
}

/**
 * Preload all critical interactive assets with progress callback
 * @param {function(number)} onProgress - reports progress from 0 to 100
 */
export async function preloadAllAssets(onProgress) {
  const base = import.meta.env.BASE_URL;
  const total = ASSETS_TO_PRELOAD.length;
  let loaded = 0;

  // Pre-decode cat meow sound
  try {
    fetch(`${base}cat_meow.mp3`).catch(() => {});
  } catch (e) {}

  const promises = ASSETS_TO_PRELOAD.map(async (assetPath) => {
    const fullUrl = `${base}${assetPath}`;
    await preloadImage(fullUrl);
    loaded++;
    if (onProgress) {
      onProgress(Math.round((loaded / total) * 100));
    }
  });

  // Safety race: never block user for more than 2.5 seconds on slow mobile networks
  const safetyTimeout = new Promise((resolve) => setTimeout(resolve, 2500));

  await Promise.race([Promise.all(promises), safetyTimeout]);
}
