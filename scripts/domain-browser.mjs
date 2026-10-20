import { execFileSync } from 'node:child_process';

const domain = 'ensolens.com';
const account = '2e9212a9aeef7091fe79d82808aa5843';
const action = process.argv[2];
const asString = value => '"' + String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"').replaceAll('\n', '\\n').replaceAll('\r', '') + '"';
const apple = source => execFileSync('osascript', ['-e', source], { encoding: 'utf8', timeout: 20000 }).trim();

function findTab(host) {
  const result = apple(`tell application "Google Chrome"
repeat with w in windows
repeat with t in tabs of w
if URL of t contains ${asString(host)} then return (id of w as text) & "|" & (id of t as text)
end repeat
end repeat
end tell`);
  const [window, tab] = result.split('|').map(Number);
  if (!window || !tab) throw new Error(`No open ${host} tab`);
  return { window, tab };
}

function execute(tab, code) {
  return apple(`tell application "Google Chrome" to execute tab id ${tab.tab} of window id ${tab.window} javascript ${asString(code)}`);
}

async function browserFetch(path, init = {}) {
  if (!path.startsWith('/api/v4/zones')) throw new Error('Only Cloudflare zone endpoints are allowed');
  const tab = findTab('dash.cloudflare.com');
  const key = `__ensolens_${Date.now()}`;
  execute(tab, `window[${JSON.stringify(key)}]=null; fetch(${JSON.stringify(path)},${JSON.stringify({ ...init, credentials: 'include', headers: { 'Content-Type': 'application/json', 'x-cross-site-security': 'dash', ...init.headers } })}).then(async response=>{const text=await response.text();let data;try{data=JSON.parse(text)}catch{data={nonJson:true,excerpt:text.slice(0,180)}}return {status:response.status,data}}).then(result=>window[${JSON.stringify(key)}]=result).catch(error=>window[${JSON.stringify(key)}]={error:String(error)}); 'started';`);
  for (let i = 0; i < 100; i++) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const value = execute(tab, `JSON.stringify(window[${JSON.stringify(key)}])`);
    if (value && value !== 'null') return JSON.parse(value);
  }
  throw new Error('Cloudflare page request timed out');
}

if (action === 'zone-status') {
  console.log(JSON.stringify(await browserFetch(`/api/v4/zones?name=${domain}&account.id=${account}`), null, 2));
} else if (action === 'zone-create') {
  const existing = await browserFetch(`/api/v4/zones?name=${domain}&account.id=${account}`);
  if (!existing.data?.success) throw new Error(JSON.stringify(existing));
  if (existing.data.result.length) console.log(JSON.stringify(existing, null, 2));
  else console.log(JSON.stringify(await browserFetch('/api/v4/zones', { method: 'POST', body: JSON.stringify({ name: domain, account: { id: account }, type: 'full' }) }), null, 2));
} else if (action === 'cloudflare-controls') {
  console.log(execute(findTab('dash.cloudflare.com'), `JSON.stringify({text:document.body.innerText.slice(0,10000),links:[...document.querySelectorAll('a,button,input')].filter(el=>el.getClientRects().length && el.type!=='password' && el.type!=='hidden').map(el=>({tag:el.tagName,text:el.innerText?.trim().slice(0,100),name:el.name,id:el.id,type:el.type,placeholder:el.placeholder,href:el.getAttribute('href'),aria:el.getAttribute('aria-label')}))})`));
} else if (action === 'spaceship-state') {
  console.log(execute(findTab('spaceship.com'), 'document.body.innerText.slice(0,16000)'));
} else if (action === 'spaceship-controls') {
  console.log(execute(findTab('spaceship.com'), `JSON.stringify([...document.querySelectorAll('a,button,input,select')].filter(el=>el.getClientRects().length && el.type!=='password' && el.type!=='hidden').map(el=>({tag:el.tagName,text:el.innerText?.trim().slice(0,100),name:el.name,id:el.id,type:el.type,placeholder:el.placeholder,href:el.getAttribute('href'),aria:el.getAttribute('aria-label')})))`));
} else if (action === 'spaceship-open-domain') {
  console.log(execute(findTab('spaceship.com'), `(()=>{const candidates=[...document.querySelectorAll('a,button,span')].filter(el=>el.textContent.trim()==='ensolens.com'); const target=candidates[0]; if(!target)throw new Error('ENSOLens domain not found'); (target.closest('a,button')||target).click(); return 'Opened ENSOLens domain';})()`));
} else if (action === 'spaceship-click') {
  const label = process.argv[3];
  const allowed = ['名称服务器和DNS', '域名服务器', '名称服务器', 'Nameservers', '编辑', 'Edit', '更改', 'Change', '自定义', 'Custom', '自定义域名服务器', 'Custom nameservers', '保存', 'Save', '应用', 'Apply'];
  if (!allowed.includes(label)) throw new Error('Action label is not in the domain-settings allowlist');
  console.log(execute(findTab('spaceship.com'), `(()=>{if(!document.body.innerText.includes('ensolens.com'))throw new Error('ENSOLens domain context required'); const matches=[...document.querySelectorAll('button,a,[role=button]')].filter(el=>el.getClientRects().length && (el.innerText.trim()===${JSON.stringify(label)} || el.getAttribute('aria-label')===${JSON.stringify(label)}));if(matches.length!==1)throw new Error('Expected one matching control, found '+matches.length);matches[0].click();return 'Clicked '+${JSON.stringify(label)};})()`));
} else {
  throw new Error('Unknown domain setup action');
}
