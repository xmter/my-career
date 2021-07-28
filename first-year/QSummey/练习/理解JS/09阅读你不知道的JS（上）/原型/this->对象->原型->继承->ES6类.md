### 一、 this

1. 从硬绑定bind说起

```
function foo () {
    console.log(this);
}

foo.name = 2;
// 函数本来就有一个name属性, 不可以重写
console.log(foo.name); // foo

// 但是其他
foo.aaa = 2;
console.log(foo.aaa); // 2

// // 那简单的实现一下foo.bind
// bind挂在的地方foo.prototype.constructor.bind
// 私有属性
foo.bind = function (that) {
  console.log('走自己写的bind');
  return function () {
    foo.call(that);
  }
}



var obj = {
    a: 2
}
// 先测一下走没走自己写的bind:走了
var bar = foo.bind(obj);
bar();

// 但是呢 并不是这一个函数要改变this，最好把它放在原型上共享

// 所以就是下面的
function foo () {
    console.log(this);
}


// 而这种实例才可以访问
foo.prototype.bind = function (that) {
    console.log('走自己写的bind');
    return function () {
      foo.call(that);
    }
}

var obj = {
    a: 2
}

var hhh = new foo();

// 这种new调用，只能自个实例共享 还不够
hhh.bind(obj)()


// 共享私有属性
Function.prototype.bind = function (that) {
    console.log('走自己写的bind');
    return function () {
      foo.call(that);
    }
}

var obj = {
    a: 2
}

// 先测一下走没走自己写的bind:走了
var bar = foo.bind(obj);
bar();

function far(){

}
far.bind()

// JavaScript中[native code] 是C++代码
// 我们来测试一下
// Function
// ƒ Function() { [native code] }
// Function.prototype
// ƒ () { [native code] }
// Function.prototype.apply
// ƒ apply() { [native code] }
// Function.prototype.call
// ƒ call() { [native code] }
// Function.prototype.bind
// ƒ (that) {
//     console.log('走自己写的bind');
//     return function () {
//       foo.call(that);
//     }
// }
// Array.bind
// ƒ (that) {
//     console.log('走自己写的bind');
//     return function () {
//       foo.call(that);
//     }
// }
// Object.bind
// ƒ (that) {
//     console.log('走自己写的bind');
//     return function () {
//       foo.call(that);
//     }
// }


// or

Function.bind = function (that) {
    console.log('走自己写的bind');
    return function () {
      foo.call(that);
    }
}



// 进入第二阶段前 先看看
// 一开始我们都知道 foo.__proto__ === Function.prototype 下面看看其他

// Object
// Object.prototype
// Object.prototype.__proto__ === null;

// Object
// Object.__proto__ === Function.prototype
// Object.__proto__.__proto__ === Object.prototype
// Object.__proto__.__proto__.__proto__


// Function.prototype.constructor === Function
// Object.prototype.constructor === Object

// Object.constructor === Function
// Function.constructor === Function
// Array.constructor === Function


// Function
// Function.prototype 是 Function.prototype 哈哈
// Function.prototype.__proto__ === Object.prototype

// Function
// Function.__proto__ === Function.prototype
// Function.__proto__.__proto__ === Object.prototype


// 然后我们想想 我们改写Function.prototype.bind 会怎样？
// 先测测 Function.prototype.bind === Function.bind 发现我们改写原型的同时改写了私有
// 来测测Object.bind
// 首先Object有bind吗？没 Object.__proto__呢？Object.__proto__ === Function.prototype 所以找到了改写后的
// 来测测Object.prototype.bind
// Object.prototype上有bind吗 Object.prototype就是Object.prototype当然没有，那Object.prototype.__proto__呢？Object.prototype.__proto__=== null 当然更没有
// 所以Object.prototype.bind === undefined

// 然后我们想想 我们改写Function.bind 会怎样？
// 先测测 Function.prototype.bind === Function.bind 为false 发现我们改写私有不会改写原型
// foo.bind(obj); 这个bind是我们改写后的吗 foo上面有bind吗?没,foo.__proto__有吗？foo.__proto__ ===foo.__proto__ === Function.prototype ,但是Function.prototype 上的bind没有改写 所以调用的不是我们自己写的
// 来测测Object.bind
// 首先Object有bind吗？没 Object.__proto__呢？Object.__proto__ === Function.prototype 所以找到了原来的ƒ bind() { [native code] }
// 来测测Object.prototype.bind
// Object.prototype上有bind吗 Object.prototype就是Object.prototype当然没有，那Object.prototype.__proto__呢？Object.prototype.__proto__=== null 当然更没有
// 所以Object.prototype.bind === undefined


// 最后我们说了这么多重点是啥？Object.constructor === Function；Object.__proto__ === Function.prototype 这一步比较特殊哦。

// 但是我们自己实现的bind还有点缺陷，相比较原有的  bind还可以传递第二个第三个参数

Function.prototype.bind = function (that) {
    console.log('走自己写的bind');
    const argOut = Array.from(arguments).slice(1)
    return function () {
      const arg = [...argOut, ...arguments]
      console.log(arg)
      foo.apply(that, arg);
    }
}

function foo() {
    console.log(arguments)
    console.log(this);
}

var obj = {
    a: 2
}

var bar = foo.bind(obj,1,2);
bar(2,3,4);

// 同时 我们发现bind每次返回一个新函数

// 下面我们抛开bind 来说说this
function foo () {
    console.log(this);
}

var a = 2;

foo.call(null); // null被忽略, this指向window

// 既然被忽略，那什么时候用null呢？

// 只把数组展开成参数的时候
foo.apply(null, [2,3]);
foo(...[1,2])

// 只使用bind进行柯里化 （高阶函数）的时候
var bar = foo.bind(null, 2);
bar(3);

// 所以null的作用就是一个占位符而已

// 然而，总是使用null来忽略this绑定可能产生一些副作用。如果某个函数确实使用了this（比如第三方库中的一个函数），那默认绑定规则会把this绑定到全局对象（在浏览器中这个对象是window），这将导致不可预计的后果（比如修改全局对象）。


var obj = {
    hh: 111,
    ddd: function () {
        console.log(this);
    }
}

obj.ddd.apply(null, [2,3]);// this还是指向window

// 更安全的做法
var oo = Object.create(null);
obj.ddd.apply(oo, [2,3]); // this 指向 Object.create(null) 很空很空 No properties

// 但是并不会创建Object. prototype这个委托，所以它比{}“更空” 我们打印一下{}和Object.create(null)便知道

// 最后提一下 剪头函数this: 定义时候确定 （根据外层（函数或者全局）作用域来决定this。）可以说剪头函数就没有它自己的this

```

