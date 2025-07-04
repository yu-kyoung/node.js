const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./sql/.env" });
const nodemailer = require("./nodemailer");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");

const mysql = require("./sql");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Root 경로");
});

app.listen(3000, () => {
  console.log("http://localhost:3000 running...!!!");
});
//이메일 발송 화면
app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//이메일 전송
app.post("/email", async (req, res) => {
  try {
    let result = await nodemailer.sendEmail(req.body.param);
    console.log(result);
    res.send({ retCode: "success", retVal: result });
  } catch (err) {
    res.send({ retCode: "fail" });
  }
});
//npm run dev
//엑셀 업로드 => db insert

//multer.
//이메일 발송 화면
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html"));
});

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
});

//첨부처리
app.post("/excel", upload.single("myFile"), (req, res) => {
  console.log(req.file); //업로드된 파일의 정보
  console.log(req.body); //요청몸체 정보
  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`);
  const firstSheetName = workbook.SheetNames[0]; //첫번째 시트
  const firstSheet = workbook.Sheets[firstSheetName];
  //첫번째 시트의 데이터를 객체로 생성
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
  console.log(firstSheetJson);

  //정렬된 배열 생성 sort
  const fsj = firstSheetJson //
    .sort((a, b) => {
      return a.name < b.name; //오름차순(a<b), 내림차순(a>b) 이름순 정렬
    });

  //반복문활용 insert
  fsj.forEach(async (customer) => {
    await mysql.query("customerInsert", customer);
  });

  if (!req.file) {
    res.send("이미지만 처리가능");
  } else {
    res.send("업로드 완료");
  }
});

//엑셀 파일로 다운받기
app.get("/download", async (req, res) => {
  try {
    const result = await mysql.query("customerList");

    result.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    // JSON → Worksheet 생성
    const worksheet = xlsx.utils.json_to_sheet(result);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "고객이다");

    // 파일 생성 → Buffer로 메모리에 저장
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // 파일 다운로드 응답
    res.setHeader("Content-Disposition", "attachment; filename=customers.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(excelBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("엑셀 생성 실패");
  }
});

// let data = ["name01", "test@email.com", "010-0000-0004"];
// data = [
//   {
//     name: "username",
//     email: "user@email.com",
//     phone: "010-0000-0006",
//     address: "",
//   },
//   1,
// ];
//console.log(custSql["customerInsert"]);

//조회
app.get("/customers", async (req, res) => {
  try {
    let result = await mysql
      .query("customerList") //
      .res.send(result);
  } catch (err) {
    res.send("에러=>", err);
  }
});

//추가
app.post("/customer", async (req, res) => {
  try {
    console.log(req.body.param);
    let data = req.body.param;
    let result = await mysql.query("customerInsert", data); //
    res.send(result);
  } catch (err) {
    res.send("에러=>", err);
  }
});

//수정
app.put("/customer", async (req, res) => {
  try {
    let data = req.body.param; //[{},1]
    let result = await mysql.query("customerUpdate", data); //
    res.send(result);
  } catch (err) {
    res.send("에러=>", err);
  }
});

//삭제 http://localhost:3000/customer/8
app.delete("/customer/:id", async (req, res) => {
  try {
    console.log(req.params);
    let { id } = req.params; //{id:8}

    let result = await mysql.query("customerDelete", id); //
    res.send(result);
  } catch (err) {
    res.send("에러=>", err);
  }
});

// query("customerInsert", {
//   name: "홍길동",
//   email: "hong@email.com",
//   phone: "010-0000-0005",
//   address: "",
// });

// query("customerUpdate", [
//   {
//     name: "홍길동",
//     email: "hong@email.com",
//     phone: "010-0000-0005",
//     address: "",
//   },
//   1,
// ]);

// const updatedData = {
//   name: "홍길동",
//   email: "hong@email.com",
//   phone: "010-0000-0005",
//   address: "",
// };

// const id = 1;

// query("customerUpdate", [updatedData, id]);
