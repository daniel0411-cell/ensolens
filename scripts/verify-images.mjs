// File-level checks; relevance, accuracy and rights still require editorial review.
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import sharp from 'sharp';
const manifest=JSON.parse(await readFile(new URL('../src/content/images.json',import.meta.url),'utf8'));
for(const [key,image] of Object.entries(manifest.assets)) {
  for(const field of ['src','alt','credit','source','rights']) assert.ok(image[field]?.trim(),`${key}: missing ${field}`);
  assert.match(image.src,/^\/images\/[\w/.-]+$/);
  assert.ok(!image.src.includes('..'));
  const file=new URL('../public'+image.src,import.meta.url);
  const data=await readFile(file);
  const metadata=await sharp(data).metadata();
  assert.equal(metadata.width,image.width,`${key}: real width`);
  assert.equal(metadata.height,image.height,`${key}: real height`);
  assert.ok(['png','jpeg','gif','webp'].includes(metadata.format),`${key}: supported raster`);
  assert.ok((await stat(file)).size <= 1024*1024,`${key}: image exceeds 1 MiB review budget; optimize or document and explicitly review exception`);
}
for(const [path,key] of Object.entries(manifest.pages)) {
  assert.match(path,/^\/.+\/$/);assert.ok(manifest.assets[key],`${path}: missing asset`);
}
console.log(`PASS ${Object.keys(manifest.assets).length} image files: real dimensions, format, size and provenance; ${Object.keys(manifest.pages).length} page mappings`);