### 二、对象

1. 小知识点
* 对象子类型：函数，数组等 ，还有内置对象 String· Number· Boolean· Object· Function· Array· Date· RegExp· Error

2. instanceof运算符
* 说明：左边是实例对象，右边是构造函数。它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链__proto__上。
* 基本结构： a instanceof A
* 伪代码理解
```
if (!(a.__proto__ === null)) {
  A.prototype === a.__proto__ || A.prototype === a.__proto__.__proto__ || A.prototype === a.__proto__.__proto__.__proto__
}
```
* 举例分析
```
Object instanceof Function  //true
//  Function.prototype
//  Object.__proto__ 为 Function.prototype
// 即Object.__proto__ === Function.prototype成立

Function instanceof Object   // true
//  Object.prototype
//  Function.__proto__ === Function.prototype
//  Function.__proto__.__proto__ === Object.prototype
//  即 Function.__proto__.__proto__ === Object.prototype 成立
```
3. 对象属性名字

```
var mySymbol = Symbol();

var a = {
    age: 11,
    [mySymbol]: 'Hello!',
    arr: [1, 2, 3]
};

console.log(a); //{age: 11, Symbol(): "Hello!"}
// console.log(a[mySymbol]);

```
4. 深拷贝与浅拷贝

```
// 深拷贝
var b = JSON.parse(JSON.stringify(a)); // 必须满足JSON
console.log(b); //{age: 11}
console.log(a.arr === b.arr); //false


// 浅拷贝
var c = Object.assign({}, a);
console.log(c);
console.log(a.arr === c.arr); //true
```

