// function getIntersection(arr1,arr2) {
//     return [... new Set(arr1)].filter(item => new Set(arr2).has(item))
// }

// function getIntersection(arr1,arr2) {
//     return [... new Set(arr1)].filter(item => arr2.includes(item));
// }

// 数组的值作为map的key
function getIntersection(arr1,arr2) {
    let m = new Map();
    arr1.forEach(item => {
        if (arr2.includes(item)) {
            m.set(item, true)
        }
    });
    return [... m.keys()];
}

const arr1 = [1,1,2,3,4];
const arr2 = [1,1,2,4,5];

console.log(getIntersection(arr2,arr1))
