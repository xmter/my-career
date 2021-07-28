var url = 'https://www.baidu.com/';
var data = { name: "张三", age: undefined }
fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => {
      console.log(res);
      console.log(res.json());
  });