// 1.对象子类型: 函数，数组等 ，还有内置对象 String· Number· Boolean· Object· Function· Array· Date· RegExp· Error

// 2.instanceof运算符的左边是实例对象，右边是构造函数。它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链__proto__上。

// 即 a instanceof A

// 理解上面的那句话 左右分清楚
// if (!(a.__proto__ === null)) {
//   A.prototype === a.__proto__ || A.prototype === a.__proto__.__proto__ || A.prototype === a.__proto__.__proto__.__proto__
// }

//  Object instanceof Function  //true
//  Function.prototype
//  Object.__proto__ 为 Function.prototype
// 即Object.__proto__ === Function.prototype成立

//  Function instanceof Object   // true
//  Object.prototype
//  Function.__proto__ === Function.prototype
//  Function.__proto__.__proto__ === Object.prototype
//  即 Function.__proto__.__proto__ === Object.prototype 成立


// 3.对象属性名字
var mySymbol = Symbol();

var a = {
    age: 11,
    [mySymbol]: 'Hello!',
    arr: [1, 2, 3]
};

a.__proto__.zzz = 123;
Object.prototype.yyy = 456;

console.log(a); //{age: 11, Symbol(): "Hello!"}
// console.log(a[mySymbol]);



//4. 深拷贝
var b = JSON.parse(JSON.stringify(a)); // 必须满足JSON
console.log(b); //{age: 11}
console.log(a.arr === b.arr); //false


// 浅拷贝
var c = Object.assign({}, a);
console.log(c);
console.log(a.arr === c.arr); //true

// lodsh

//5. 属性描述符
//  默认都为true： writable: true, enumerable: true, configurable: true
var desAll = Object.getOwnPropertyDescriptors(a);
console.log(desAll);
var desAge = Object.getOwnPropertyDescriptor(a, 'age');
console.log(desAge);
// 定义一个
Object.defineProperty(a, 'name', {
    value: 'xmt',
    writable: false,
    enumerable: true,
    configurable: true
});
// 定义多个
Object.defineProperties(a, {
    age1: {
        value: 55
    },
    age2: {
        value: 88
    }
})

console.log(a)
console.log(Object.getOwnPropertyDescriptors(a))

a.name = 'tt';
console.log(a.name);


Object.defineProperty(a, 'name', {
    value: 'xmt',
    writable: true,
    enumerable: true,
    configurable: false // 不可配置
});

console.log(Object.getOwnPropertyDescriptors(a))

Object.defineProperty(a, 'name', {
    value: 'xmt',
    writable: false,
    enumerable: true,
    configurable: false //修改为配置 ，报错 Uncaught TypeError: Cannot redefine property: name
});

//即便属性是configurable:false，我们还是可以把writable的状态由true改为false，但是无法由false改为true。
a.name = 'hhh'
delete a.age
delete a.name // configurable: false，无法删除
console.log(Object.getOwnPropertyDescriptors(a))


// 所以configurable的作用是啥呢，不让修改从fase变为true的，同时也不能删除


// enumerable 枚举 // enumerable 为false 或者 对象属性名字是Symbol()的
for (var item in a) {
    console.log('枚举in：', item);
}

console.log('可枚举', Object.keys(a));
console.log('可枚举&不可枚举,不包含Symbol', Object.getOwnPropertyNames(a));
console.log('只是Symbol', Object.getOwnPropertySymbols(a));
console.log('所有（包含getOwnPropertyNames && getOwnPropertySymbols）', Reflect.ownKeys(a));

// Object.keys(a) 和 Object.getOwnPropertyNames(a) 都会忽略属性名为 Symbol的
// Object.keys() 会返回一个数组，包含所有可枚举属性
// Object.getOwnPropertyNames()会返回一个数组，包含所有属性，无论它们是否可枚举。
// for..in循环可以用来遍历对象的[可枚举属性]列表但不包含Symbol属性的 &&（包括[[Prototype]]链）

// for of 可以吗 //先说一下会报错 a is not iterable。稍后解决
// 同时 for in 是遍历对象的键key的， for of 是遍历对象的遍历值value的
// for (var item of a) {
//     console.log('枚举of：', item);  //Uncaught TypeError: a is not iterable
// }


// 了解
// Object.preventExtensions()  ==> Object.seal() ==>  Object.freeze()

// 了解
// 熟悉访问
// a.name  即底层类似调用 [[Get]]('name')
// a.name = 'xxx'; 或者 a.age3 = 111; [[Put]]来设置或者创建这个属性,会判断对象中是否已经存在这个属性（这是最重要的因素）

