
function tenToTwo(num, scale) {
    const arr = [];
    while (num > 0){
        const item = num % scale;
        num = Math.floor(num / scale);
        arr.push(item)
    }

    return arr.reverse().join('')
}

console.log(tenToTwo(31,2))