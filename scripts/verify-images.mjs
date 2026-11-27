// File-level checks; relevance, accuracy and rights still require editorial review.
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import sharp from 'sharp';
const manifest=JSON.parse(await readFile(new URL('../src/content/images.json',import.meta.url),'utf8'));
for(const [key,image] of Object.entries(manifest.assets)) {
  for(const field of ['src','alt','credit','source','rights']) assert.ok(image[field]?.trim(),`${key}: missing ${field}`);
  for(const [variant,asset] of [['canonical',image], ...(image.mobile ? [['mobile',image.mobile]] : [])]) {
    assert.match(asset.src,/^\/images\/[\w/.-]+$/);
    assert.ok(!asset.src.includes('..'));
    const file=new URL('../public'+asset.src,import.meta.url);
    const data=await readFile(file);
    const metadata=await sharp(data).metadata();
    assert.equal(metadata.width,asset.width,`${key}/${variant}: real width`);
    assert.equal(metadata.height,asset.height,`${key}/${variant}: real height`);
    assert.ok(['png','jpeg','gif','webp'].includes(metadata.format),`${key}: supported raster`);
    assert.ok((await stat(file)).size <= 1024*1024,`${key}: image exceeds 1 MiB review budget`);
  }
}
for(const [path,key] of Object.entries(manifest.pages)) {
  assert.match(path,/^\/.+\/$/);assert.ok(manifest.assets[key],`${path}: missing asset`);
}
console.log(`PASS ${Object.keys(manifest.assets).length} registered assets (including all mobile files): real dimensions, format, size and provenance; ${Object.keys(manifest.pages).length} page mappings`);
