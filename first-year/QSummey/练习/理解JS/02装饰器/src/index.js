// @testable
// class MyTestableClass {
//   // ...
// }

function testable(target) {
  // 静态属性
  target.isTestable = true;
}

@testable
class A {}
console.log(A.isTestable);

// // console.log(MyTestableClass.isTestable);





// // // 等同于

// // class A {}
// // A = testable(A) || A;




// 多个参数
// function testable(isTestable) {
//   return function(target) {
//     target.isTestable = isTestable;
//   }
// }

// // @testable(false)
// // class MyTestableClass {}
// // MyTestableClass.isTestable // false

// class MyTestableClass {}
// testable(false)(MyTestableClass) || MyTestableClass
// console.log(MyTestableClass.isTestable);


// function decorator (target) {
//     target.ddd = 'new'
//     // return 0
// }

// class A {}
// A.ddd = 2
// A = decorator(A) || A;

// console.log(A.ddd)



/**
 * 装饰器 表面看有注释的作用, 其实有 修改 和 增强 类的作用
 */


// function mixins(...list) {
//   return function (target) {
//     // Object.assign(target, source) 返回目标对象target
//     // means: 给目标类的prototype对象上添加属性，也就是实例的属性
//     var a = Object.assign(target.prototype, ...list)
//   }
// }


// const Foo = {
//   foo() { console.log('foo') },
//   hah: 11
// };

// const Boo = {
//   foo() { console.log('foo') },
//   hah: 11
// };


// class MyClass {}
// mixins(Foo,Boo)(MyClass)

// let obj = new MyClass();
// console.log(obj)
// obj.foo()



// 函数存在变量提升 只能用高阶函数的形式

// function doSomething(name) {
//   console.log('Hello, ' + name);
// }

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

// const wrapped = loggingDecorator(doSomething)
// wrapped('xmt','yz');



// 这种 函数变量提升也没关系？
// @loggingDecorator
// function doSomething(name) {
//   console.log('Hello, ' + name);
// }
// doSomething('aszx');
// const wrapped = loggingDecorator(doSomething)
// wrapped('xmt');