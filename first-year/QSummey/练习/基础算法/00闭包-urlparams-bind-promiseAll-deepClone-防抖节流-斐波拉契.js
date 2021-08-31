
// 1.闭包
// for(var i=0; i<3;i++){
//     console.log(i);
//     setTimeout(()=>{
//         console.log('222',i);
//     },i);
// }


// for(let i=0; i<3;i++){
//     console.log(i);
//     setTimeout(()=>{
//         console.log('222',i);
//     },i);
// }

// for(var i=0; i<3;i++){
//     console.log(i);
//     (function(i){
//         setTimeout(()=>{
//             console.log('222',i);
//         },i);
//     })(i)
// }


// 2.获取url参数
// function getUrlParams(urlStr = '') {
//     if(!urlStr) {
//         throw Error('url参数不存在');
//     }

//     urlStr = decodeURI(urlStr);
//     urlStr = urlStr.split('?')[1];

//     const searchObj = Object.create(null);
//     const searchArr = urlStr.split('&');
//     searchArr.forEach(item => {
//         const [k, v] = item.split('=');
//         if (k && v) {
//             searchObj[k] = v;
//         }
//     })

//     return searchObj;
// }

// console.log(getUrlParams('http://baidu.com#/?a'))


// 3.斐波那契数列 （优化版）
let num = 0

function fibonacci(n) {
    num++;
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

function memorize(fn) {
    const cache = Object.create(null);
    return function (...args) {
      const _args = JSON.stringify(args);
      console.log(_args);
      return cache[_args] || (cache[_args] = fn.apply(this, args));
    };0
};
fibonacci = memorize(fibonacci)

// console.log(fibonacci(10))
// console.log('num:', num);
// 1, 1, 2, 3, 5, 8

// 4. 防抖
function debounce(fn, time) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, time)
    }
}

// 升级版
function debounce(fn, time, immediate) {
    let timer = null;


    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }

        if (immediate) {
            let isNow = !timer; // true

            if (isNow) {
                fn.apply(this, args);
            }

            timer = setTimeout(() => {
                timer = null;
            }, wait);
        }
        else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, time)
        }
    }
}


// 5.节流
function throttle (fn, time) {
    let flag = true;
    return function (...args) {
        if(flag) {
            flag = false;
            setTimeout(() => {
                flag = true;
            }, time)
            fn.apply(this, args);
        }
    }
}


// 6. 深拷贝
// function deepClone (obj) {
//     if (typeof obj !== 'object') return;
//     let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
//     for(let key in obj) {
//         if(obj.hasOwnProperty(key)) {
//             newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
//         }
//     }
//     return newObj;
// }

// let obj = {
//     a: [1,2,3],
//     b: {
//         c : {
//             d :1
//         }
//     }
// }

// let newObj = deepClone(obj);
// newObj.b.c = 444;
// console.log(newObj.b.c);
// console.log(obj.b.c);


// bind实现
// Function.prototype.bind = function(ctx, ...rest) {
//     return (...args) => this.apply(ctx, [...rest, ...args])
// }

// // test
// function bar (...args) {
//     console.log(args)
// }

// let obj = {
//     name : 'xmt'
// }
// bar = bar.bind(obj, 111)
// bar(1,2)

// promiseAll 实现
const a = Promise.resolve(1);
const b = 2;
const c = new Promise((resolve, reject) => {
    resolve(3)
});

const d = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(4)
    }, 2000)
});

Promise.all = function (iterators) {
    if (!iterators[Symbol.iterator]) {
        throw new Error('不是iterator');
    }

    let len = iterators.length;
    if (!len) {
        return Promise.resolve(iterators)
    }
    let count = 0;
    let resultList = [];
    return new Promise((resolve, reject) => {
        iterators.forEach((item, index) => {
            Promise.resolve(item).then(res => {
                console.log(res)
                count++;
                resultList[index] = res;
                if (count === len) {
                    resolve(resultList)
                }
            }).catch(e => {
                reject(e)
            })
        });
    })
}

let p = Promise.all([]);
p.then((args) => {
    console.log(args)
});9


