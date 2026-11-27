// Original explanatory artwork. No live observations or forecast values are invented.
// Rebuild only after editing/reviewing these sources; inspect both art directions.
import {writeFile,readFile} from 'node:fs/promises';
import sharp from 'sharp';
const root='public/images/explainers/';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const text=(x,y,s,size=24,color='#e2e8f0')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}">${esc(s)}</text>`;
const line=(x,y,x2,y2,color='#94a3b8',dash=false)=>`<path d="M${x} ${y}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="3" ${dash?'stroke-dasharray="8 6"':''}/>`;
const rect=(x,y,w,h,color='#183b35')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${color}"/>`;
const circle=(x,y,r,color='#34d399')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
function words(x,y,s,max=30,size=24) {let out='',row='',n=0;for(const word of s.split(' ')){if((row+' '+word).trim().length>max){out+=text(x,y+n*32,row,size);row=word;n++;}else row=(row+' '+word).trim();}return out+text(x,y+n*32,row,size);}
const defs={
 'soi-ocean':{page:'/learn/soi-vs-ocean-indices/',title:'Pressure and temperature',alt:'SOI uses standardized Tahiti–Darwin pressure contrast; Niño 3.4 uses regional sea-surface temperature. Their typical El Niño signs differ and their scales cannot be converted.',source:'https://psl.noaa.gov/data/timeseries/month/DS/SOI/',caption:'Original ENSOLens quantity comparison, not current readings. SOI is a standardized pressure contrast with provider-specific units; conventional Niño 3.4 is an SST departure in °C. Typical El Niño signs are not a conversion formula. Match provider, baseline and averaging window before comparing.'},
 'climate-timescales':{page:'/learn/enso-and-climate-change/',title:'Background and variability',alt:'Separate conceptual curves show a rising long-term temperature background and oscillating ENSO variability; neither curve contains observations or a forecast.',source:'https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-4/',caption:'Original ENSOLens conceptual curves, with no measured values, common time scale or forecast. Long-term background warming and ENSO variability answer different questions. The panels are not components to add together or an attribution of a particular storm. The IPCC assessment and its rainfall-versus-SST distinction remain in the text.'},
 'heatwave-enso':{page:'/learn/marine-heatwaves-vs-el-nino/',title:'Warm patches, different diagnoses',alt:'A regional warm patch is contrasted with central and eastern equatorial Pacific warmth plus atmospheric evidence. Neither schematic shows a current marine heatwave or El Niño.',source:'https://www.integratedecosystemassessment.noaa.gov/regions/california-current/california-current-marine-heatwave-tracker-blobtracker',caption:'Original ENSOLens spatial schematics, not maps of current conditions or geographic boundaries. A marine heatwave needs its own product’s location, duration and baseline criteria. El Niño assessment also needs atmospheric evidence. A regional warm patch can coexist with ENSO but does not establish the phase; the Blob-Class threshold in the table is not a universal heatwave definition.'},
 'water-stores':{page:'/learn/el-nino-and-drought-recovery/',title:'Four stores, four diagnostics',alt:'Soil roots, mountain snow, a reservoir and a groundwater well illustrate four separate water stores requiring their own observations to assess drought recovery.',source:'https://www.usgs.gov/water-science-school/science/drought-and-groundwater-levels',caption:'Original ENSOLens diagnostic cross-sections, not measured levels or recovery times. These are separate stores, not a required sequence in which rainfall refills them. Check root-zone moisture, basin SWE, reservoir storage and local well levels with their dates; operations, recharge and withdrawals also matter.'},
 'winter-pathway':{page:'/learn/enso-jet-stream-teleconnections/',title:'From tropical heating to weather',alt:'A qualitative boreal-winter pathway links tropical rainfall and heating to large-scale circulation, jet and storm-track tendencies, then local weather affected by elevation and air mass.',source:'https://www.weather.gov/mhx/ensowhat',caption:'Original ENSOLens conceptual pathway for Northern Hemisphere winter, not a map of today’s jet stream. Arrows indicate influence, not guaranteed outcomes. Other climate patterns, storm position, elevation and air mass affect the local result; use local forecasts and warnings for a particular storm.'},
 'baseline-ruler':{page:'/learn/climate-normals-and-anomalies/',title:'Same water, different reference',alt:'On a shared 26 to 29°C scale, the same invented 28°C SST is 1°C above a 27°C reference and 0.5°C above a 27.5°C reference.',source:'https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals',caption:'Original ENSOLens invented arithmetic, not observations or RONI. Both panels share a 26–29°C scale and the same 28°C temperature. Only the reference changes: +1.0°C versus +0.5°C. Actual comparisons must also match season, region, dataset and processing.'},
 'observing-system':{page:'/learn/how-enso-is-observed/',title:'From instruments to assessment',alt:'Ocean instruments feed a processed SST analysis, regional and seasonal indices. Separately observed winds, pressure and rainfall also feed the ENSO assessment.',source:'https://www.pmel.noaa.gov/elnino/faq',caption:'Original ENSOLens processing schematic. Product methods differ; not every analysis uses every observing platform. Regional averaging and seasonal processing do not turn SST into atmospheric observations. Winds, pressure and convection are assessed separately alongside the ocean evidence.'},
 'lifecycle-clocks':{page:'/forecast/when-will-it-end/',title:'Three clocks, no single end date',alt:'A conceptual ocean-temperature peak, a combined ocean–atmosphere phase assessment and separate regional water and weather evidence answer different timing questions without supplying an end date.',source:'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml',caption:'Original ENSOLens timing schematic, not a current forecast, timeline or measured curve. Peak temperature, operational phase and regional impacts need different evidence. The panels set no universal delay or ordering for impacts and no neutral-transition date. Use the dated CPC outlook below for actual target seasons.'},
 'product-windows':{page:'/methodology/',title:'Observation, index, forecast',alt:'Weekly conventional SST observations, overlapping three-month relative RONI windows and a monthly-issued three-category seasonal forecast are shown as distinct products.',source:'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/',caption:'Original ENSOLens product-reading schematic, not current values or probabilities. Weekly conventional SST, three-month relative RONI and monthly-issued seasonal probabilities have different constructions and dates. The calendar examples illustrate windows only; forecast categories are labels, not equal numerical odds. Source-specific methods and references are listed in the text.'},
 'three-phases':{page:'/forecast/enso-neutral/',title:'Three phases of a coupled system',alt:'El Niño has central and eastern equatorial Pacific warmth with an atmospheric response; La Niña has cooling with an atmospheric response; neutral is neither event and can include ocean–atmosphere mismatch.',source:'https://www.weather.gov/mhx/ensowhat',caption:'Original ENSOLens conceptual phase comparison based on NWS definitions, rechecked November 27, 2026 (source has no displayed publication date). Strips show qualitative central/eastern equatorial Pacific temperature departures, not observations, thresholds or jet-stream maps. Neutral is neither event; SST is often near average, but ocean and atmosphere can be out of step. None of the phases guarantees normal local weather.'}
};
function panel(w,y,title){return rect(24,y,w-48,186)+text(42,y+34,title,26);}
function render(key,mobile){const w=mobile?480:1000;let h=650,b='';const col=mobile?1:2;const cell=(i,height=240)=>({x:24+(i%col)*(w-24)/col,y:90+Math.floor(i/col)*height,cw:(w-72)/col});
 b+=text(24,42,defs[key].title,mobile?27:32);
 if(key==='soi-ocean'){
 h=mobile?710:430;
 for(let i=0;i<2;i++){const {x,y,cw}=cell(i,280);b+=rect(x,y,cw,250)+text(x+20,y+36,i?'Niño 3.4 SST':'SOI: pressure',27);
 if(!i){b+=circle(x+65,y+105,22,'#77b9de')+circle(x+cw-65,y+105,22,'#77b9de')+line(x+92,y+105,x+cw-92,y+105)+text(x+24,y+153,'Tahiti')+text(x+cw-112,y+153,'Darwin');}
 else {b+=rect(x+25,y+68,cw-50,46,'#9d542c')+line(x+25,y+126,x+cw-25,y+126,'#cbd5e1',true)+text(x+24,y+157,'Regional ocean temperature',22);}
 b+=text(x+20,y+201,i?'Typical El Niño: positive °C':'Typical El Niño: negative',22)+text(x+20,y+233,i?'Departure from baseline':'Standardized; provider-specific',21);}
 b+=words(24,h-48,'Match averaging windows; no unit conversion.',mobile?32:70,24);
 } else if(key==='climate-timescales'){
 h=mobile?710:430;
 for(let i=0;i<2;i++){const {x,y,cw}=cell(i,300);b+=rect(x,y,cw,270)+text(x+18,y+35,i?'ENSO variability':'Long-term background',25)+line(x+35,y+205,x+cw-20,y+205)+line(x+35,y+65,x+35,y+205);
 const pts=Array.from({length:61},(_,n)=>{const t=n/60;return `${x+40+t*(cw-70)},${y+(i?135+Math.sin(t*4*Math.PI)*45:190-t*100+Math.sin(t*9)*7)}`}).join(' ');b+=`<polyline points="${pts}" fill="none" stroke="${i?'#77b9de':'#f7a962'}" stroke-width="5"/>`+text(x+40,y+240,i?'Recurring regional fluctuations':'Multi-decade change',21);}
 b+=words(24,h-48,'Conceptual only; different time scales',mobile?32:70,24);
 } else if(key==='heatwave-enso'){
 h=mobile?710:440;
 for(let i=0;i<2;i++){const {x,y,cw}=cell(i,300);b+=rect(x,y,cw,270)+text(x+18,y+34,i?'El Niño assessment':'Marine heatwave',26)+rect(x+22,y+60,cw-44,100,'#163e55');
 if(!i)b+=`<ellipse cx="${x+cw*.43}" cy="${y+108}" rx="${cw*.19}" ry="30" fill="#cf7246"/>`;
 else b+=rect(x+cw*.36,y+100,cw*.55,25,'#cf7246')+line(x+24,y+112,x+cw-24,y+112,'#dce4ed',true);
 b+=text(x+20,y+194,i?'Equatorial Pacific SST':'Local sustained warmth',23)+text(x+20,y+227,i?'+ atmospheric evidence':'Product-specific criteria',23);}
 b+=text(24,h-23,'Not current maps; not to scale',24);
 } else if(key==='water-stores'){
 h=mobile?1280:710;const titles=['Soil: root-zone moisture','Snow: basin SWE','Reservoir: storage','Groundwater: well levels'];
 for(let i=0;i<4;i++){const {x,y,cw}=cell(i,280);b+=rect(x,y,cw,255)+text(x+18,y+34,titles[i],mobile?25:24);const xx=x+25,yy=y+65;
 if(i===0){b+=rect(xx,yy+60,cw-50,75,'#65533a')+line(xx,yy+60,xx+cw-50,yy+60,'#34d399');for(let a=0;a<3;a++)b+=line(xx+50+a*85,yy+30,xx+50+a*85,yy+104,'#d1bd8b')+line(xx+50+a*85,yy+83,xx+30+a*85,yy+113,'#d1bd8b');}
 if(i===1)b+=`<path d="M${xx} ${yy+130}l${cw*.35} -120l${cw*.45} 120Z" fill="#536b76"/><path d="M${xx+cw*.35} ${yy+10}l-35 50h76Z" fill="#e2e8f0"/>`;
 if(i===2)b+=`<path d="M${xx} ${yy+45}l50 85h${cw-155}l55 -85" fill="#287499" stroke="#afbbbf" stroke-width="4"/>`+rect(xx+cw-85,yy+35,25,100,'#7e8f95');
 if(i===3)b+=rect(xx,yy+40,cw-50,95,'#65533a')+rect(xx,yy+90,cw-50,45,'#285f75')+rect(xx+cw*.6,yy,16,120,'#cbd5e1')+line(xx,yy+90,xx+cw-50,yy+90,'#77b9de',true);
 b+=text(x+18,y+239,['Check depth, not surface wetting','Check snow level and reference','Check inflow and operations','Check recharge and pumping'][i],23);}
 b+=words(24,h-46,'Separate diagnostics; no recovery times implied',mobile?34:70,24);
 } else if(key==='winter-pathway'||key==='observing-system'){
 const observing=key==='observing-system';const labels=observing?['Ocean instruments','Processed SST analysis','Regional / seasonal method','ENSO assessment']:['Tropical rainfall / heating','Large-scale circulation','Winter jet / storm tracks','Local weather'];
 const detail=observing?['Buoys, ships, satellites','Quality checks; product-specific','Named box; then index method','Ocean + atmosphere together']:['Ocean–atmosphere coupling','Influence beyond the tropics','Regional seasonal tendencies','Storm position, elevation, air mass'];
 h=1000;
 for(let i=0;i<4;i++){const x=24,y=90+i*188,cw=w-48;b+=rect(x,y,cw,158)+text(x+18,y+35,labels[i],mobile?25:26)+words(x+18,y+82,detail[i],mobile?30:32,23);
 if(i<3){b+=line(x+cw/2,y+(161),x+cw/2,y+(181),'#34d399')+text(x+cw/2-8,y+(183),'↓',25,'#34d399');}}
 b+=rect(24,h-132,w-48,96,'#294455')+words(42,h-98,observing?'Separate winds, pressure and rainfall observations → assessment':'Each link depends on other variability. Not a daily jet map.',mobile?30:65,23);
 } else if(key==='baseline-ruler'){
 h=mobile?750:470;
 for(let i=0;i<2;i++){const {x,y,cw}=cell(i,310);b+=rect(x,y,cw,280)+text(x+20,y+35,i?'Reference B: 27.5°C':'Reference A: 27.0°C',25);const px=v=>x+35+(v-26)/3*(cw-70);b+=line(px(26),y+110,px(29),y+110)+rect(px(i?27.5:27),y+87,px(28)-px(i?27.5:27),46,'#9d542c')+line(px(28),y+72,px(28),y+142,'#fff');for(const v of [26,27,28,29])b+=text(px(v)-12,y+177,v,21);b+=text(x+20,y+218,'Same observed SST: 28°C',23)+text(x+20,y+252,i?'28 − 27.5 = +0.5°C':'28 − 27 = +1.0°C',25,'#f7a962');}
 b+=words(24,h-50,'Invented example; shared °C scale; not RONI',mobile?32:70,24);
 } else if(key==='lifecycle-clocks'){
 h=mobile?800:730;b+=text(24,75,'Conceptual; not a forecast',24);const yy=[90,300,510];const names=['Ocean peak','Official phase','Regional impacts'];
 for(let i=0;i<3;i++){const y=yy[i];b+=panel(w,y,names[i]);if(!i){b+=`<path d="M50 ${y+135}Q${w*.4} ${y-5} ${w*.58} ${y+78}T${w-50} ${y+132}" fill="none" stroke="#f7a962" stroke-width="5"/>`+text(48,y+169,'Peak judged retrospectively',24);}else b+=words(44,y+80,i===1?'Ocean evidence + atmospheric response → CPC assessment':'Local weather and water stores need their own evidence',mobile?31:65,25)+text(44,y+164,i===1?'Not one weekly crossing':'No fixed delay or order',24);}
 } else if(key==='product-windows'){
 h=mobile?830:730;for(let i=0;i<3;i++){const y=90+i*210;b+=panel(w,y,['Weekly conventional SST','Three-month relative RONI','Monthly-issued phase forecast'][i]);if(i===0){for(let a=0;a<6;a++)b+=rect(48+a*(w-96)/6,y+70,(w-120)/6,42,'#285f75');b+=text(48,y+158,'Observation window; °C departure',mobile?22:25);}else if(i===1){for(let a=0;a<3;a++){b+=rect(48+a*(w-100)/5,y+61+a*21,(w-100)*.55,20,'#1e6257');}b+=text(48,y+163,'Overlapping; relative construction',24);}else {['El Niño','Neutral','La Niña'].forEach((s,a)=>{b+=rect(42+a*(w-76)/3,y+70,(w-98)/3,45,['#9d542c','#40534f','#285f75'][a])+text(50+a*(w-76)/3,y+100,s,mobile?20:25);});b+=text(48,y+160,'Labels, not probability values',24);}}
 } else if(key==='three-phases'){
 h=mobile?970:750;for(let i=0;i<3;i++){const y=90+i*(mobile?280:210);b+=rect(24,y,w-48,mobile?260:186)+text(44,y+35,['El Niño','Neutral','La Niña'][i],27)+rect(44,y+62,w-88,35,['#9d542c','#40534f','#285f75'][i])+words(44,y+131,['Warmer central / eastern Pacific','Neither event; often near-average SST','Cooler central / eastern Pacific'][i],mobile?34:70,mobile?21:26)+words(44,y+(mobile?200:165),['With a coupled atmospheric response','Ocean and atmosphere may be out of step','With a coupled atmospheric response'][i],mobile?31:66,23);}
 }
 if(key==='three-phases')b+=text(24,h-18,'Conceptual; not current conditions',24);
 return {w,h,svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#10201d"/><g font-family="Arial,sans-serif" fill="#e2e8f0">${b}</g></svg>`};
}
const manifest=JSON.parse(await readFile('src/content/images.json','utf8'));
for(const [key,d] of Object.entries(defs)){
 const dimensions=[];for(const mobile of [false,true]){const {w,h,svg}=render(key,mobile);const name=key+(mobile?'-mobile':'');await writeFile(root+name+'.svg',svg);await sharp(Buffer.from(svg)).png().toFile(root+name+'.png');dimensions.push({src:'/images/explainers/'+name+'.png',width:w,height:h});}
 manifest.assets[key]={...dimensions[0],mobile:dimensions[1],alt:d.alt,credit:'Original ENSOLens explanatory diagram; conceptual, not current conditions.',source:d.source,rights:'ENSOLens original artwork; editable SVG and generator retained; scientific sources credited.',caption:d.caption};manifest.pages[d.page]=key;
}
await writeFile('src/content/images.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Exported ten original diagram families with mobile art directions.');
// Reflow the existing numeric diagrams without changing their canonical data.
for(const key of ['roni-ranges','season-windows']) {
 const w=480,h=key==='roni-ranges'?740:670;let body='';
 if(key==='roni-ranges'){
  body+=text(24,38,'DJF 2026–27: RONI ranges',27)+text(24,73,'CPC November 2026',24)+text(24,108,'1991–2020 baseline',24);
  const x=v=>50+(v-1.5)/1.5*375;
  for(const [i,label,lo,hi,color] of [[0,'Central 90%',1.59,2.97,'#356766'],[1,'Central 70%',1.85,2.71,'#367e77'],[2,'Central 50%',2,2.56,'#34d399']]){
   const y=175+i*145;body+=text(24,y,label,26)+text(24,y+34,`+${lo.toFixed(2)} to +${hi.toFixed(2)}°C`,24)+line(50,y+76,425,y+76)+rect(x(lo),y+60,x(hi)-x(lo),32,color)+line(x(2.28),y+47,x(2.28),y+105,'#fff');
  }
  for(const v of [1.5,2,2.5,3])body+=text(x(v)-22,615,`+${v.toFixed(1)}`,23);
  body+=text(24,662,'White marker: median +2.28°C',24)+text(24,700,'Shared °C scale; do not add ranges',23);
 }else{
  body+=text(24,38,'Overlapping seasonal windows',27)+text(24,76,'Each row covers three months',24);
  const months=['Dec','Jan','Feb','Mar','Apr','May','Jun'];months.forEach((m,i)=>body+=text(90+i*52,132,m,23));
  ['DJF','JFM','FMA','MAM','AMJ'].forEach((s,i)=>body+=text(20,200+i*70,s,24)+rect(82+i*52,170+i*70,149,42,'#1e6257')+text(111+i*52,199+i*70,s,24));
  body+=words(24,585,'Calendar overlap only; not an ENSO event classification',31,24);
 }
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#10201d"/><g font-family="Arial,sans-serif" fill="#e2e8f0">${body}</g></svg>`;
 const src='/images/explainers/'+key+'-mobile.png';await writeFile(root+key+'-mobile.svg',svg);await sharp(Buffer.from(svg)).png().toFile('public'+src);manifest.assets[key].mobile={src,width:w,height:h};
}
await writeFile('src/content/images.json',JSON.stringify(manifest,null,2)+'\n');
