import {test,after,before} from 'node:test';
import assert from 'node:assert/strict';
import {app} from './app.js';
let server,base;
before(async()=>{server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));base=`http://127.0.0.1:${server.address().port}`});
after(()=>new Promise(r=>server.close(r)));
test('health and five populated categories',async()=>{assert.equal((await(await fetch(base+'/api/health')).json()).status,'ok');const categories=await(await fetch(base+'/api/categories')).json();assert.equal(categories.length,5);for(const c of categories){const items=await(await fetch(base+'/api/entries?category='+c.id)).json();assert.ok(items.length>0);assert.ok(items.every(e=>e.category===c.id&&e.name&&e.image&&e.summary))}});
test('search supports accents and group filtering',async()=>{const items=await(await fetch(base+'/api/entries?category=personagens&q=chapeu')).json();assert.ok(items.length>0);const group=await(await fetch(base+'/api/entries?group='+encodeURIComponent('Piratas Heart'))).json();assert.ok(group.length>0);assert.ok(group.every(e=>e.group==='Piratas Heart'));assert.deepEqual(await(await fetch(base+'/api/entries?q=doesnotexist')).json(),[])});
test('detail and missing resources',async()=>{const luffy=await(await fetch(base+'/api/entries/luffy')).json();assert.equal(luffy.name,'Monkey D. Luffy');assert.equal((await fetch(base+'/api/entries/missing')).status,404);assert.equal((await fetch(base+'/api/missing')).status,404)});
