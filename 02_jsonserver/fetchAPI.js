async function json_func() {
  try {
    let promise = await fetch("http://localhost:3000/posts/5", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 5,
        title: "5번 수정연습",
        author: "admin",
      }),
    });
    let resolve = await promise.json();
    console.log("결과=>", resolve);

    promise = await fetch("http://localhost:3000/posts");
    resolve = await promise.json();
    console.log("조회=>", resolve);
  } catch (err) {
    console.log(err);
  }
}

json_func();
// fetch("http://localhost:3000/posts/3", {
//   method: "delete",
// })
//   .then((resolve) => resolve.text())
//   .then((result) => {
//     console.log("삭제결과=>", result);
//     return fetch("http://localhost:3000/posts");
//   })
//   .then((resolve) => resolve.json())
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
