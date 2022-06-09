const puppeteer = require("puppeteer");
const _ = require("lodash");
const Page = require("./models/page.model");
const { findInDB, uniques } = require("./facebook");
const FacebookAnalytic = async (link) => {
  const OLD = await Page.find({})
    .select("id url text img -_id")
    .select("-__v")
    .exec()
    .then((result) => {
      return result;
    });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link + "/videos", {
    waitUntil: "networkidle0",
  });
  let fullLink = link + "/videos/";

  for (let i = 0; i < 1; i++) {
    await page.keyboard.press("PageDown", { delay: 2000 });
  }
  const hrefs_raw = await Promise.all(
    (
      await page.$x("//a[contains(@href,'" + fullLink + "')]")
    ).map(async (item) => await (await item.getProperty("href")).jsonValue())
  );
  const hrefs = _.uniq(hrefs_raw);
  const text_raw = await Promise.all(
    (
      await page.$x("//a[contains(@href,'" + fullLink + "')]")
    ).map(async (item) => await (await item.getProperty("text")).jsonValue())
  );
  text_raw.shift();
  if (text_raw.length % 2 === 0) {
    var text = text_raw.filter(function (item, index) {
      return index % 2 === 1;
    });
  } else {
    var text = text_raw.filter(function (item, index) {
      return index % 2 === 0;
    });
  }

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
    let id = hrefs[i].split("/");
    result.push({
      id: id[id.length - 2],
      url: hrefs[i],
      text: text[i],
      img: img[i],
    });
  }
  // await page.screenshot({ path: "example.png" });
  //let abc = await page.$("._52jh");
  //console.log(abc);
  await browser.close();
  Page.insertMany(result, function (err, page) {
    if (!err) console.log("ok");
    console.log(err);
  });
  return result;
};

module.exports = FacebookAnalytic;
