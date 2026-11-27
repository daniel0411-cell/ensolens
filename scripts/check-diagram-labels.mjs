import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
// SVG DOM geometry measures actual font layout. Human review still checks meaning,
// correspondence with shapes, contrast, and readability at the rendered viewport.
export async function verifyDiagramLabels(browser,manifest) {
  const page=await browser.newPage();let count=0;
  try {
    for(const asset of Object.values(manifest.assets).filter(asset=>asset.caption)) {
      for(const variant of [asset,asset.mobile]) {
        const source=new URL('../public'+variant.src.replace(/\.png$/,'.svg'),import.meta.url);
        await page.setContent(await readFile(source,'utf8'));
        const issues=await page.locator('svg').evaluate(svg=>{
          const w=svg.width.baseVal.value,h=svg.height.baseVal.value;
          const labels=[...svg.querySelectorAll('text')].map(t=>({text:t.textContent,box:t.getBBox()}));
          const issues=[];
          for(let i=0;i<labels.length;i++) {
            const a=labels[i].box;
            if(a.x<0||a.y<0||a.x+a.width>w||a.y+a.height>h)issues.push('Outside canvas: '+labels[i].text);
            for(let j=i+1;j<labels.length;j++) {
              const b=labels[j].box;
              if(Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>1 && Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>1)
                issues.push('Overlapping labels: '+labels[i].text+' / '+labels[j].text);
            }
          }
          return issues;
        });
        assert.deepEqual(issues,[],variant.src);count++;
      }
    }
  } finally {await page.close();}
  console.log(`PASS ${count} original diagram sources: rendered label bounds and text overlap`);
}
