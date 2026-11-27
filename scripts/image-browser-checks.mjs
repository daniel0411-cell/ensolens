import assert from 'node:assert/strict';
import {readFile,mkdir} from 'node:fs/promises';
const manifest=JSON.parse(await readFile(new URL('../src/content/images.json',import.meta.url),'utf8'));
/** Shared local release and postrelease checks: rendered pages, not just template strings. */
export async function verifyPageImages(browser,base,{screenshots=false}={}) {
  for(const width of [1440,390,320]) {
    const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1});
    const page=await context.newPage();
    for(const path of ['/',...Object.keys(manifest.pages)]) {
      const response=await page.goto(base+path,{waitUntil:'networkidle'});assert.equal(response.status(),200,path);
      const images=page.locator('main img');
      for(const img of await images.all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(async el=>{await el.decode();});
        const result=await img.evaluate(el=>({src:el.src,w:el.naturalWidth,h:el.naturalHeight,width:Number(el.getAttribute('width')),height:Number(el.getAttribute('height')),alt:el.alt,picture:el.parentElement.tagName==='PICTURE'}));
        assert.ok(result.w>0&&result.h>0,result.src);
        if(!result.picture) { assert.equal(result.w,result.width,result.src+' true width'); assert.equal(result.h,result.height,result.src+' true height'); }
        // A picture source can select a smaller proportional variant.
        assert.ok(Math.abs(result.w/result.h-result.width/result.height)<.005,`wrong aspect ratio: ${result.src}`);
        assert.ok(result.width>0&&result.height>0&&result.alt.trim(),`dimensions/alt: ${result.src}`);
      }
      const preferred=await page.locator('meta[property="og:image"]').getAttribute('content');assert.ok(preferred,path);
      assert.equal(await page.locator('meta[name="twitter:image"]').getAttribute('content'),preferred);
      const original=new URL(preferred);const imagePath=original.pathname+original.search;
      const representative=page.locator(`main img[src="${imagePath}"]`);assert.equal(await representative.count(),1,`${path}: preferred image in body`);
      const dims=await representative.evaluate(el=>({w:Number(el.getAttribute('width')),h:Number(el.getAttribute('height')),alt:el.alt}));
      assert.equal(Number(await page.locator('meta[property="og:image:width"]').getAttribute('content')),dims.w);
      assert.equal(Number(await page.locator('meta[property="og:image:height"]').getAttribute('content')),dims.h);
      assert.equal(await page.locator('meta[property="og:image:alt"]').getAttribute('content'),dims.alt);
      const schemas=await page.locator('script[type="application/ld+json"]').evaluateAll(els=>els.map(el=>JSON.parse(el.textContent)));
      assert.equal(schemas.find(x=>x['@type']==='WebPage').primaryImageOfPage.url,preferred);
      const article=schemas.find(x=>x['@type']==='Article');if(article) assert.equal(article.image.url,preferred);
      const imageResponse=await context.request.get(base+imagePath,{headers:{'User-Agent':'Googlebot-Image/1.0'}});
      assert.equal(imageResponse.status(),200,imagePath);assert.match(imageResponse.headers()['content-type'],/^image\//);
      const production=new URL(base).hostname==='ensolens.com';
      assert.match(response.headers()['x-robots-tag'],production?/max-image-preview:large/:/noindex/);
      assert.match(imageResponse.headers()['x-robots-tag'],production?/max-image-preview:large/:/noindex/);
      assert.match(await page.locator('meta[name=robots]').getAttribute('content'),production?/max-image-preview:large/:/noindex/);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${path}: page overflow at ${width}`);
      if(screenshots && ['/learn/nino-regions-explained/','/forecast/'].includes(path)) {
        const figure=page.locator(path==='/forecast/'?'#range-visual':'.teaching-figure');await figure.evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-105));
        await mkdir('.playwright',{recursive:true});
        await page.screenshot({path:`.playwright/search-images-${path==='/forecast/'?'forecast':'nino'}-${width}.png`});
      }
    }
    for(const path of ['/404/','/api/ocean-map?version=invalid','/images/ocean-map.gif?version=invalid']) {
      const response=await context.request.get(base+path);assert.ok(response.status()>=400,path);assert.match(response.headers()['x-robots-tag'],/noindex/);
    }
    const api=await context.request.get(base+'/api/ocean-map');assert.match(api.headers()['x-robots-tag'],/noindex/);
    await context.close();console.log(`PASS image pages: loaded, body/OG/Twitter/schema alignment, real ratios, indexing and overflow at ${width}×1000`);
  }
}
