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

  async function clickByText(selector, textPattern) {
    return await page.evaluate((sel, text) => {
      const elements = Array.from(document.querySelectorAll(sel));
      const target = elements.find(el => el.innerText && el.innerText.includes(text));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, selector, textPattern);
  }

  // 1. PUBLIC ROOMS
  console.log('1. Capturing Public Rooms...');
  await page.goto('http://localhost:5173/');
  await sleep(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '01_public_rooms.png') });

  // 1b. PUBLIC ROOM DETAIL MODAL
  console.log('1b. Capturing Public Room Detail Modal...');
  await clickByText('button', 'Chi tiết');
  await sleep(1000);
  await page.screenshot({ path: path.join(OUT_DIR, '01b_public_room_detail_modal.png') });
  await clickByText('button', 'Đóng');
  await sleep(500);

  // 2. LOGIN SCREEN
  console.log('2. Navigating to Login Screen...');
  await clickByText('button', 'Đăng nhập');
  await sleep(1200);
  await page.screenshot({ path: path.join(OUT_DIR, '02_login_screen.png') });

  // 2b. REGISTER SCREEN
  console.log('2b. Navigating to Register Screen...');
  await clickByText('button', 'Đăng ký');
  await sleep(1200);
  await page.screenshot({ path: path.join(OUT_DIR, '02b_register_screen.png') });

  // 3. LOGIN AS CUSTOMER
  console.log('3. Logging in as Customer...');
  await clickByText('button', 'Đăng nhập');
  await sleep(800);
  await page.type('input[type="email"]', 'customer@fuminihotel.com');
  await page.type('input[type="password"]', '123456');
  await sleep(400);
  await page.click('button[type="submit"]');
  await sleep(2500);

  // 3.1 CUSTOMER BOOKING
  console.log('3.1 Capturing Customer Booking Screen...');
  await clickByText('button', 'Đặt Phòng Online');
  await sleep(1800);
  const checkboxes = await page.$$('input[type="checkbox"]');
  if (checkboxes.length > 0) await checkboxes[0].click();
  if (checkboxes.length > 1) await checkboxes[1].click();
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, '03_customer_booking.png') });

  // 4. CUSTOMER HISTORY
  console.log('4. Capturing Customer History...');
  await clickByText('button', 'Lịch Sử Đặt Phòng');
  await sleep(1800);
  await page.screenshot({ path: path.join(OUT_DIR, '04_customer_history.png') });

  // 4b. CUSTOMER PROFILE
  console.log('4b. Capturing Customer Profile...');
  await clickByText('button', 'Hồ Sơ Cá Nhân');
  await sleep(1500);
  await page.screenshot({ path: path.join(OUT_DIR, '04b_customer_profile.png') });

  // 5. LOGOUT CUSTOMER
  console.log('5. Logging out Customer...');
  await page.evaluate(() => localStorage.clear());
  await page.goto('http://localhost:5173/');
  await sleep(1000);

  // 6. LOGIN AS STAFF
  console.log('6. Logging in as Staff...');
  await clickByText('button', 'Đăng nhập');
  await sleep(800);
  await page.type('input[type="email"]', 'staff@fuminihotel.com');
  await page.type('input[type="password"]', 'staff123');
  await sleep(400);
  await page.click('button[type="submit"]');
  await sleep(2500);

  // 6.1 STAFF ROOMS
  console.log('6.1 Capturing Staff Rooms...');
  await clickByText('button', 'Quản Lý Phòng');
  await sleep(1800);
  await page.screenshot({ path: path.join(OUT_DIR, '05_staff_rooms.png') });

  // 6.1b STAFF ROOM ADD/EDIT MODAL
  console.log('6.1b Capturing Staff Room Add/Edit Modal...');
  await clickByText('button', 'Thêm Phòng Mới');
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, '05b_staff_room_modal.png') });
  await clickByText('button', 'Hủy');
  await sleep(500);

  // 6.1c STAFF ROOM DELETE RULE MODAL
  console.log('6.1c Capturing Staff Room Delete Rule Modal...');
  await clickByText('button', 'Xóa');
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, '05c_staff_room_delete_rule.png') });
  await clickByText('button', 'Hủy');
  await sleep(500);

  // 6.2 STAFF CUSTOMERS
  console.log('6.2 Capturing Staff Customers...');
  await clickByText('button', 'Quản Lý Khách Hàng');
  await sleep(1800);
  await page.screenshot({ path: path.join(OUT_DIR, '06_staff_customers.png') });

  // 6.2b STAFF CUSTOMER ADD/EDIT MODAL
  console.log('6.2b Capturing Staff Customer Modal...');
  await clickByText('button', 'Thêm Khách Hàng');
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, '06b_staff_customer_modal.png') });
  await clickByText('button', 'Hủy');
  await sleep(500);

  // 6.3 STAFF BOOKINGS
  console.log('6.3 Capturing Staff Bookings...');
  await clickByText('button', 'Quản Lý Đặt Phòng');
  await sleep(1800);
  await page.screenshot({ path: path.join(OUT_DIR, '07_staff_bookings.png') });

  // 6.3b STAFF BOOKING DETAIL/STATUS MODAL
  console.log('6.3b Capturing Staff Booking Detail Modal...');
  await clickByText('button', 'Chi tiết');
  await sleep(800);
  await page.screenshot({ path: path.join(OUT_DIR, '07b_staff_booking_detail_modal.png') });

  await browser.close();
  console.log('=== ALL 14 FUNCTIONAL FLOW SCREENSHOTS CAPTURED! ===');
}

run().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
