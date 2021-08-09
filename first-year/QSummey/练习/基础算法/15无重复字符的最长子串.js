// function substring(str) {
//   let maxLength = 0;
//   let subStrLen = 0;
//   let x = 0;
//   let y = 0; // 或为1
//   const len = str.length;
//   while (y < len) {
//     if (str.substring(x, y).includes(str[y])) {
//       x = str.substring(0, y).lastIndexOf(str[y]) + 1;
//     }
//     y = y + 1;
//     subStrLen = str.substring(x, y).length;
//     // if (subStrLen > maxLength) {
//     //   maxLength = subStrLen;
//     // }
//     maxLength = Math.max(maxLength, subStrLen);
//   }
//   return maxLength;
// }

function substring(s) {
  let l = 0;
  let res = 0;
  const map = new Map();
  for (let r = 0; r < s.length; r++) {
    if(map.has(s[r]) && map.get(s[r]) >= l) {
        l = map.get(s[r]) + 1;
    }
    res = Math.max(res, r-l+1);
    map.set(s[r], r);
    console.log(s)
  }
  return res;
}

console.log(substring("abbcdea"));
