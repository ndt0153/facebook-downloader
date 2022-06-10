import { execa } from "execa";
import fs from "fs";
const DownloadFacebookVideo = async (name, url) => {
  const subprocess = execa("youtube-dl", [
    "-f",
    "webm+m4a",
    "-o",
    "videos/" + name,
    "--merge-output-format",
    "mp4",
    url,
  ]);
  subprocess.stdout.pipe(fs.createWriteStream("stdout.txt"));
};
DownloadFacebookVideo();
export default DownloadFacebookVideo;
//module.exports = DownloadFacebookVideo;
//console.log({ stdout, stderr });
//const { stdout } = await execa("find", ["/"])
//console.log({ stdout });
