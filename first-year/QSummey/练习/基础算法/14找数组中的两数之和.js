// function addTowNumbers (arr, target) {
//     const arrIndex = [];
//     arr.forEach((item,index) => {
//         const another = target - item;
//         if (arr.slice(index+1).includes(another)){
//             arrIndex.push(index);
//             arrIndex.push(arr.indexOf(another));
//         }
//     })
//     return arrIndex;
// }

// forEach 里面不能return
// function addTowNumbers (arr, target) {
//     const arrIndex = [];
//     const m = new Map();
//     arr.forEach((item) => (m.set(item, target-item)));
//     arr.forEach((item) => {
//         if(m.has(m.get(item))){
//             arrIndex.push(arr.indexOf(m.get(item)), arr.indexOf(m.get(target-item)))

//         }
//     })

//     return [...new Set(arrIndex)];
// }

function addTowNumbers (arr, target) {
    const m = new Map();
    arr.forEach((item) => (m.set(item, target-item)));
    for(let i = 0 ; i< arr.length; i++){
        if(m.has(m.get(arr[i]))){
            return [arr.indexOf(m.get(arr[i])), arr.indexOf(m.get(target-arr[i]))]
        }
    }
}
// function addTowNumbers(nums, target) {
//   const map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//       const n = nums[i];
//       const n2 = target - n;
//       if(map.has(n2)){
//           return [map.get(n2), i];
//       } else {
//           map.set(n,i);
//       }
//   }
// }
const arr = [2, 4, 9, 7, 44];
console.log(addTowNumbers(arr, 9));
