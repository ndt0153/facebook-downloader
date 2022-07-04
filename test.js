const DownloadFacebookVideo = require("./test3.js");
//import fs from "fs";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const reqs = [
  {
    name: "Huong_dan_hat_Note_cao_CUC_DE_chi_trong_5_Phut",
    pageName: "Divo,Diva Fan Vietnam",
    value:
      "https://www.facebook.com/Divodivafanvietnam/videos/h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-h%C3%A1t-note-cao-c%E1%BB%B1c-d%E1%BB%85-ch%E1%BB%89-trong-5-ph%C3%BAt/5869951319700442/",
  },
  {
    name: "LIVESHOW_THO_cua_giong_ca_hang_dau_dong_nhac_dan_g",
    pageName: "Divo,Diva Fan Vietnam",
    value:
      "https://www.facebook.com/Divodivafanvietnam/videos/liveshow-th%C6%A1-c%E1%BB%A7a-gi%E1%BB%8Dng-ca-h%C3%A0ng-%C4%91%E1%BA%A7u-d%C3%B2ng-nh%E1%BA%A1c-d%C3%A2n-gian-mi%E1%BB%81n-b%E1%BA%AFc-anh-th%C6%A1-coi-ch%E1%BB%8B-q/438065294524643/",
  },
  {
    name: "Gen_Z_dat_toi_trinh_do_Vocalist_da_hiem,_nhung_la_",
    pageName: "Divo,Diva Fan Vietnam",
    value:
      "https://www.facebook.com/Divodivafanvietnam/videos/gen-z-%C4%91%E1%BA%A1t-t%E1%BB%9Bi-tr%C3%ACnh-%C4%91%E1%BB%99-vocalist-%C4%91%C3%A3-hi%E1%BA%BFm-nh%C6%B0ng-l%C3%A0-vocalist-r%E1%BB%93i-m%C3%A0-v%E1%BA%ABn-c%C3%B2n-kh%C3%B4ng-n/2295283977304641/",
  },
  {
    name: "Uu_va_Khuyet_diem_thuong_thay_khi_xu_ly_1_ban_Pop_",
    pageName: "Divo,Diva Fan Vietnam",
    value:
      "https://www.facebook.com/Divodivafanvietnam/videos/%C6%B0u-v%C3%A0-khuy%E1%BA%BFt-%C4%91i%E1%BB%83m-th%C6%B0%E1%BB%9Dng-th%E1%BA%A5y-khi-x%E1%BB%AD-l%C3%BD-1-b%E1%BA%A3n-pop-ballad/1394067574406503/",
  },
];
const hello = async () => {
  //fs.createWriteStream("stdout.txt");
  for (let [index, req] of reqs.entries()) {
    const message =
      "Dang tai file " +
      req.name +
      " (" +
      parseInt(index + 1) +
      "/" +
      reqs.length +
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
hello();
