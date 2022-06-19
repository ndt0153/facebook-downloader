const fs = require("fs");
const DownloadFacebookVideo = async (name, url, message) => {
  const { execa } = await import("execa");
  const subprocess = execa("youtube-dl", [
    "-f",
    "webm+m4a",
    "-o",
    "videos/" + name,
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
DownloadFacebookVideo();
//export default DownloadFacebookVideo;
module.exports = DownloadFacebookVideo;
//console.log({ stdout, stderr });
//const { stdout } = await execa("find", ["/"])
//console.log({ stdout });
