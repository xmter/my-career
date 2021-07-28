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



