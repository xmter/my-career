

// Q1 ES6中的Proxy

// Q2: Object.create()

// Q3: isPrototypeOf 等价于 instanceof  参数区别一下
// object instanceof Obj
// Obj.prototype 是否在 object 原型链上
// prototypeObj.isPrototypeOf(object)
// 测试一个对象prototypeObj是否在于另一个对象object的原型链上

// Q4: Object.getPrototypeOf(obj)  等价于 obj.__proto__

// 返回指定对象obj的原型
// function Bar(name){
//     this.name = name;
// }
// Bar.prototype.getName = function () {
//     return this.name;
// }


// var bar = new Bar('xmt');
// console.log(Object.getPrototypeOf(bar) === Bar.prototype) //bar.__proto__  ===  Bar.prototype
// console.log(Bar.prototype.constructor === Bar);

// console.log(bar.constructor === Bar); // bar.__proto__.constructor === Bar.prototype.constructor

// console.log(bar.getName()); // bar.__proto__.getName === Bar.prototype.getName

// 委托：这本书的委托的意思就是沿着原型链向上找的意思。。。

// 1. 原型链
// function Far (name) {
//     this.name = name;
// }

// Far.prototype.myName = function () {
//     return this.name;
// }
// Far.prototype.yy = 123;


// function Bar (name, lable) {
//     Far.call(this, name);
//     this.lable = lable;
// }

// // 形成原型链的目的 Bar.prototype.__proto__ === Far.prototype

// // 方式1
// // 缺点：在初始化过程中，构造函数可以存储每个对象必须生成的唯一信息。但是，这种唯一信息只生成一次，可能会带来潜在的问题。
// // 此外，构造函数的初始化，可能会将不需要的方法放在对象上。理解
// // Bar.prototype = new Far();

// // 方式2 相对good
// // Bar.prototype = Object.create(Far.prototype);

// // 方式3:
// // 这个方式表现并不好，应该被弃用。
// Object.setPrototypeOf(Bar.prototype, Far.prototype);

// // 错误用法 在看看上面说的形成原型链的目的
// // Bar.prototype = Far.prototype;



// // Bar.prototype.constructor 之前的 constructor Bar不在了 ,
// // 因为 Bar.prototype = Object.create(Far.prototype); 直接赋值给的Bar.prototype
// // 在Bar.prototype = Object.create(Far.prototype); 之后添加其他属性比如myLabel就存在了
// console.log('dwasdzc', Bar.prototype.constructor);

// Bar.prototype.myLabel = function () {
//     return this.lable;
// }

// Bar.prototype.yy = 345;

// var a = new Bar('a', 'obj.a');

// a.myName();
// a.myLabel();
// console.log(a);
// // 测试
// console.log(a.yy);
// console.log(Far.prototype.yy);


// 2. __proto__的实现
//  但是这没法测试Object.prototype 是一个 不可配置不可写的属性
// Object.prototype = 123;
// console.log(Object.prototype); // 测一下不是123
// 也可以这样测
// console.log(Object.getOwnPropertyDescriptor(Object, 'prototype'));//configurable: false ,enumerable: false, writable: false

// 所以这样不行
// Object.prototype = {
//     ...Object.prototype,
//     get __proto__ () {
//         console.log('get自己的__proto__');
//         return Object.getPrototypeOf(this);
//     },
//     set __proto__ (proto) {
//         console.log('set自己的__proto__');
//         Object.setPrototypeOf(this, proto);
//         // mmm
//     }
// }

// 修改bject.prototype.__proto__呢？
// 测试一下啊
// Object.prototype.__proto__ = 123
// console.log(Object.prototype.__proto__); // 不是123
// 同样这样测试
// console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));// configurable: true  enumerable: false & 不可写

// 所以下面这个也不会走
// Object.defineProperty(Object.prototype, '__proto__', {
//     get __proto__ () {
//         console.log('get自己的__proto__');
//         return Object.getPrototypeOf(this);
//     },
//     set __proto__ (proto) {
//         console.log('set自己的__proto__');
//         Object.setPrototypeOf(this, proto);
//     }
// })

// 但是__proto__的实现可以了解下。

// 3. Object.create() 的实现

// 可写
// Object.create = 123;
// console.log(Object.create);

// create不是原型上的方法
// console.log(Object.prototype.create); // undefined

// 使用---伪代码
// var newObj = Object.create(oldObj);
// newObj.__proto__ === oldObj;


// Object.create = function (o) {
//     // 创建一个私有函数实现
//     function F () {}
//     F.prototype = o;
//     return new F(); // 不同于 上面原型链的方式 Bar.prototype === new Far()， 这个Far()不是私有的，不安全
// }

// 4. 代理 proxy

// // 简单理解一下 说的什么意思
// var objA = {
//     aaa: 123
// }

// var objB = Object.create(objA);

// console.log(objB.aaa); // 这样访问 objB 没有怎么会访问到 当然我们知道是原型链的原因，但是这太隐晦了

// // 我们可以这样

// objB.getAaa = function () {
//     return this.aaa
// }

// console.log(objB.getAaa())

// // 原来getAaa就是个代理


// 5. es6中的proxy： 属性拦截
const service = createWebService('http://example.com/data');

service.employees.then(data => {
    console.log(data);
});
service.xmt.then(data => {
    console.log(data);
});

// 上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

function createWebService(baseUrl) {
    return new Proxy({}, {
        get(target, propKey) {
            console.log(target, propKey);
            return new Promise(req => {
                req(`${baseUrl}/${propKey}`);
            });
        }
    });
}

// 6. 观察者模式: proxy 本质就是自动触发set，get

const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, { set });

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}

const person = observable({
    name: '张三',
    age: 20
});

function print() {
    console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
console.log(queuedObservers);
person.name = '333';
console.log(queuedObservers);
person.age = '333';
// 数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。













