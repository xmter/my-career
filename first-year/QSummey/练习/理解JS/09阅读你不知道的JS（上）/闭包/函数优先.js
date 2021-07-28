// 函数优先

// foo();
// var foo
// console.log(foo) // function foo() {console.log(1)}
// function foo() {
//     console.log(1)
// }
// console.log(foo)

// foo = function() {
//     console.log(2)
// }
// console.log(foo)


// foo();
// var foo = 2;
// console.log(foo)// 2  测试 var foo 其实是被忽略了 是给foo函数赋值为2
// function foo() {
//     console.log(1)
// }
// console.log(foo)

// foo = function() {
//     console.log(2)
// }
// console.log(foo)



// 声明在后面的函数会覆盖声明在前面的函数
// foo(); //3
// var foo
// console.log(foo) // function foo() {console.log(2)}
// function foo() {
//     console.log(1)
// }
// console.log(foo)

// function foo() {
//     console.log(2)
// }
// console.log(foo)


// ReferenceError: foo is not defined
// console.log(foo);


// 函数声明在if里面写 现在已经被认为在外部调用是ES5中非法的操作
// foo() //TypeError: foo is not a function
// var a = true;
// if (a) {
//     function foo() {
//         console.log('a');
//     }
// } else {
//     function foo() {
//         console.log('b');
//     }
// }

// var a = true;
// if (a) {
//     foo();
//     function foo() {
//         console.log('a');
//     }
// } else {
//     foo();
//     function foo() {
//         console.log('b');
//     }
// }

// var a = true;
// if (a) {
//     foo(); // TypeError
//     var foo = function bar() {
//         console.log('a');
//     }
// } else {
//     var foo = function bar() {
//         console.log('b');
//     }
// }

// 函数声明在if里面写在ES5中现在非法的操作，但是也不是说把它当做是函数表达式
// console.log(foo);
// var a = true;
// if (a) {
//     var foo = function bar() {
//         console.log('a');
//     }
// } else {
//     var foo = function bar() {
//         console.log('b');
//     }
// }

// 变量声明在if里面，是存在变量提升的
// console.log(b);
// var a = true;
// if (a) {
//     var b = 2;
// } else {
//     var b = 3;
// }

