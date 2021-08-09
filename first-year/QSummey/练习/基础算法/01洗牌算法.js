// 洗牌 ===> 乱序数组
function shuffle(arr) {
  let newArr = [];
  while (arr.length !== 0) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    console.log(randomIndex);
    newArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }

  return newArr;
}
// shuffle([1,2,3,4,5]);
console.log(shuffle([1, 2, 3, 4, 5]));
