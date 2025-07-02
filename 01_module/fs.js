const fs = require("fs");

console.log("start");
//<비동기 방식>
// fs.readFile("./sample/output.log", "utf8", (err, data) => {
//   if (err) {
//     throw err; //에러문장
//   }
//   console.log(data);
// }); //fs.readFileSync(경로 ,인코딩, 콜백함수)
//console.log("end");

//<동기방식>
// let data = fs.readFileSync("./sample/output.log", "utf8");
// console.log(data);
// console.log("end");

fs.writeFile("./sample/write.txt", "글쓰..", "utf8", (err) => {
  if (err) {
    throw err;
  }
  console.log("완료");
});
console.log("end");
