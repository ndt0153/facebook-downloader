const fs = require("fs");
const os = require("os");
const path = require("path");

const downloadDir = path.join(os.homedir(), "Downloads");
const DownloadFacebookVideo = async (name, url, pageName, message) => {
  const { execa } = await import("execa");
  fs.writeFileSync("stdout.txt", "");
  const subprocess = execa("youtube-dl", [
    "-f",
    "webm+m4a",
    "-o",
    downloadDir + "/" + "videos/" + pageName + "/" + name,
    "--merge-output-format",
    "mp4",
    url,
  ]);
  //console.log(message + "test3");
  if (message) {
    fs.appendFileSync("stdout.txt", message);
  }
  subprocess.stdout.pipe(fs.createWriteStream("stdout.txt"));
};

//export default DownloadFacebookVideo;
module.exports = DownloadFacebookVideo;
//console.log({ stdout, stderr });
//const { stdout } = await execa("find", ["/"])
//console.log({ stdout });