// 在ES5中可以使用getter和setter部分改写默认操作，但是只能应用在单个属性上，无法应用在整个对象上。getter是一个隐藏函数，会在获取属性值时调用。setter也是一个隐藏函数，会在设置属性值时调用。

var d = {
    name: 'xx',
    get a() {
        return 233
    }
}
d.a = 555; // 没set方法修改不起作用
console.log(d);
console.log(d.a);


var e = {
    get a() {
        return 2;
    }
}

Object.defineProperty(e, 'b', {
    get: function () {
        return this.a * 2;
    }
});

e.b // 底层 e[[get]]('b') 或者 说  e.get('b') 所以this是e对象
console.log(e);

// var f = {
//     get accc () {
//         // 必须返回
//         return this.accc;
//     },
//     set accc (val) {
//         this.accc = val * 2; // Maximum call stack size exceeded
//     }
// }

// f.accc = 2 // 调用set方法

// console.log(f.accc) // 调用get方法

// 上面出现了死循环,是什么原因呢？
// console.log(f.accc) // 触发的get方法 ，return this.accc; 再次触发get方法
// f.accc = 2 // 触发的set方法，this.accc = val * 2;再次触发set方法
// 如何解决？ 借助一个辅助值。

var objF = {
    initValue: 1
}
// var initValue = 1;
var f = {
    get accc() {
        // 必须返回
        return objF.initValue;
        // return initValue;
    },
    set accc(val) {
        objF.initValue = val * 2;
        // initValue = val * 2;
    }
}

f.accc = 2 // 调用set方法

console.log('f的accc：', f.accc) // 调用get方法


// 同样用defineProperty，也要借助辅助值
// let obj = {
//     initValue: '1',
// }
// Object.defineProperty(obj, 'initValue', {
//     get(){
//         return obj.initValue
//     },
//     set(value) {
//         obj.initValue = value
//     }
// })
// console.log(obj.initValue)
// obj.initValue = 'zqf'
// console.log(obj.initValue)


// 6.判断属性是否存在

var g = {
    a: 111
}

// g 及 g的原型链
console.log('name' in a);
// console.log([mySymbol] in a); //  Cannot convert a Symbol value to a string
console.log('dedwed' in a);

// g自身
console.log(a.hasOwnProperty('name'));
// console.log(a.hasOwnProperty([mySymbol])); //  Cannot convert a Symbol value to a string
console.log(a.hasOwnProperty('dedwed'));

var arr1 = [1, 2, 3];

for (var key in arr1) {
    console.log('数组key：', key);
}

// 为什么数组可以 for of
for (var value of arr1) {
    console.log('数组value：', value);
}


// 原因数据有内置的迭代器iterator,我们打印一下看看
console.log('arr1', arr1);
console.log('arr1', arr1[Symbol.iterator]); // 是一个函数 ƒ values() { [native code] } 然后返回一个迭代器对象的函数 即下面的 it

// 所以进行for...of循环时，会调用Symbol.iterator方法
// 获取到迭代器对象，我们手动遍历一下
var it = arr1[Symbol.iterator]();
console.log(it); //Array Iterator 对象 {next: function(){}}
console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}
console.log(it.next()); // {value: 3, done: false}
console.log(it.next()); // {value: undefined, done: true}




// 7.遍历

// 不过 普通对象和数组不同，普通的对象没有内置的iterator，所以无法自动完成for..of遍历。
// 当然，你可以给任何想遍历的对象定义iterator
// 接下来就让a变成可迭代对象
console.log(a);
Object.defineProperty(a, Symbol.iterator, {
    value: function () {
        const that = this;
        const keys = Object.keys(this);
        const len = keys.length;
        let i = 0;
        return {
            next: function () {
                return {
                    value: that[keys[i++]],
                    done: i > len
                }
            }
        }
    }
});

for (let value of a) {
    console.log('可迭代后：', value);
}

// 同样也可以直接 在 a = {[Symbol.iterator]: function(){return { next :function () {}}} }

// 放在对象的原型上
Object.prototype[Symbol.iterator] = function () {
    const that = this;
    const keys = Object.keys(this);
    const len = keys.length;
    let i = 0;
    return {
        next: function () {
            return {
                value: that[keys[i++]],
                done: i > len
            }
        }
    }
}

for (let value of a) {
    console.log('可迭代后：', value);
}

// 过程中一些重要的问题：
// Q1: get、set死循环
// https://www.jianshu.com/p/b3a51be3339f
// Q2: 遍历包含Symbol属性的对象
// https://blog.csdn.net/ixygj197875/article/details/79165199
// Q3: 判断一个对象是不是迭代器对象
// if (!iterators[Symbol.iterator]) {
//     throw Error(`${typeof iterators} is not iterable (cannot read property Symbol(Symbol.iterator))`);
// }