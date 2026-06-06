import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1600, height: 900 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(2000);

// Screenshot 1: top fold (KPIs + alerts)
await page.screenshot({ path: '/tmp/dash_top.png', clip: { x: 0, y: 0, width: 1600, height: 900 } });

// Screenshot 2: partidas
await page.evaluate(() => window.scrollTo({ top: 750, behavior: 'instant' }));
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/dash_partidas.png', clip: { x: 0, y: 0, width: 1600, height: 900 } });

// Screenshot 3: hoja de ruta + pagos
await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' }));
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/dash_roadmap.png', clip: { x: 0, y: 0, width: 1600, height: 900 } });

await browser.close();
console.log('Screenshots done');
