require("dotenv/config");
const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(process.env.APP_LOGIN_URL);
  await page.type(process.env.APP_USER_INPUT_ID, process.env.APP_USER);
  await page.type(process.env.APP_PASSWORD_INPUT_ID, process.env.APP_PASSWORD);
  await page.click(process.env.APP_BUTTON_SUBMIT_CLASS);
  await page.waitForNavigation();
  console.log("New Page URL:", page.url());
}
main();
