const { members, add, getPerson } = require("./data.js"); //

console.log("hellow world");
let myName = "홍길동";
let age = 20;

if (age >= 20) {
  console.log(`${myName}은 성인`);
} else {
  console.log("미성인");
}

//console.log(members);
//console.log(add(10, 20));

members.forEach((item, idx) => {
  if (idx > 0) {
    console.log(item);
  }
}); //function(item, idx, array)

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2]; //배열을 연결 ...

console.log(result);

//object destructuring
let { firstName, lastName, email } = getPerson(); //객체 대 객체
console.log(firstName, lastName, email);

//array destructuring
function getScores() {
  return [70, 80, 90, 50, 60, 20];
}

let [x, y, ...z] = getScores(); //
console.log(x, y, z);

function sumAry(...ary) {
  //파라미터 개수를 알수 없음:rest parameter
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}
sumAry(1, 2, 3, 4, 5, 6, 7, 8, 9);
