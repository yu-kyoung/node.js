const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express(); //인스턴스 생성
//body-parser
app.use(cors()); //접근허용
app.use(express.json({ limit: "10mb" }));

app.listen(3000, () => {
  //3000포트
  console.log("http://localhost:3000");
});

//다운로드
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;

  //응답정보
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath)) {
    res.send("파일이없습니다.");
  } else {
    fs.createReadStream(filepath).pipe(res);
    //res.send("다운완료");
  }
});
//업로드 경로확인
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//업로드
app.post("/upload/:filename/:pid/:type", (req, res) => {
  const { filename, pid, type } = req.params; //{filename:'sample.jpg',product :3

  // const filePath = `${__dirname}/uploads/${filename}`; //.../05_project/uploads/sample
  const safeFilename = path.basename(filename); //경로공격
  let productDir = path.join(uploadDir, pid, safeFilename);
  let data = req.body.data.slice(req.body.data.indexOf(";base64,") + 8);
  fs.writeFile(productDir, data, "base64", async (err) => {
    await query("productImageInsert", [
      { product_id: pid, type: type, path: filename },
    ]);
    res.send(result);
    if (err) {
      res.send("error");
    } else {
      res.send("success");
    }
  });
});

app.get("/", (req, res) => {
  //라우터
  res.send("root");
});

app.get("/fileupload", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//데이터 쿼리
///localhost:3000/api/productList
app.post("/api/:alias", async (req, res) => {
  // console.log(req.params.alias);
  // console.log(req.body.param); param: {pn:'',pp:23....}
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});

app.get("/todoList", async (req, res) => {
  const result = await query("todoList");
  console.log(result);
  res.json(result);
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("todoDelete", id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});
