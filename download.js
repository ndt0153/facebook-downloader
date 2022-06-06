const puppeteer = require("puppeteer");
var _ = require("lodash");

const FacebookAnalytic = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.facebook.com/Divodivafanvietnam/videos/", {
    waitUntil: "networkidle0",
  });
  for (let i = 0; i < 2; i++) {
    await page.keyboard.press("PageDown", { delay: 2000 });
  }
  const hrefs_raw = await Promise.all(
    (
      await page.$x(
        "//a[contains(@href,'https://www.facebook.com/Divodivafanvietnam/videos/')]"
      )
    ).map(async (item) => await (await item.getProperty("href")).jsonValue())
  );
  const hrefs = _.uniq(hrefs_raw);
  const text_raw = await Promise.all(
    (
      await page.$x(
        "//a[contains(@href,'https://www.facebook.com/Divodivafanvietnam/videos/')]"
      )
    ).map(async (item) => await (await item.getProperty("text")).jsonValue())
  );
  let text = text_raw.filter(function (item, index) {
    return index % 2 === 1;
  });

  const img = await Promise.all(
    (
      await page.$x("//img[contains(@alt,'Video thumbnail')]")
    ).map(async (item) => await (await item.getProperty("src")).jsonValue())
  );
  _.uniq(text);
  _.uniq(hrefs);
  _.uniq(img);
  let result = [];
  for (let i = 0; i < hrefs.length; i++) {
    result.push({
      href: hrefs[i],
      text: text[i],
      img: img[i],
    });
  }
  // await page.screenshot({ path: "example.png" });
  //let abc = await page.$("._52jh");
  //console.log(abc);
  await browser.close();
  return result;
};
module.exports = FacebookAnalytic;
