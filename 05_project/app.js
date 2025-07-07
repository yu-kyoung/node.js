const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
//body-parser
app.use(express.json());

app.listen(3000, () => {
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

app.get("/", (req, res) => {
  res.send("root");
});
///localhost:3000/api/productList
app.post("/api/:alias", async (req, res) => {
  // console.log(req.params.alias);

  // console.log(req.body.param); param: {pn:'',pp:23....}
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where);
  res.send(result);
});
