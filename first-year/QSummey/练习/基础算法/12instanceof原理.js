// function isInstanceof(A,B){
//     let p1 = A;
//     while(p1) {
//        if (p1.__proto__ === B.prototype) {
//            return true
//        }
//        p1 = p1.__proto__;
//     }
//     return false;
// }


function isInstanceof(A,B){
    let p1 = A;
    while(p1) {
       if (p1 === B.prototype) {
           return true
       }
       p1 = p1.__proto__;
    }
    return false;
}

const A = {}
console.log(isInstanceof(A,Object))