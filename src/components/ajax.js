/**
 * https://jsonplaceholder.typicode.com/users
 * @returns
 */

export async function ajax() {
  let url = "https://jsonplaceholder.typicode.com/users";
  const httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = (event) => {
    console.log(`state : ${httpRequest.readyState} / status : ${httpRequest.status} `);
    /*
      readyState values 
        0 (uninitialized) - (request가 초기화되지 않음)
        1 (loading) - (서버와의 연결이 성사됨)
        2 (loaded) - (서버가 request를 받음)
        3 (interactive) - (request(요청)을 처리하는 중)
        4 (complete) - (request에 대한 처리가 끝났으며응답할 준비가 완료됨)
    */
  };

  const responseReady = () => {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          return httpRequest.responseText;
        } else {
          return new Error("request problem");
        }
      } else {
        return new Error("can not request call function");
      }
    } catch (error) {
      return new Error("Exception error ", error);
    }
  };

  /* 
        open 첫번째 파라메터 "GET" or "POST" or "HEAD" 등
             두번째 파라멘터 URL 호출하고자 하는 주소
             세번쨰 default true 비동기, false 동기
    */
  httpRequest.open("GET", url);
  httpRequest.send();
}

let resource = "https://jsonplaceholder.typicode.com/users";
let postData = {
  name: "test",
};
let init = {
  method: "GET", // "POST" "PUT" "DELETE" "PATCH"
  body: JSON.stringify(postData),
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "same-origin",
};

export function ajaxFetch(resource) {
  fetch(resource)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log(responseText);
      }
    })
    .then((jsonData) => {
      return jsonData;
    })
    .catch((error) => {
      return new Error(error);
    });
}
