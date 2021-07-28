const crypto = require('crypto');
const [key, iv, algorithm, encoding, cipherEncoding] = [
    'a123456789', '', 'aes-128-ecb', 'utf8', 'base64'
];

// 密码
const handleKey = key => {
    const bytes = Buffer.alloc(16); // 初始化一个 Buffer 实例，每一项都用 00 填充
    console.log(bytes); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
    bytes.fill(key, 0, 10) // 填充
    console.log(bytes); // <Buffer 61 31 32 33 34 35 36 37 38 39 00 00 00 00 00 00>

    return bytes;
}
console.log(handleKey);
// 加密
let cipher = crypto.createCipheriv(algorithm, handleKey(key), iv);
console.log(cipher);
/**
 * update方法
 * 第一个参数代表加密的数据
 * 第二参数代表传入数据的格式，可以是'utf8', 'ascii', 'latin1'
 * 第三个参数代表加密数据的输出格式，可以是'latin1'， 'base64' 或者 'hex'。没有执行则返回Buffer
 */
let crypted = cipher.update('深入浅出Node.js', encoding, cipherEncoding);
/**
 * final方法，返回任何加密的内容
 * 参数可以是'latin1', 'base64' 或者 'hex'，没有指定返回Buffer
 */
crypted += cipher.final(cipherEncoding);

console.log(crypted); // BSc+NwepcdXkRvpWsqBi/vosgdbAakRngRtWMNYJlcY=


