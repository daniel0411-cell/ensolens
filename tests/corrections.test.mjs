import test from 'node:test';
import assert from 'node:assert/strict';
import { submitCorrection } from '../src/lib/corrections.ts';
function request(data={},headers={}) { return new Request('https://ensolens.com/api/corrections/',{method:'POST',headers:{origin:'https://ensolens.com','content-type':'application/x-www-form-urlencoded','cf-connecting-ip':'192.0.2.10',...headers},body:new URLSearchParams({page:'/faq/#hurricane-impact',explanation:'Source wording needs review with the dated NOAA evidence.',...data})}); }
function storage(){const values=new Map();const writes=[];return {values,writes,async get(k){return values.get(k)??null},async put(k,v,options){values.set(k,v);writes.push({k,v,options})}};}
test('correction reports persist privately with expiry, without raw connection address',async()=>{
 const store=storage(); const now=new Date('2026-11-13T05:00:00Z');
 const result=await submitCorrection(request(),store,now);
 assert.equal(result.status,201);assert.match(result.headers.get('cache-control'),/no-store/);
 const saved=store.writes.find(x=>x.k.startsWith('correction:'));
 assert.equal(saved.options.expirationTtl,90*86400);
 assert.deepEqual(JSON.parse(saved.v),{page:'/faq/#hurricane-impact',explanation:'Source wording needs review with the dated NOAA evidence.',receivedAt:now.toISOString()});
 assert.ok(!JSON.stringify(store.writes).includes('192.0.2.10'));
 assert.equal((await submitCorrection(request(),store,now)).status,429);
});
test('invalid, cross-origin, oversized and bot reports never write storage',async()=>{
 const store=storage();
 for(const [req,status] of [[request({}, {origin:'https://other.example'}),403],[request({page:'//evil.example'}),400],[request({page:'/faq/?secret=1'}),400],[request({explanation:'short'}),400],[request({website:'spam'}),400],[request({explanation:'a'.repeat(9000)}),413],[request({}, {'content-type':'text/plain'}),415]]) {
 assert.equal((await submitCorrection(req,store)).status,status);
 }
 assert.equal(store.writes.length,0);
});
test('unavailable correction storage does not claim receipt',async()=>{
 const broken={async get(){return null},async put(){throw new Error('offline')}};
 assert.equal((await submitCorrection(request(),broken)).status,503);
 assert.equal((await submitCorrection(request())).status,503);
 assert.equal((await submitCorrection(new Request('https://ensolens.com/api/corrections/'),broken)).status,405);
});
