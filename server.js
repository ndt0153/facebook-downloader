const express = require("express");
const app = express();
const cors = require("cors");
const FacebookAnalytic = require("./download");

app.use(cors());

global.__basedir = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let port = 8181;
app.listen(port, () => {
  console.log(`Running at port: ${port} `);
});
app.get("/download", (req, res) => {
  req = req.query;
  FacebookAnalytic()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/test", (req, res) => {
  req = req.query;
  const response = [
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/kh%C3%BAc-giao-tranh-phi%C3%AAn-b%E1%BA%A3n-k%E1%BB%B3-%E1%BA%A3o/789173179097102/",
      text: "Khúc Giao Tranh - Phiên bản Kỳ ảo!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/284576313_762567298229793_3390500662432804911_n.jpg?stp=dst-jpg_p370x247&_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=WWejWWdkF9QAX9_ZSzg&_nc_oc=AQnRFrolMzQ-oUoEC53-NYKdGVMwBZYAVrUXGhYiwUxBg9JyTFeYs1336ZqR4tNJDDc&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT9_6-VLTtq2RYqdYmTFRajsV5EzI_vSPoAKlGqgJgPY9Q&oe=62A0E26D",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/ng%C6%B0%E1%BB%9Di-t%C3%ACnh-m%C3%B9a-%C4%91%C3%B4ng-ver-nam-tr%E1%BA%A7m/268346698799003/",
      text: "Người Tình Mùa Đông ver. Nam Trầm!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/281718725_1315870828939486_7410041988243545551_n.jpg?stp=dst-jpg_p370x247&_nc_cat=100&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=rM-gGeyD7WwAX9eAT6I&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT-imS8S-2AH03OA1Dba7uzVS6QU8bTvAetHU2za5_FkYA&oe=62A1916C",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/ph%C3%A2n-bi%E1%BB%87t-c%C3%A1ch-h%C3%A1t-sang-v%C3%A0-ph%C3%A8n-qua-c%C3%B9ng-1-b%C3%A0i-h%C3%A1t/308302874804393/",
      text: "Phân biệt cách hát SANG và PHÈN qua cùng 1 bài hát!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/284583975_1046079676312223_4373112343652610651_n.jpg?stp=dst-jpg_p370x247&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=bsh0hxzltJ8AX8-NkaG&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT-VFWfGfDCt_SleE6D6nzS5tRdG1kHJJSUe5-4_bu456w&oe=62A28AC9",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/h%E1%BB%93-qu%E1%BB%B3nh-h%C6%B0%C6%A1ng-h%C3%A1t-tay-tr%C3%A1i-ch%E1%BB%89-tr%C4%83ng-khoe-vocal-c%E1%BB%B1c-%C4%91%E1%BB%89nh/784268402562682/",
      text: "Hồ Quỳnh Hương hát Tay Trái Chỉ Trăng khoe Vocal cực đỉnh!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/284669298_1058662108076495_3042881365169391087_n.jpg?stp=dst-jpg_p370x247&_nc_cat=110&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=oaHWMQG6dxkAX9aXbe4&_nc_oc=AQkycbd6CcoeKYo83khBjqxQd9y3e_vAQTwdvgGnSynIgq0rUu6jjs3jgEqay1aljw8&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT-C3GpkntwqEjok_hEpzPdjdajuHFHM2YR0Kr5k8rYKvA&oe=62A1CF78",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/ai-d%C3%A1m-chung-t%C3%ACnh-%C4%91%C6%B0%E1%BB%A3c-m%C3%A3i-t%C3%B9ng-d%C6%B0%C6%A1ng-ft-anh-h%E1%BA%A3o/547937343624475/",
      text: "Ai Dám Chung Tình Được Mãi - Tùng Dương ft. Anh Hảo!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/283258341_720113615972532_6687821255775547903_n.jpg?stp=dst-jpg_p370x247&_nc_cat=109&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=zf69RZUN3-0AX-3oV3Z&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT-bRbYcOet-kA2tIflZmXh8ro2lEf8z2Z-gACz02RGHcw&oe=62A1BCA9",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/vi%E1%BB%87t-nam-v%C3%B4-%C4%91%E1%BB%8Bch/575481030551044/",
      text: "VIỆT NAM VÔ ĐỊCH!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/279555944_552647963037732_7521763704748696962_n.jpg?stp=dst-jpg_p370x247&_nc_cat=106&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=kLHH0mzb08kAX9zmwPN&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT-QCtFDEwWN5GiqOdxJiegsLOzNPDbAo4_0_mbCJ0JXLA&oe=62A0BAAA",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/h%C3%A1t-l%C3%B4-t%C3%B4-si%C3%AAu-%C4%91%E1%BB%89nh/541698214269411/",
      text: "Hát Lô Tô SIÊU ĐỈNH!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/282013678_127232623058456_4981950273426493065_n.jpg?stp=dst-jpg_p370x247&_nc_cat=107&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=ozHiv4dN4aAAX_R6Drg&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT-eGotnl8UwncyC05YvU2FeySoQ3QUDbp812bvunKdUqQ&oe=62A11589",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/tr%C3%BAc-nh%C3%A2n-live-climax-kh%C3%B3-nh%E1%BA%A5t-trong-c%C3%B3-kh%C3%B4ng-gi%E1%BB%AF-m%E1%BA%A5t-ti%E1%BA%BFc-gh%C3%AA/743433100400825/",
      text: "Trúc Nhân Live Climax khó nhất trong Có Không Giữ, Mất Tiếc Ghê!!!",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/280267634_178359301200296_3742758593580291359_n.jpg?stp=dst-jpg_p370x247&_nc_cat=110&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=1woW66v6UfoAX8CYbDy&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT8F7ZSieFYTEK1nP0JUGzbXst7IDfeyB6rQB01QJ5TZVA&oe=62A14351",
    },
    {
      href: "https://www.facebook.com/Divodivafanvietnam/videos/v%E1%BA%ABn-l%C3%A0-ng%C3%A0y-ch%C6%B0a-gi%C3%B4ng-b%C3%A3o-nh%C6%B0ng-n%C3%B3-l%E1%BA%A1-l%E1%BA%AFm-/985878598787754/",
      text: "Vẫn là Ngày Chưa Giông Bão, nhưng nó lạ lắm ...",
      img: "https://scontent.fsgn16-1.fna.fbcdn.net/v/t15.5256-10/280184676_136582115628368_6056505745499474137_n.jpg?stp=dst-jpg_p370x247&_nc_cat=109&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=-7pgN1PvvoAAX8Vs4tW&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT8hp2nIQ4CM_PK43Rzs35RFkLdG5fuB9swJ1NvvGZ8KwA&oe=62A1E0B0",
    },
  ];
  res.send(response);
});
