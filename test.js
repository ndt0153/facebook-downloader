const DownloadFacebookVideo = require("./test3.js");
const fs = require("fs");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ProcessDataAndDownload = async (data) => {
  for (let [index, req] of data.entries()) {
    const message =
      "Dang tai file " +
      req.name +
      " (" +
      parseInt(index + 1) +
      "/" +
      data.length +
      ")" +
      "\n";
    // console.log(message);
    let abc = await DownloadFacebookVideo(
      req.name,
      req.value,
      req.pageName,
      message
    );
    await delay(5000);
  }
  return await console.log("OK");
};

module.exports = ProcessDataAndDownload;
