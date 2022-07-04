const fs = require("fs");
const os = require("os");
const path = require("path");

const downloadDir = path.join(os.homedir(), "Downloads");
const DownloadFacebookVideo = async (name, url, pageName, message) => {
  const { execa } = await import("execa");

  const subprocess = execa("youtube-dl", [
    "-f",
    "bestvideo[height>=720]+m4a/webm+m4a",
    "-o",
    downloadDir + "/" + "Facebook Downloader/" + pageName + "/" + name,
    "--merge-output-format",
    "mp4",
    url,
  ]);
  //console.log(message + "test3");
  if (message) {
    fs.appendFileSync("stdout.txt", message);
  }
  subprocess.stdout.pipe(fs.createWriteStream("stdout.txt", { flags: "a" }));
};

//export default DownloadFacebookVideo;
module.exports = DownloadFacebookVideo;
//console.log({ stdout, stderr });
//const { stdout } = await execa("find", ["/"])
//console.log({ stdout });
