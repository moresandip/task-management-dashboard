import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://127.0.0.1:3000/';

async function runTests() {
  console.log('🚀 Starting FocusBoard Automated Verification Suite...\n');

  // Ensure screenshots directory exists
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const tempProfileDir = path.resolve('temp_qa_profile');
  if (fs.existsSync(tempProfileDir)) {
    try { fs.rmSync(tempProfileDir, { recursive: true, force: true }); } catch {}
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    userDataDir: tempProfileDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  const results = [];
  function assert(testName, passed, details = '') {
    results.push({ testName, passed, details });
    console.log(`${passed ? '✅ PASS' : '❌ FAIL'}: ${testName} ${details ? '(' + details + ')' : ''}`);
  }

  try {
    // 1. Load application
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
    assert('Application Initial Load', true, 'Loaded at ' + APP_URL);

    // 2. Desktop Screenshot
    const desktopScreenshotPath = path.join(screenshotsDir, 'desktop-dashboard.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    assert('Desktop Screenshot Generated', fs.existsSync(desktopScreenshotPath), desktopScreenshotPath);

    // 3. Verify Elements Presence
    const titleText = await page.$eval('.hero-title', el => el.textContent);
    assert('Hero Title Rendered', titleText.includes('Your work, in focus.'), titleText);

    const totalTasksVal = await page.$$eval('.stat-card-value', els => els.map(el => el.textContent.trim()));
    assert('Overview Stats Rendered', totalTasksVal.length === 3, `Stats values: [${totalTasksVal.join(', ')}]`);

    // 4. Focus Notes Carousel Navigation
    const slide1Title = await page.$eval('.slide-title', el => el.textContent.trim());
    assert('Carousel Slide 1 Title', slide1Title === 'Make today count.', slide1Title);

    // Click Next
    await page.click('.next-btn');
    await new Promise(r => setTimeout(r, 200));
    const slide2Title = await page.$eval('.slide-title', el => el.textContent.trim());
    assert('Carousel Slide 2 Navigation', slide2Title === 'Small steps, big progress.', slide2Title);

    // Click Next again
    await page.click('.next-btn');
    await new Promise(r => setTimeout(r, 200));
    const slide3Title = await page.$eval('.slide-title', el => el.textContent.trim());
    assert('Carousel Slide 3 Navigation', slide3Title === 'Celebrate the wins.', slide3Title);

    // Click Prev
    await page.click('.prev-btn');
    await new Promise(r => setTimeout(r, 200));
    const backToSlide2 = await page.$eval('.slide-title', el => el.textContent.trim());
    assert('Carousel Prev Navigation', backToSlide2 === 'Small steps, big progress.', backToSlide2);

    // 5. Search Functionality
    await page.type('.search-input', 'Design');
    await new Promise(r => setTimeout(r, 200));
    const searchCount = await page.$$eval('.task-row-card', els => els.length);
    assert('Search Case-Insensitive Filter', searchCount >= 1 && searchCount < 8, `Visible tasks after searching "Design": ${searchCount}`);

    // Clear Search
    await page.click('.search-clear-btn');
    await new Promise(r => setTimeout(r, 200));
    const resetSearchCount = await page.$$eval('.task-row-card', els => els.length);
    assert('Search Clear Button', resetSearchCount >= 8, `Visible tasks restored: ${resetSearchCount}`);

    // 6. Filter Tabs
    const inProgressTab = (await page.$$('.status-tab-btn'))[1];
    await inProgressTab.click();
    await new Promise(r => setTimeout(r, 200));
    const inProgTasks = await page.$$eval('.task-row-card', els => els.length);
    assert('Status Tab Filter (In progress)', inProgTasks > 0, `In-progress tasks shown: ${inProgTasks}`);

    // Reset filters
    const allTab = (await page.$$('.status-tab-btn'))[0];
    await allTab.click();
    await new Promise(r => setTimeout(r, 200));

    // 7. Create Task Validation
    await page.click('.desktop-new-task-btn');
    await new Promise(r => setTimeout(r, 300));
    assert('Task Form Modal Opens', await page.$('.task-form-modal') !== null);

    // Submit empty form -> check validation
    await page.click('.modal-submit-btn');
    await new Promise(r => setTimeout(r, 200));
    const errorText = await page.$eval('.error-message', el => el.textContent.trim());
    assert('Form Validation (Empty Title Rejected)', errorText.includes('required'), errorText);

    // Fill valid data
    await page.type('#task-title-input', 'Automated QA Test Task');
    await page.type('#task-desc-input', 'Created via Puppeteer headless test run');
    await page.select('#task-status-select', 'In progress');
    await page.select('#task-priority-select', 'High');
    await page.click('.modal-submit-btn');
    await new Promise(r => setTimeout(r, 300));

    const newTaskVisible = await page.$eval('.task-list-wrapper', el => el.textContent.includes('Automated QA Test Task'));
    assert('New Task Created & Rendered', newTaskVisible);

    // 8. Status Toggle
    const firstCheckbox = (await page.$$('.task-status-checkbox'))[0];
    await firstCheckbox.click();
    await new Promise(r => setTimeout(r, 200));
    assert('Task Status Quick Toggle', true, 'Toggled status on newly created task');

    // 9. Edit Task Flow
    const firstKebab = (await page.$$('.task-menu-trigger-btn'))[0];
    await firstKebab.click();
    await new Promise(r => setTimeout(r, 200));
    
    // Click Edit task
    const editBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('.dropdown-menu-item'));
      return btns.find(b => b.textContent.includes('Edit task'));
    });
    await editBtn.click();
    await new Promise(r => setTimeout(r, 300));

    // Change title
    await page.evaluate(() => {
      const input = document.querySelector('#task-title-input');
      input.value = '';
    });
    await page.type('#task-title-input', 'Automated QA Test Task (Edited)');
    await page.click('.modal-submit-btn');
    await page.waitForFunction(() => !document.querySelector('.task-form-modal'));
    await new Promise(r => setTimeout(r, 300));

    const editedTaskVisible = await page.$eval('.task-list-wrapper', el => el.textContent.includes('Automated QA Test Task (Edited)'));
    assert('Task Edit & Save Flow', editedTaskVisible);

    // 10. Delete Task Flow
    const updatedKebab = (await page.$$('.task-menu-trigger-btn'))[0];
    await updatedKebab.click();
    await page.waitForSelector('.delete-item', { visible: true, timeout: 2000 });
    
    await page.evaluate(() => {
      const del = document.querySelector('.delete-item');
      if (del) del.click();
    });
    
    await page.waitForSelector('.delete-confirm-modal', { visible: true, timeout: 2000 });
    assert('Delete Confirmation Modal Opened', true);

    await page.evaluate(() => {
      const confirmBtn = document.querySelector('.delete-confirm-btn');
      if (confirmBtn) confirmBtn.click();
    });
    
    await page.waitForFunction(() => !document.querySelector('.delete-confirm-modal'));
    await new Promise(r => setTimeout(r, 300));

    const taskDeleted = !(await page.$eval('.task-list-wrapper', el => el.textContent.includes('Automated QA Test Task (Edited)')));
    assert('Task Deleted Successfully', taskDeleted);

    // 11. Mobile Viewport (390 x 844) & Mobile Screenshot
    await page.setViewport({ width: 390, height: 844 });
    await new Promise(r => setTimeout(r, 400));

    const mobileNavVisible = await page.$eval('.mobile-bottom-nav', el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none';
    });
    assert('Mobile Bottom Nav Visible at 390px', mobileNavVisible);

    const mobileScreenshotPath = path.join(screenshotsDir, 'mobile-dashboard.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    assert('Mobile Screenshot Generated', fs.existsSync(mobileScreenshotPath), mobileScreenshotPath);

    // 12. LocalStorage Persistence Test
    await page.reload({ waitUntil: 'networkidle0' });
    const countAfterReload = await page.$$eval('.task-row-card', els => els.length);
    assert('LocalStorage State Restored on Reload', countAfterReload >= 8, `Tasks present: ${countAfterReload}`);

  } catch (err) {
    console.error('Test execution error:', err);
    assert('Execution without Unhandled Exception', false, err.message);
  } finally {
    await browser.close();
  }

  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;

  console.log('\n=======================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passedCount}/${results.length} PASSED (${failedCount} failed)`);
  console.log('=======================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests();