5. 属性描述符

```
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
```
6. 判断对象属性是否存在

```
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
```

7. 遍历

```
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
```
8. 过程中的问题：
* Q1: [get、set死循环](https://www.jianshu.com/p/b3a51be3339f)
* Q2: [遍历包含Symbol属性的对象](https://blog.csdn.net/ixygj197875/article/details/79165199)
* Q3: 判断一个对象是不是迭代器对象
```
if (!iterators[Symbol.iterator]) {
    throw Error(`${typeof iterators} is not iterable (cannot read property Symbol(Symbol.iterator))`);
}
```
### 三、 原型 与 继承

1. [感觉多态属于继承，是吗](https://www.liaoxuefeng.com/wiki/1016959663602400/1017497232674368)

* 有些语言（比如Java）并不会给你选择的机会，类并不是可选的——万物皆是类。
* 其他语言（比如C/C++或者PHP）会提供过程化和面向类这两种语法，开发者可以选择其中一种风格或者混用两种风格。

2. in 操作符

* 如果指定的属性（普通属性&Symbol属性）在指定的对象或其原型链中，则in 运算符返回true。

```
var mySymbol = Symbol();

var a = {
    age: 11,
    [mySymbol]: 'Hello!',
    arr: [1, 2, 3]
};

a.__proto__.zzz = 123;
Object.prototype.yyy = 456;

console.log('age' in a);
console.log(mySymbol in a);  // true
console.log('arr' in a);
console.log('zzz' in a);
console.log('yyy' in a);
```

3. isPrototypeOf 等价于 instanceof  参数区别一下

```
object instanceof Obj
Obj.prototype 是否在 object 原型链上
prototypeObj.isPrototypeOf(object)
测试一个对象prototypeObj是否在于另一个对象object的原型链上
```

4. Object.getPrototypeOf(obj)  等价于 obj.__proto__

```
// 返回指定对象obj的原型
function Bar(name){
    this.name = name;
}
Bar.prototype.getName = function () {
    return this.name;
}

var bar = new Bar('xmt');
console.log(Object.getPrototypeOf(bar) === Bar.prototype) //bar.__proto__  ===  Bar.prototype
console.log(Bar.prototype.constructor === Bar);

console.log(bar.constructor === Bar); // bar.__proto__.constructor === Bar.prototype.constructor

console.log(bar.getName()); // bar.__proto__.getName === Bar.prototype.getName
```

5. 原型链

```
function Far (name) {
    this.name = name;
}

Far.prototype.myName = function () {
    return this.name;
}
Far.prototype.yy = 123;


function Bar (name, lable) {
    Far.call(this, name);
    this.lable = lable;
}

// 形成原型链的目的 Bar.prototype.__proto__ === Far.prototype

// 方式1
// 缺点：在初始化过程中，构造函数可以存储每个对象必须生成的唯一信息。但是，这种唯一信息只生成一次，可能会带来潜在的问题。
// 此外，构造函数的初始化，可能会将不需要的方法放在对象上。理解
// Bar.prototype = new Far();

// 方式2 相对good
// Bar.prototype = Object.create(Far.prototype);

// 方式3:
// 这个方式表现并不好，应该被弃用。
Object.setPrototypeOf(Bar.prototype, Far.prototype);

// 错误用法 在看看上面说的形成原型链的目的
// Bar.prototype = Far.prototype;



// Bar.prototype.constructor 之前的 constructor Bar不在了 ,
// 因为 Bar.prototype = Object.create(Far.prototype); 直接赋值给的Bar.prototype
// 在Bar.prototype = Object.create(Far.prototype); 之后添加其他属性比如myLabel就存在了
console.log('dwasdzc', Bar.prototype.constructor);

Bar.prototype.myLabel = function () {
    return this.lable;
}

Bar.prototype.yy = 345;

var a = new Bar('a', 'obj.a');

a.myName();
a.myLabel();
console.log(a);
// 测试
console.log(a.yy);
console.log(Far.prototype.yy);
```
6. __proto__的实现

```
//但是这没法测试Object.prototype 是一个 不可配置不可写的属性
Object.prototype = 123;
console.log(Object.prototype); // 测一下不是123
//也可以这样测
console.log(Object.getOwnPropertyDescriptor(Object, 'prototype'));//configurable: false ,enumerable: false, writable: false

//所以这样不行
Object.prototype = {
    ...Object.prototype,
    get __proto__ () {
        console.log('get自己的__proto__');
        return Object.getPrototypeOf(this);
    },
    set __proto__ (proto) {
        console.log('set自己的__proto__');
        Object.setPrototypeOf(this, proto);
        // mmm
    }
}

//修改bject.prototype.__proto__呢？
//测试一下啊
Object.prototype.__proto__ = 123
console.log(Object.prototype.__proto__); // 不是123
//同样这样测试
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));// configurable: true  enumerable: false & 不可写

//所以下面这个也不会走
Object.defineProperty(Object.prototype, '__proto__', {
    get __proto__ () {
        console.log('get自己的__proto__');
        return Object.getPrototypeOf(this);
    },
    set __proto__ (proto) {
        console.log('set自己的__proto__');
        Object.setPrototypeOf(this, proto);
    }
})

//但是__proto__的实现可以了解下。
```

7. Object.create() 的实现
```
//可写
Object.create = 123;
console.log(Object.create);

//create不是原型上的方法
console.log(Object.prototype.create); // undefined

//使用---伪代码
var newObj = Object.create(oldObj);
newObj.__proto__ === oldObj;


Object.create = function (o) {
    // 创建一个私有函数实现
    function F () {}
    F.prototype = o;
    return new F(); // 不同于 上面原型链的方式 Bar.prototype === new Far()， 这个Far()不是私有的，不安全
}
```

8. 代理的初识

```
// 简单理解一下 说的什么意思
var objA = {
    aaa: 123
}

var objB = Object.create(objA);

console.log(objB.aaa); // 这样访问 objB 没有怎么会访问到 当然我们知道是原型链的原因，但是这太隐晦了

// 我们可以这样

objB.getAaa = function () {
    return this.aaa
}

console.log(objB.getAaa())
```
9. es6中的proxy： 属性拦截
```
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
```

10. 观察者模式: proxy 本质就是自动触发set，get

```
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
```

### 四、 ES6中的类

1. 再谈谈this

```
// 再谈谈this
class Logger {
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
console.log(logger);
const {printName} = logger; // 厉害
console.log(printName);
printName();  // this指向又问题了


// 解决办法1

class Logger {
    constructor() {
        // 办法: constructor绑定this
        this.printName = this.printName.bind(this);
    }

    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
console.log(logger);
const {printName} = logger; // 可以获取
console.log(printName);
printName();

// 解决办法2
class Logger {
    // 办法： 剪头函数
    printName = (name = 'there') => {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
console.log(logger);
const {printName} = logger; // 可以获取
console.log(printName);
printName();


// 解决办法3

class Logger {

    // 办法： 剪头函数
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}


function selfish(target) {
    const cache = new WeakMap();
    const handler = {
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                // 主要的一步
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target, handler);
    return proxy;
}

// proxy
const logger = selfish(new Logger());

console.log(logger);
const { printName } = logger; // 厉害
console.log(printName);
printName();
```

2. 再谈继承

* super(x, y); // 调用父类的constructor(x, y)

* constructor 中：super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。,super指向父类的原型对象,所以定义在父类实例上的方法或属性，是无法通过super调用的。

* 普通方法中：super.print() 其实 A.prototype.print.call(this) // this为子类实例

* 静态方法中，这时super将指向父类，而不是父类的原型对象。方法内部的this指向 子类 而不是父类

* 子类的__proto__属性，表示构造函数的继承，总是指向父类。

* 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。