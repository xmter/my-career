// function getMinSubStr(str, target) {
//   const len = str.length;
//   let l = 0;
//   let r = 0;
//   let minStr = "";
//   let subLenArr = [];
//   while (r <= len) {
//     let count = 0;
//     for (let i = 0; i < target.length; i++) {
//       if (str.substring(l, r).includes(target[i])) {
//         count++;
//       }
//     }
//     if (count === target.length) {
//       subLenArr.push(str.substring(l, r).length);
//       l = l + 1;
//     } else {
//       r = r + 1;
//     }
//   }
//   if (subLenArr.length) {
//     minStr = Math.min.apply(null, subLenArr);
//   }
//   console.log(subLenArr)
//   return minStr;
// }
// console.log(getMinSubStr("abcabcd", "cca")); // 错误  没考虑重复的字符



// 如何判断S的子串中包含了T中的所以字符？
// 分别统计S的子串和T中每个字符出现的次数，然后这个对比

function getMinSubStr(s, t) {
  let res = "";
  let r = 0;
  let l = 0;
  const map = new Map();
  for (let v of t) {
    map.set(v, map.has(v) ? map.get(v) + 1 : 1);
  }

  let mapType = map.size;
  while (r < s.length) {

    const c = s[r];
    if (map.has(c)) {
      map.set(c, map.get(c) - 1);
      if (map.get(c) === 0) {
        mapType -= 1;
      }
    }
    
    while (mapType === 0) {
      let newStr = s.substring(l, r + 1);
     
      if (!res || newStr.length < res.length) {
        res = newStr;
      }
      const c2 = s[l];
      if (map.has(c2)) {
        map.set(c2, map.get(c2) + 1);
        if(map.get(c2) === 1) mapType += 1;
      }
      l += 1;
    }
    r += 1;
  }
  return res;
}

console.log(getMinSubStr("abcabcd", "aabbcc"));
