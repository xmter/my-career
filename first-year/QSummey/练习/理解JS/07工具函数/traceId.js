function getTraceId(length) {
    let ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
    ALPHABET += '0123456789';
    let str = '';
    for (let i = 0; i < length; ++i) {
        let rand = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET.substring(rand, rand + 1);
    }
    console.log(str);
    return str;
}

function traceId() {
    const originStr = 'x'.repeat(32);
    let originChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    originChar += 'abcdefghijklmnopqrstuvwxyz';
    originChar += '0123456789';
    const len = originChar.length;
    return originStr.replace(/x/g, match => (
        originChar.charAt(Math.floor(Math.random() * len))
    ));
}

getTraceId(32) // "NdQKOr"

console.log(traceId());