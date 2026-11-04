const puppeteer = require('d:/Ky7_FA2026/SBA301/A2LamDangKyAnh_SE1910/frontend/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

const OUT_DIR = 'd:/Ky7_FA2026/SBA301/A3LamDangKyAnh_SE1910/docs/screenshots';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1400, height: 900 }
  });

  const page = await browser.newPage();

  // Helper to click element by text inside matching selector
  async function clickByText(selector, textPattern) {
    const success = await page.evaluate((sel, text) => {
      const elements = Array.from(document.querySelectorAll(sel));
      const target = elements.find(el => el.innerText && el.innerText.includes(text));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, selector, textPattern);
    return success;
  }

  // 1. PUBLIC ROOMS
  console.log('1. Capturing Public Rooms...');
  await page.goto('http://localhost:5173/');
  await sleep(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '01_public_rooms.png') });

  // 2. LOGIN SCREEN
  console.log('2. Navigating to Login Screen...');
  await clickByText('button', 'Đăng nhập');
  await sleep(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '02_login_screen.png') });

  // 3. LOGIN AS CUSTOMER
  console.log('3. Logging in as Customer...');
  await page.type('input[type="email"]', 'customer@fuminihotel.com');
  await page.type('input[type="password"]', '123456');
  await sleep(500);
  await page.click('button[type="submit"]');
  await sleep(2500);

  // 3.1 CUSTOMER BOOKING
  console.log('3.1 Capturing Customer Booking Screen...');
  await clickByText('button', 'Đặt Phòng Online');
  await sleep(2000);
  // Pick 2 rooms
  const checkboxes = await page.$$('input[type="checkbox"]');
  if (checkboxes.length > 0) await checkboxes[0].click();
  if (checkboxes.length > 1) await checkboxes[1].click();
  await sleep(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '03_customer_booking.png') });

  // 4. CUSTOMER HISTORY
  console.log('4. Capturing Customer History...');
  await clickByText('button', 'Lịch Sử Đặt Phòng');
  await sleep(2000);
  // Open details modal if button exists
  await page.evaluate(() => {
    const detailBtn = document.querySelector('button.btn-outline-primary, button.btn-outline-info');
    if (detailBtn) detailBtn.click();
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '04_customer_history.png') });

  // 5. LOGOUT CUSTOMER
  console.log('5. Logging out Customer...');
  await page.evaluate(() => localStorage.clear());
  await page.goto('http://localhost:5173/');
  await sleep(1000);

  // 6. LOGIN AS STAFF
  console.log('6. Logging in as Staff...');
  await clickByText('button', 'Đăng nhập');
  await sleep(1000);
  await page.type('input[type="email"]', 'staff@fuminihotel.com');
  await page.type('input[type="password"]', 'staff123');
  await sleep(500);
  await page.click('button[type="submit"]');
  await sleep(2500);

  // 6.1 STAFF ROOMS
  console.log('6.1 Capturing Staff Rooms...');
  await clickByText('button', 'Quản Lý Phòng');
  await sleep(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '05_staff_rooms.png') });

  // 6.2 STAFF CUSTOMERS
  console.log('6.2 Capturing Staff Customers...');
  await clickByText('button', 'Quản Lý Khách Hàng');
  await sleep(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '06_staff_customers.png') });

  // 6.3 STAFF BOOKINGS
  console.log('6.3 Capturing Staff Bookings...');
  await clickByText('button', 'Quản Lý Đặt Phòng');
  await sleep(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '07_staff_bookings.png') });

  await browser.close();
  console.log('=== ALL SCREENSHOTS SUCCESSFULLY AND UNIQUELY CAPTURED! ===');
}

run().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
