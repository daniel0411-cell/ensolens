import { gifDimensions } from './gif-dimensions.ts';
import manifest from '../content/images.json';
export interface PageImage { src: string; width: number; height: number; alt: string }
export function pageImage(path: string): PageImage | undefined {
  const key = manifest.pages[path as keyof typeof manifest.pages];
  return key ? manifest.assets[key as keyof typeof manifest.assets] : undefined;
}
export function imageObject(image: PageImage) {
  return { '@type': 'ImageObject', url: new URL(image.src, 'https://ensolens.com').href, width: image.width, height: image.height, caption: image.alt };
}

// GIF logical-screen dimensions are encoded in the validated source bytes.
export function oceanPageImage(map: {version: string; base64: string; issued: string}): PageImage {
  const bytes = Uint8Array.from(atob(map.base64.slice(0, 16)), c => c.charCodeAt(0));
  return { src: '/images/ocean-map.gif?version=' + map.version,
    ...gifDimensions(bytes),
    alt: 'NOAA sea surface temperature anomaly figure accompanying the CPC discussion issued ' + map.issued + '. Observation dates and color scale appear in the original figure.' };
}
