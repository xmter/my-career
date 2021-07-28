/**
 * @name concat: Buffer拼接
 * @param list: 是每项为Buffer的数组
 * @param length: 不是list的数组长度，是list中所有Buffer长度的和
*/
Buffer.concat = function (list, length) {
    // 1.异常处理：list不是数组抛出异常
    if (!Array.isArray(list)) {
        throw new Error('Usage: Buffer.concat(list[, length])');
    }
    // 2.list 为空数组 不分配内存空间
    if (list.length === 0) {
        return Buffer.alloc(0);
        // list 有1项,直接返回第一项(即一个小Buffer对象，且包含小Buffer的length)
    } else if (list.length === 1) {
        return list[0];
    }
    // 3.判断length是不是数组，不是重新计算。为了申请大Buffer对象的内存大小用
    if (typeof length !== 'number') {
        length = 0;
        for (let i = 0; i < list.length; i++) {
            let buf = list[i];
            length += buf.length;
        }
    }
    // 4.创建大Buffer对象
    let buffer = Buffer.alloc(length);
    // 5.重新计算小Buffer对象每个字节在大Buffer对象中的位置
    let pos = 0;
    for (let i = 0; i < list.length; i++) {
        let buf = list[i];
        // buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]]);
        // 拷贝buf中某个区域的数据到target中的某个区域
        buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
}

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(14);
const buf3 = Buffer.alloc(18);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength);
// 打印: 42

const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

console.log(bufA);
// 打印: <Buffer 00 00 00 00 ...>

console.log(bufA.length);
// 打印: 42

console.log(bufA.toString());

