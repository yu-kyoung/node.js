const { format } = require("mysql2");
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "yukyung300@daum.net",
    pass: "obkjwfvlacxopniu",
  },
};

const sendEmail = async (data) => {
  //promise 객체로 반환
  return new Promise(async (resolve, reject) => {
    let tp = nodemailer.createTransport(config);
    try {
      let result = await tp.sendMail(data);
      console.log("메일 성공", result);
      resolve(result);
    } catch (err) {
      console.log("메일 실패", err);
      reject(err);
    }
  });
};
// tp.sendMail({
//   from: "yukyung300@daum.net",
//   to: "1119_dh@naver.com",
//   subject: "mail 연습중",
//   text: " 연습중 입니다.",
// });
module.exports = { sendEmail };
