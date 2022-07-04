const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const FacebookAnalytic = require("./download");
const mongoose = require("mongoose");
const dbConnect = require("./db");
const open = require("open");

const { saveToDB, uniques } = require("./facebook");
const ProcessDataAndDownload = require("./test");
app.use(cors());
app.set("view engine", "pug");
global.__basedir = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
mongoose.Promise = global.Promise;

let port = 8181;
app.listen(port, async () => {
  open("http://localhost:8181");
  console.log(`Running at port: ${port} `);
});
/* mongoose
  .connect(dbConnect.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
 */
app.post("/analytics", (req, res, next) => {
  /* const reqs = [
    {
      id: "5869951319700442",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-h%C3%A1t-note-cao-c%E1%BB%B1c-d%E1%BB%85-ch%E1%BB%89-trong-5-ph%C3%BAt/5869951319700442/",
      text: "Hướng dẫn hát Note cao CỰC DỄ chỉ trong 5 Phút!",
      img: "https://scontent.fsgn5-11.fna.fbcdn.net/v/t15.5256-10/286516673_5289258947823652_3601241712476007675_n.jpg?stp=dst-jpg_p370x247&_nc_cat=1&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=ug5IxhHAidUAX9jAlim&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT_QFGRv3X9LjUdz1Y7weBiTNF2JJxKr98xP-JXILZpMcw&oe=62C723C4",
      view: "32.4K views",
      react: "3.5K",
      fileName: "Huong_dan_hat_Note_cao_CUC_DE_chi_trong_5_Phut",
    },
    {
      id: "438065294524643",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/liveshow-th%C6%A1-c%E1%BB%A7a-gi%E1%BB%8Dng-ca-h%C3%A0ng-%C4%91%E1%BA%A7u-d%C3%B2ng-nh%E1%BA%A1c-d%C3%A2n-gian-mi%E1%BB%81n-b%E1%BA%AFc-anh-th%C6%A1-coi-ch%E1%BB%8B-q/438065294524643/",
      text:
        "LIVESHOW “THƠ” của giọng ca hàng đầu dòng nhạc dân gian miền bắc - ANH THƠ \n" +
        "\n" +
        "Coi chị quăng mic vô chuồng gà như thế nào 😌😌😌\n" +
        "\n" +
        "_chuồn_",
      img: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t15.5256-10/289266751_767984257887284_8141305818487355989_n.jpg?stp=dst-jpg_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=KO_7As4p-zQAX-ixb-J&_nc_ht=scontent.fsgn5-12.fna&oh=00_AT8rQhcob43fGIYiIH2Oae1MJHoPiOc1nDtFBEqUsA0MWQ&oe=62C7C007",
      view: "22K views",
      react: "407",
      fileName: "LIVESHOW_THO_cua_giong_ca_hang_dau_dong_nhac_dan_g",
    },
    {
      id: "573681327689203",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/h%E1%BB%93-ng%E1%BB%8Dc-h%C3%A0-%C6%B0%E1%BB%9Bc-%C4%91%C6%B0%E1%BB%A3c-h%C3%A1t-c%C3%B9ng-ph%C3%B9-v%C3%A2n-gi%C3%A1-ch%E1%BB%A7-v%C3%A0-c%C3%A1i-k%E1%BA%BFt/573681327689203/",
      text: "Hồ Ngọc Hà ước được hát cùng Phù Vân Giá Chủ và cái kết!!!",
      img: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t15.5256-10/287854640_5102307466554200_4814021380713771118_n.jpg?stp=dst-jpg_p370x247&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=vngNc6PXWzoAX_tqf7-&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT_uWp76CiEyWWr_sEIBpUPqdRy4GtXHJrnlLDtHbbYFfQ&oe=62C6B25C",
      view: "154.7K views",
      react: "3.9K",
      fileName: "Ho_Ngoc_Ha_uoc_duoc_hat_cung_Phu_Van_Gia_Chu_va_ca",
    },
    {
      id: "1173716563464595",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/gen-z-minh-anh-h%C3%A1t-nh%E1%BA%A1c-tr%E1%BB%8Bnh-c%E1%BB%B1c-chill/1173716563464595/",
      text: "Gen Z Minh Anh hát nhạc Trịnh cực Chill!!!",
      img: "https://scontent.fsgn5-6.fna.fbcdn.net/v/t15.5256-10/286817494_1162054594647493_6135119768213592681_n.jpg?stp=dst-jpg_p370x247&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=avtpJ_t-OWAAX9nLyCS&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT9QUXj4_7a2r63pnAz-1dG_nQ1VUemWZ7TDRhMZmAC21Q&oe=62C754D7",
      view: "102K views",
      react: "5.2K",
      fileName: "Gen_Z_Minh_Anh_hat_nhac_Trinh_cuc_Chill",
    },
    {
      id: "611611696563292",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/b%C3%B9i-lan-h%C6%B0%C6%A1ng-h%C3%A1t-nh%E1%BA%A1c-tr%E1%BB%8Bnh-c%E1%BB%B1c-hay/611611696563292/",
      text: "Bùi Lan Hương hát nhạc Trịnh CỰC HAY!!!",
      img: "https://scontent.fsgn5-12.fna.fbcdn.net/v/t15.5256-10/286320546_321440816857998_764880329999550633_n.jpg?stp=dst-jpg_p370x247&_nc_cat=102&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=AkABqlBHdwMAX86DmN7&_nc_ht=scontent.fsgn5-12.fna&oh=00_AT9sDDHqOwYwL6-G4CR4BElUXAOe4bC3qKSz8tdyc9Lucg&oe=62C80FA8",
      view: "120K views",
      react: "7K",
      fileName: "Bui_Lan_Huong_hat_nhac_Trinh_CUC_HAY",
    },
    {
      id: "878520043541586",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/ph%C3%B9-v%C3%A2n-gi%C3%A1o-ch%E1%BB%A7-bay-l%C3%AAn-h%C3%A1t-t%E1%BA%A1i-m%C3%A2y-lang-thang-%C4%91%C3%A0-l%E1%BA%A1t/878520043541586/",
      text: "Phù Vân Giáo Chủ bay lên hát tại Mây Lang Thang Đà Lạt!!!",
      img: "https://scontent.fsgn5-13.fna.fbcdn.net/v/t15.5256-10/287008258_357859016437298_1841440525562059923_n.jpg?stp=dst-jpg_p206x206&_nc_cat=106&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=NceRtm-JGKwAX8ycF_j&_nc_ht=scontent.fsgn5-13.fna&oh=00_AT_c4xM2b23hQjANAh0F2_iCxdrGq8DBPu4zQSR0fQ745g&oe=62C82EE5",
      view: "41.1K views",
      react: "809",
      fileName: "Phu_Van_Giao_Chu_bay_len_hat_tai_May_Lang_Thang_Da",
    },
    {
      id: "1094215594775215",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/divo-t%C3%B9ng-d%C6%B0%C6%A1ng-b%E1%BA%AFn-note-cao-trong-%C4%91a-v%C5%A9-tr%E1%BB%A5-hope/1094215594775215/",
      text: "Divo Tùng Dương bắn Note cao trong Đa Vũ Trụ HOPE!!!",
      img: "https://scontent.fsgn5-9.fna.fbcdn.net/v/t15.5256-10/286630982_694969471780533_7410515730767555364_n.jpg?stp=dst-jpg_p370x247&_nc_cat=105&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=UUDVAaQR3gYAX_q3xRT&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT_e4gxPEBWWYOXWlvyZxafLLAPap0ev-MiSL1pW-Uh4ng&oe=62C6B15F",
      view: "112.1K views",
      react: "3.9K",
      fileName: "Divo_Tung_Duong_ban_Note_cao_trong_Da_Vu_Tru_HOPE",
    },
    {
      id: "2295283977304641",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/gen-z-%C4%91%E1%BA%A1t-t%E1%BB%9Bi-tr%C3%ACnh-%C4%91%E1%BB%99-vocalist-%C4%91%C3%A3-hi%E1%BA%BFm-nh%C6%B0ng-l%C3%A0-vocalist-r%E1%BB%93i-m%C3%A0-v%E1%BA%ABn-c%C3%B2n-kh%C3%B4ng-n/2295283977304641/",
      text:
        "Gen Z đạt tới trình độ Vocalist đã hiếm, nhưng là Vocalist rồi mà vẫn còn không ngừng hoàn thiện bản thân như Đăng lại càng hiếm hơn!\n" +
        "\n" +
        'Gần 1 năm kể từ lần cuối Page post về cậu trai này và ngày hôm nay, qua bản Live "Đành Phải Buông Tay", Ad không thể không công nhận 1 điều rằng trình ca hát của Đăng đang ngày càng tiến bộ hơn hẳn. Biết hát tiết chế Runs & Riffs hơn, Belting chắc khoẻ, đầy nội lực (ĐẾN TẬN D5 BẰNG CHESTY MIX) cùng khả năng ổn định Dynamic cực kỳ điêu luyện. Có thể nói, trình độ phô diễn giọng hát mà Đăng đang có đã đuổi sát các đàn anh Vocalist thế hệ trước vốn rất nổi tiếng như Trúc Nhân, Bùi Anh Tuấn (Thời Prime), Hoài Lâm (Thời Prime), Trung Quân, ...\n' +
        "\n" +
        "Và nếu để bắt bẻ thì điểm yếu duy nhất mà Đăng vẫn còn tồn đọng so với trước kia chính là cách phát âm. Chất giọng Tenor 2 khá dày kèm kiểu hát đặt nặng tính cộng minh dễ khiến một vài câu chữ như N, Ng của Đăng bị mờ, thiếu rõ ràng. Nếu khắc phục được thì trong thế hệ Gen Z Đăng gần như vô đối. Mà trên thực tế, giờ ca sĩ Gen Z cũng có mấy ai mạnh về Vocal như Đăng đâu ...\n" +
        "\n" +
        "*Link Full của Clip được đặt dưới Comment\n" +
        "\n" +
        "_ 𝗴𝗢𝗱 _",
      img: "https://scontent.fsgn5-3.fna.fbcdn.net/v/t15.5256-10/286197571_345176207745004_2862932947676343126_n.jpg?stp=dst-jpg_p370x247&_nc_cat=104&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=XsXsj5I6VD8AX9PmGI2&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT9hD-Gel9B-99uuQbi5BIcj6ASEfKOT3usyeHIYfToJDA&oe=62C7EED7",
      view: "187.4K views",
      react: "12K",
      fileName: "Gen_Z_dat_toi_trinh_do_Vocalist_da_hiem,_nhung_la_",
    },
    {
      id: "1394067574406503",
      url: "https://www.facebook.com/Divodivafanvietnam/videos/%C6%B0u-v%C3%A0-khuy%E1%BA%BFt-%C4%91i%E1%BB%83m-th%C6%B0%E1%BB%9Dng-th%E1%BA%A5y-khi-x%E1%BB%AD-l%C3%BD-1-b%E1%BA%A3n-pop-ballad/1394067574406503/",
      text: "Ưu và Khuyết điểm thường thấy khi xử lý 1 bản Pop Ballad!",
      img: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t15.5256-10/285653200_837002067275279_6932817710180662348_n.jpg?stp=dst-jpg_p370x247&_nc_cat=111&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=bW_MNELPhJgAX8h_cQf&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT8imvpcj9dITDZ9-2KHurfqEtbt9uKCX_UTJuI7iUDE3w&oe=62C7B775",
      view: "132.2K views",
      react: "3.5K",
      fileName: "Uu_va_Khuyet_diem_thuong_thay_khi_xu_ly_1_ban_Pop_",
    },
  ];
  res.render("list", {
    title: "Analytics",
    lists: reqs,
  }); */
  FacebookAnalytic(req.body.link)
    .then((response) => {
      res.render("list", {
        title: "Analytics",
        message: "Hello there!",
        lists: response,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/", (req, res) => {
  res.render("index", {
    title: "Analytics",
    message: "Hello there!",
  });
});
app.get("/download", (req, res) => {
  req = req.query;
  FacebookAnalytic()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.post("/download", (req, res, next) => {
  //console.log(req.body.data);
  ProcessDataAndDownload(req.body.data).then((response) => {
    res.status(200).send(response);
  });
});
app.get("/test", (req, res) => {
  req = req.query;
  res.send(response);
});
