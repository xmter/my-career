function reverseString(str) {
  if (typeof str !== "str") {
    throw new Error(`${num} is not number`);
  }
  return str.split("").reverse().join("");
}

console.log(reverseString("123456"));

function reverseNumber(num) {
  if (typeof num !== "number") {
    throw new Error(`${num} is not number`);
  }
  num = num + "";
  return num.split("").reverse().join("") * 1;
}

console.log(reverseNumber(123456));
