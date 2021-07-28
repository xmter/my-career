// 1. 感觉多态属于继承，是吗
// https://www.liaoxuefeng.com/wiki/1016959663602400/1017497232674368

// 过程式编程 、 面向对象编程、 函数式编程

/**
 有些语言（比如Java）并不会给你选择的机会，类并不是可选的——万物皆是类。
 其他语言（比如C/C++或者PHP）会提供过程化和面向类这两种语法，开发者可以选择其中一种风格或者混用两种风格。
 */

// 类的继承其实就是复制。但函数引用问题仍然存在

// 混入：对混入知道啥意思了 建议别用
// {targetObject, source1Object, source2Object}

// in 操作符
// 如果指定的属性（普通属性&Symbol属性）在指定的对象或其原型链中，则in 运算符返回true。

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