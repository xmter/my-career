// function isValid(s) {
//   if (s.length % 2 === 1) {
//     return false;
//   }
//   const stack = [];
//   for (let i = 0; i < s.length; i++) {
//     const c = s[i];
//     if (c === "(" || c === "[" || c === "{") {
//       // 左括号入栈
//       stack.push(c);
//     } else if(c === ")" || c === "]" || c === "}"){
//       const t = stack[stack.length - 1];
//       if (
//         (t === "(" && c === ")") ||
//         (t === "[" && c === "]") ||
//         (t === "{" && c === "}")
//       ) {
//         // 匹配到对应的右括号 出栈
//         stack.pop();
//       } else {
//         return false;
//       }
//     }
//   }

//   // 判断栈是否为空
//   return stack.length === 0;
// }


function isValid(s) {
  if (s.length % 2 === 1) {
    return false;
  }
  const stack = [];
  const m = new Map();
  m.set('(', ')');
  m.set('[', ']');
  m.set('{', '}');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (m.has(c)) {
      // 左括号入栈
      stack.push(c);
    } else if(c === ")" || c === "]" || c === "}"){
      const t = stack[stack.length - 1];
      if ( m.get(t) === c ) {
        // 匹配到对应的右括号 出栈
        stack.pop();
      } else {
        return false;
      }
    }
  }

  // 判断栈是否为空
  return stack.length === 0;
}

console.log(isValid('(){}'))

// 时间复杂度和空间复杂度都是O(n)