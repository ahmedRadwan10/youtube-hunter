const puppeteer = require("puppeteer");

async function getElText(page, selector) {
  return await page.evaluate((selector) => {
    return document.querySelector(selector).innerText;
  }, selector);
}

async function bot() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 0, height: 0 });

  const navigationPromise = page.waitForNavigation({
    waitUntil: "networkidle0",
  });
  await page.goto("https://www.youtube.com/watch?v=PWPIostuC-g", {
    waitUntil: "networkidle0",
  });
  await page.waitForSelector("h1.title");
  await page.evaluate((_) => {
    window.scrollBy(0, window.innerHeight * 3);
  });

  await page.waitForSelector("#comments");
  await navigationPromise;

  const comments = [];
  for (let i = 1; i < 7; i++) {
    const commentSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #comment-content > #expander > #content > #content-text`;
    await page.waitForSelector(commentSelector);
    const commentText = await getElText(page, commentSelector);

    if (commentText) {
      // write each comment to DB or file
      // or batch the for processing later
      //   console.log(`${commentText}`);
      comments.push(commentText);
    }
  }

  await browser.close();
  return 'Done';
}

module.exports = bot;
