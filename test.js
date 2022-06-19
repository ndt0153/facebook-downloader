const DownloadFacebookVideo = require("./test3.js");
//import fs from "fs";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const reqs = [
  {
    id: "1394067574406503",
    url: "https://www.facebook.com/Divodivafanvietnam/videos/%C6%B0u-v%C3%A0-khuy%E1%BA%BFt-%C4%91i%E1%BB%83m-th%C6%B0%E1%BB%9Dng-th%E1%BA%A5y-khi-x%E1%BB%AD-l%C3%BD-1-b%E1%BA%A3n-pop-ballad/1394067574406503/",
    text: "Ưu và Khuyết điểm thường thấy khi xử lý 1 bản Pop Ballad!",
    img: "https://scontent.fvca1-3.fna.fbcdn.net/v/t15.5256-10/285653200_837002067275279_6932817710180662348_n.jpg?stp=dst-jpg_p370x247&_nc_cat=111&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=qO_DaJ9goaIAX8YXMjJ&_nc_ht=scontent.fvca1-3.fna&oh=00_AT9J-ylT2LxVQe5DppI3X-jAdCyZRzZEwg9hQDmRTpkuOA&oe=62A61935",
  },
  {
    id: "789173179097102",
    url: "https://www.facebook.com/Divodivafanvietnam/videos/kh%C3%BAc-giao-tranh-phi%C3%AAn-b%E1%BA%A3n-k%E1%BB%B3-%E1%BA%A3o/789173179097102/",
    text: "Khúc Giao Tranh - Phiên bản Kỳ ảo!!!",
    img: "https://scontent.fvca1-2.fna.fbcdn.net/v/t15.5256-10/284576313_762567298229793_3390500662432804911_n.jpg?stp=dst-jpg_p370x247&_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=AEHfM-_VCakAX_eFwgd&_nc_oc=AQlg0RkgypxPLR0qPMPG9CQag2aHToTOlli6JRSMtlVTjpazi2UHHV1HmwfoAoHY-fLkG4B6G-gRrKDzfjBxMjI5&_nc_ht=scontent.fvca1-2.fna&oh=00_AT8ScerOsOhPRvoeGFKb52zQG8QhtuwkhpzQX2ynBK5IAg&oe=62A4D6ED",
  },
  {
    id: "268346698799003",
    url: "https://www.facebook.com/Divodivafanvietnam/videos/ng%C6%B0%E1%BB%9Di-t%C3%ACnh-m%C3%B9a-%C4%91%C3%B4ng-ver-nam-tr%E1%BA%A7m/268346698799003/",
    text: "Người Tình Mùa Đông ver. Nam Trầm!!!",
    img: "https://scontent.fvca1-2.fna.fbcdn.net/v/t15.5256-10/281718725_1315870828939486_7410041988243545551_n.jpg?stp=dst-jpg_p370x247&_nc_cat=100&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=EDRcvaRuLycAX88vb9o&_nc_ht=scontent.fvca1-2.fna&oh=00_AT-TZgyH3y4JZpiPgOVrZeO-gKOagJwJ1clb8bOGka09vg&oe=62A585EC",
  },
];
const hello = async () => {
  //fs.createWriteStream("stdout.txt");
  for (let [index, req] of reqs.entries()) {
    const message =
      "Dang tai file " +
      req.text +
      " (" +
      parseInt(index + 1) +
      "/" +
      reqs.length +
      ")" +
      "\n";
    // console.log(message);
    let abc = await DownloadFacebookVideo(req.text, req.url, message);
    await delay(15000);
    //console.log(abc);
  }
};
hello();
