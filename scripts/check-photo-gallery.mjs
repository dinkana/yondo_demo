import {chromium} from 'playwright'
import assert from 'node:assert/strict'
const url=new URL(process.env.DEMO_URL ?? 'http://127.0.0.1:4318/yondo_demo/')
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL || undefined})
try {
  const ctx=await browser.newContext({viewport:{width:375,height:812},hasTouch:true})
  const page=await ctx.newPage();page.setDefaultTimeout(10000)
  await page.goto(url.href);await page.locator('.hero-image').evaluate(e=>e.decode())
  const m=await (await page.request.get(new URL('places/index.json',url).href)).json()
  assert.equal(new Set(m.map(p=>p.id)).size,8)
  await page.waitForFunction(async()=> (await navigator.serviceWorker.getRegistration())?.active?.state==='activated')
  await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller)
  await ctx.setOffline(true);await page.reload()
  const all=page.locator('a[href*="/tour/"] img');await all.first().waitFor();assert.equal(await all.count(),14)
  const srcs=new Set();for(const img of await all.all()){await img.scrollIntoViewIfNeeded();const src=await img.evaluate(async e=>{await e.decode();return new URL(e.currentSrc).pathname.split('/').pop()});srcs.add(src)}
  assert.deepEqual([...srcs].sort(),m.map(p=>p.file).sort())
  await page.getByRole('link').filter({has:page.getByRole('heading',{name:'Иремель для всей семьи',exact:true})}).click()
  const opener=page.getByRole('button',{name:/Увеличить фото:/});await opener.click()
  const box=page.getByRole('dialog',{name:'Просмотр фотографий маршрута'});await box.waitFor();await box.locator('img').evaluate(e=>e.decode())
  const first=await box.locator('img').getAttribute('src');await page.keyboard.press('ArrowRight');assert.notEqual(await box.locator('img').getAttribute('src'),first)
  await page.keyboard.press('ArrowLeft');assert.equal(await box.locator('img').getAttribute('src'),first);await page.keyboard.press('Escape');await box.waitFor({state:'hidden'});assert.ok(await opener.evaluate(e=>e===document.activeElement))
  await page.getByRole('button',{name:'Маршрут',exact:true}).click();await page.locator('figure img').evaluate(e=>e.decode());
  await page.getByRole('link',{name:'О демо',exact:true}).click();assert.equal(await page.locator('#photo-credits li').count(),m.length)
  console.log('Offline: 14 tour covers, 8 unique decoded photos, tour, gallery next/previous/Escape/focus, route diagram and credits OK')
}finally{await browser.close()}
