const puppeteer = require("puppeteer");
const _ = require("lodash");
const Page = require("./models/page.model");
const { findInDB, uniques } = require("./facebook");
const FacebookAnalytic = async (link) => {
  /* const OLD = await Page.find({})
    .select("id url text img -_id")
    .select("-__v")
    .exec()
    .then((result) => {
      return result;
    }); */

  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
  );
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(link + "/videos", {
    waitUntil: "networkidle0",
  });
  let fullLink = link + "/videos/";

  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("End", { delay: 5000 });
  }
  const page_raw = await Promise.all(
    (
      await page.$x(
        "//span[contains(@class, 'd2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 ns63r2gh rwim8176 m6dqt4wy h7mekvxk hnhda86s oo9gr5id hzawbc8m')]"
      )
    ).map(
      async (item) => await (await item.getProperty("innerText")).jsonValue()
    )
  );
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
  const view_raw = await Promise.all(
    (
      await page.$x("//div[@class='bnpdmtie']")
    ).map(
      async (item) => await (await item.getProperty("textContent")).jsonValue()
    )
  );

  let view = view_raw.filter(function (item, index) {
    return index % 2 === 1;
  });
  const react = await Promise.all(
    (
      await page.$x(
        "//span[contains(@class, 'ni8dbmo4 stjgntxs ltmttdrg')]//span[contains(@class, 'tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41')]"
      )
    ).map(
      async (item) => await (await item.getProperty("textContent")).jsonValue()
    )
  );

  const img = await Promise.all(
    (
      await page.$x("//img[contains(@alt,'Video thumbnail')]")
    ).map(async (item) => await (await item.getProperty("src")).jsonValue())
  );

  let fileName = [];
  text.forEach((item, index) => {
    let name = item
      .replace(/\n/g, "")
      .replace(/[!@#$%^&*"]/g, "")
      .replace(/[”“]+/g, "");
    let shortName = name.slice(0, 50);
    let finalName = shortName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\//g, "-");
    let finalName2 = finalName.replaceAll(" ", "_");
    fileName.push(finalName2);
  });
  let page_name = page_raw
    .toString()
    .replace(/\n/g, "")
    .replace(/[!@#$%^&*"]/g, "")
    .replace(/[”“]+/g, "");

  let result = [];
  for (let i = 0; i < hrefs.length; i++) {
    let id = hrefs[i].split("/");
    result.push({
      id: id[id.length - 2],
      url: hrefs[i],
      text: text[i],
      img: img[i],
      view: view[i],
      react: react[i],
      fileName: fileName[i],
      pageName: page_name,
    });
  }
  let finalResult = _.uniq(result);

  // await page.screenshot({ path: "example.png" });
  //let abc = await page.$("._52jh");
  //console.log(abc);
  //await browser.close();
  /*  Page.insertMany(result, function (err, page) {
    if (!err) console.log("ok");
    console.log(err);
  }); */
  return finalResult;
};

module.exports = FacebookAnalytic;
