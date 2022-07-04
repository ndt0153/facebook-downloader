const os = require("os");
const path = require("path");
const desktopDir = path.join(os.homedir(), "Download");
console.log(desktopDir);
