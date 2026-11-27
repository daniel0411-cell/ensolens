// Raster exports from existing ENSOLens vector diagrams; no generated observations.
// Run only when the reviewed diagram changes, then inspect the exports.
import {readFile,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
for(const name of ['nino-regions','kelvin-wave','model-plume','sierra-snow-level']) {
 const svg=await readFile(`public/images/explainers/${name}.svg`);
 await sharp(svg).png().toFile(`public/images/explainers/${name}.png`);
}
const wrap=(body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" fill="#10201d"/><g font-family="Arial,sans-serif" fill="#e2e8f0">${body}</g></svg>`;
let range='<text x="38" y="45" font-size="25">DJF 2026–27: seasonal RONI ranges</text><text x="38" y="78" font-size="18">CPC November 2026 • 1991–2020 baseline • not local weather odds</text>';
const x=v=>270+(v-1.5)/1.5*650;
for(const [i,label,lo,hi,color] of [[0,'Central 90%',1.59,2.97,'#356766'],[1,'Central 70%',1.85,2.71,'#367e77'],[2,'Central 50%',2,2.56,'#34d399']]) {
 const y=150+i*93;range+=`<text x="38" y="${y}" font-size="22">${label}</text><text x="38" y="${y+28}" font-size="18">+${lo.toFixed(2)} to +${hi.toFixed(2)}°C</text><path d="M270 ${y}H920" stroke="#526762"/><rect x="${x(lo)}" y="${y-18}" width="${x(hi)-x(lo)}" height="36" rx="6" fill="${color}"/><path d="M${x(2.28)} ${y-28}v56" stroke="#fff" stroke-width="4"/>`;
}
for(const v of [1.5,2,2.5,3]) range+=`<text x="${x(v)}" y="418" text-anchor="middle" font-size="20">+${v.toFixed(1)}°C</text>`;
range+='<text x="38" y="470" font-size="20">White marker: median +2.28°C. Nested intervals overlap; do not add them.</text>';
let seasons='<text x="38" y="45" font-size="25">Five three-month windows span seven months</text><text x="38" y="78" font-size="18">Calendar overlap only • not five independent seasons or an event classification</text>';
for(const [i,m] of ['Dec','Jan','Feb','Mar','Apr','May','Jun'].entries()) seasons+=`<text x="${208+i*109}" y="125" font-size="21" text-anchor="middle">${m}</text>`;
for(const [i,s] of ['DJF','JFM','FMA','MAM','AMJ'].entries()) seasons+=`<text x="40" y="${177+i*63}" font-size="22">${s}</text><rect x="${157+i*109}" y="${147+i*63}" width="321" height="42" rx="5" fill="#1e6257" stroke="#34d399"/><text x="${317+i*109}" y="${177+i*63}" text-anchor="middle" font-size="20">${s}</text>`;
for(const [name,body] of [['roni-ranges',range],['season-windows',seasons]]) {const svg=wrap(body);await writeFile(`public/images/explainers/${name}.svg`,svg);await sharp(Buffer.from(svg)).png().toFile(`public/images/explainers/${name}.png`);console.log(name,1000,500);}
