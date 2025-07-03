const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const customerRoute = require("./routes/customer");
const productRoute = require("./routes/product");
const cors = require("cors");

const app = express(); //express 서버의 instance 생성
//application.json 요청
app.use(bodyParser.json());
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//파일업로드 ,multer
//저장경로와 파일명
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //저장경로
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    //업로드 파일명
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8"); //한글 파일명
    callback(null, Date.now() + "_" + fn); //시간_sample.jpg
  },
});
//multer인스턴스 생성
const upload = multer({
  storage: storage,
  limits: { fieldSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const mimetype = /jpg|jpeg|png|gif/.test(file.mimtype); //확장자 파일 걸러줌
    if (mimetype) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
//동일출처 원칙// 모든 서버에서의 요청 허락
app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("./public/index.html", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

//첨부파일 업로드 화면
app.get("/upload", (req, res) => {
  fs.readFile("./public/upload.html", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});
//express에서 에러처리하는 미들웨어
app.use((err, req, res, next) => {
  console.log(err, req, res);
});

//첨부처리
app.post("/upload", upload.array("myFile"), (req, res) => {
  //여러장의 파일 업로드
  console.log(req.files); //업로드된 파일의 정보
  console.log(req.body); //요청몸체 정보
  if (!req.files) {
    res.send("이미지만 처리가능");
  } else {
    res.send("업로드 완료");
  }
});

//동일 출처 원칙
app.get("/getCors", (req, res) => {
  let result = { id: "user01", name: "hong" };
  res.json(result);
});

// app.get("/customer", (req, res) => {
//   res.send("/customer 경로입니다.");
// });

// app.post("/customer", (req, res) => {
//   //res.send("/customer 경로입니다 post 요청.");
//   res.json({ id: 10, name: "hongkildong" });
// });

//bodyparser를 활용해서 요청정보의 바디 정보를 해석
app.post("/json-data", (req, res) => {
  console.log(req.body);
  res.send("josn요청");
});

app.use("/customer", customerRoute);
app.use("/product", productRoute);

app.listen(3000, () => {
  console.log("http://localhost:3000 서버실행");
});
