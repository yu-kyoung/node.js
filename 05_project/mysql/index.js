require("dotenv").config({ path: "./mysql/.env" });
const mysql = require("mysql2");
const sql = require("./product");

const pool = mysql.createPool({
  //환경 변수
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.LIMIT,
});
console.log(sql["productList"]);

async function query(alias, values, where = " ") {
  return new Promise((resolve, reject) => {
    console.log(sql[alias].query + where);
    pool.query(sql[alias].query + where, values, (err, result) => {
      //()
      if (err) {
        console.log("처리중 에러", err);
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
} // end of query

module.exports = { query };
