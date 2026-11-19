import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'
const base = process.env.DEMO_URL ?? 'http://127.0.0.1:4318/yondo_demo/'
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || undefined })
await mkdir('qa-output', { recursive: true })
try {
 for (const [width, motion] of [[375,'no-preference'],[1440,'no-preference'],[320,'reduce']]) {
  const page = await browser.newPage({ viewport: {width, height: width > 900 ? 950 : 812}, reducedMotion: motion, serviceWorkers:'block' })
  page.setDefaultTimeout(5000)
  await page.goto(base)
  const opener=page.getByRole('button',{name:'Все фильтры'})
  await opener.click(); const sheet=page.getByRole('dialog',{name:'Фильтры'});
  assert.equal(await sheet.isVisible(),true,'filters should be a named modal dialog');
  await page.keyboard.press('Escape'); await sheet.waitFor({state:'hidden'});
  assert.equal(await opener.evaluate(el=>el===document.activeElement),true,'focus returns to filters');
  const search=page.getByRole('searchbox',{name:'Поиск туров'});
  await search.fill('zzzzzzzzzz'); await page.getByText('Ничего не найдено').waitFor();
  await page.getByRole('button',{name:'Сбросить фильтры'}).click();
  assert.equal(await search.inputValue(),'','reset must also clear the search');
  await page.waitForFunction(()=>document.querySelectorAll('a[href*="/tour/"]').length===14);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow');
  const chip=page.getByRole('button',{name:'Горы',exact:true}); await chip.click();
  assert.equal(await chip.getAttribute('aria-pressed'),'true'); await chip.click();
  await page.waitForFunction(()=>document.querySelectorAll('a[href*="/tour/"]').length===14);
  await page.evaluate(()=>{ document.activeElement?.blur?.();window.scrollTo(0,0) }); await page.waitForTimeout(350);
  await page.screenshot({path:`qa-output/style-${width}-${motion}.png`});
  if(width===1440){
   const card=page.locator('a[href*="/tour/"]').first();const image=card.locator('img');
   await card.hover();await page.waitForTimeout(350);
   assert.notEqual(await image.evaluate(el=>getComputedStyle(el).transform),'none','pointer feedback in regular motion');
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.waitForFunction(el=>matchMedia('(prefers-reduced-motion: reduce)').matches && getComputedStyle(el).transform==='none',await image.elementHandle(),{timeout:500});
  }
  console.log(width,motion,'filter focus, search reset, selected chip, no horizontal overflow: OK'); await page.close();
 }
} finally { await browser.close() }
