// 方法2: 双指针法
// function 、(nums) {
//   if (nums.length === 0) {
//     return 0;
//   }
//   let tempEnd = 0;
//   for (let tempFont = 0; tempFont < nums.length; tempFont++) {
//     if (nums[tempEnd] !== nums[tempFont]) {
//       tempEnd++;
//       nums[tempEnd] = nums[tempFont];
//     }
//   }
//   return tempEnd + 1;
// }

// 方法1: 遍历移除法
function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i + 1, 1);
      i--;
    }
  }
  return nums;
}

console.log(removeDuplicates([2, 2, 4, 4, 4, 6, 6, 8, 88, 88, 99, 999]));
