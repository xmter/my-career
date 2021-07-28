const fs = require('fs');

// 创建可读流
const inputStream = fs.createReadStream('input.txt');
// 创建可写流
const outputStream = fs.createWriteStream('output.txt');

// 管道读写
inputStream.pipe(outputStream);


