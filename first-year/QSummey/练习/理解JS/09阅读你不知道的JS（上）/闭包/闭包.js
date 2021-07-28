
/**
 1. 闭包是什么？
    a. 某一个函数可以记住并在所在的词法作用域（父函数）外部访问所在的词法作用域（父函数）时，就产生了闭包。
    b. 所以在以上情况满足的条件下，对所在的词法作用域的引用，这个引用就是闭包。而这个引用是一个函数，这个函数包含了（父函数）的变量。

    简单的说。所以 闭包是 一种引用。 闭包函数: 就是被引用的能记住所在的词法作用域的函数。
*/


/**
 2. 下面我们将闭包的概念进行图形化（那就是代码）理解，让我想起了：taik is cheap, show me the code。那是啥样的呢看下面？
    a.关键词：父函数；闭包函数；闭包；声明位置；作用域链
 */

// 父函数: 相对于bar函数来说。
function foo(){
    var a = 2;

    // 闭包函数: 声明的位置在foo函数内部，并且用了foo函数里面的变量。bar函数作用域链：bar-->foo-->全局
    function bar(){
        console.log(a);
    }
    return bar;
}

var baz = foo(); //闭包:baz 对 bar函数的引用。
baz(); //运行时测试产生了闭包，console.log(a);为 2


/**
 3. 闭包的概念弄清楚后，来识别识别一些代码,看看会不会产生闭包？
 */

function wait(message){
    // timer函数作用域链： timer --> wait -->全局
    // 作用域链 在声明时候决定
    setTimeout(function timer() {
        console.log(message);
        // 额外说一下：this: 是在运行时决定 所以是window。我们讨论闭包无需先关注这个
        // console.log(this);// Window对象
    }, 1000)
}

wait('hello world');

// 一看这个是闭包确实不严格，不是在函数外部引用执行。错了，是在外面执行.看看下面的伪代码
// function setTimeout(cb, time) {
//    if(time后) {
//        cb();
//    }
// }

// 总结一下：回调函数这种我们多多少少都能看到闭包的影子


/**
 4. 可能被上面说迷糊了，我们在看看一个例子？
 */

var a = 1;

(function IIFE() {
    console.log(a);
})();

// 第一个问题：是闭包吗？ 是。那我问你是在定义时候的作用域外面执行吗？ 不是。那还是闭包吗？不是
// 第二个问题：到底是不是闭包？ 严格定义不是 (a是通过普通的词法作用域查找而非闭包被发现的。)，
// 但是尽管IIFE本身[并不是观察闭包的恰当例子]，但它的确创建了闭包，并且也是最常用来创建可以被封闭起来的闭包的工具。

/**
 5. 那闭包函数一定要在外面执行才是闭包吗？里面执行呢？举个例子
 */

function foo(){
    var a = 2;

    function bar(){
        console.log(a);
    }
    // foo里面执行
    bar();
}

foo();

// 总结一下: 按照书中说说的 技术上来讲，也许是。但根据前面的定义，确切地说并不是。

/**
 6. 闭包会产生什么？
   a. 在上面的例子中我们看到闭包好像挺好 让不能访问的能在外面访问了。
   b. 但是你想想有函数作用域是为什么？是不是为了环境隔离。你这样在外面访问好吗？
   c. 有人说可能需要这样写有应用场景。但是在解决问题的同时带来了【内存泄露】
   d. 内存泄露在这里就是闭包导致的，换句话说就是作用域链导致的。存在引用，导致作用域没有消失，所以变量没有消失
   e. 拿定义的例子说：如果没有闭包foo函数执行完,垃圾回收机制知道没人用了，就自动回收了foo的a变量。
 */

/**
  你觉得闭包说完了吗？没呢 再看一个更好玩的
  7. for循环和闭包
 */


//实际情况是尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个i。
for (var i =1 ; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i); // 6
    }, 1000);
}


for (var i =1 ; i <= 5; i++) {
    setTimeout(function timer() {
        console.log('111', i);
    }, 0);
}

//缺陷是什么？我们需要更多的闭包作用域，特别是在循环的过程中每个迭代都需要一个闭包作用域。

// bad:。这样不行。但是为什么呢？我们现在显然拥有更多的词法作用域了。的确每个延迟函数都会将IIFE在每次迭代中创建的作用域封闭起来。如果作用域是空的，那么仅仅将它们进行封闭是不够的。仔细看一下，我们的IIFE只是一个什么都没有的空作用域。它需要包含一点实质内容才能为我们所用。
for (var i =1 ; i <= 5; i++) {
    (function IIFE(){
        setTimeout(function timer() {
            console.log('111', i);
        }, 0);
    })()
}

// good
for (var i =1 ; i <= 5; i++) {
    (function IIFE(){
        var j = i;
        setTimeout(function timer() {
            console.log('111', j);
        }, 0);
    })()
}

// better
for (var i =1 ; i <= 5; i++) {
    (function IIFE(j){
        setTimeout(function timer() {
            console.log('111', j);
        }, 0);
    })(i)
}


// 块作用域
// good:我们使用IIFE在每次迭代时都创建一个新的作用域。换句话说，每次迭代我们都需要一个块作用域。
for (var i =1 ; i <= 5; i++) {
    let j=i;
    setTimeout(function timer() {
        console.log('111', j);
    }, 0);
}

// better:for循环头部的let声明还会有一个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。
for (let i =1 ; i <= 5; i++) {
    setTimeout(function timer() {
        console.log('111', i);
    }, 0);
}

// 总结： 解决以上问题 使用 闭包（立即执行函数） 或者 块作用域（let）

// 拓展1：既然let声明一个块作用域，那const行不行，答案是不行
for (const i =1 ; i <= 5; i++) {
    setTimeout(function timer() {
        console.log('111', i);
    }, 0);
}
//参考：https://stackoverflow.com/questions/31987465/ecmascript-2015-const-in-for-loops


// 拓展2： for of

// let ggod
let iterable = [10, 20, 30];

for (let value of iterable) {
    value += 1;
    console.log(value);
}

// const good
let iterable = [10, 20, 30];

for (const value of iterable) {
    console.log(value);
}


/**
 * 8. 要想理解闭包，需要进阶一下，看看我们平时都用的模块化，下面我们结合模块化说说闭包。
 */

// 举例
// 模块创建器： CoolModule函数。每次调用都会创建一个新的模块实例
// 单例模式：当只需要一个实例时，我们可以借助立即执行函数。执行后创建闭包。
var foo = (function CoolModule(){
    var something = 'cool';
    var another = [1,2,3];

    // 闭包函数
    function doSomething() {
        console.log(something);
    }

    // 闭包函数
    function doAnother() {
        console.log(another.join("!"));
    }

    // 暴露出去的公共API：暴露出去的的闭包函数
    return {
        doSomething,
        doAnother
    }
})();

// 测试闭包
foo.doSomething();
foo.doAnother();



/**
 * 9. 重点探究模块机制:ES6 模块 和 CommonJS 模块 区别
      a.ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝
      b.ES6 模块编译时执行，而 CommonJS 模块总是在运行时加载
 */

// 1. 一个单独的文件就是一个单独的模块。一个模块可以导入其他模块或特定的API成员，也可以导出自己的API成员。

// 2. 解释几句话：
// 原话1：如果你想要在 CommonJS 中动态获取模块中的值，那么就需要借助于函数延时执行的特性.
// 理解1：将导出的值，包装成函数导出。

//bad

// b.js
const num = Math.random();
export default num;

// a.js
import num from './b';
console.log(1,num);
console.log(2,num);




// 原话2：import() 允许你在运行时动态地引入 ES6 模块
// 理解2：ES6 模块在编译时就会静态分析,导致了我们无法在条件语句或者拼接字符串模块,因为这些都是需要在运行时才能确定的结果在 ES6 模块是不被允许的

// 原话3：模块不会重复执行
// 理解3：import 多次相同的文件 或者 require 多次相同的文件 在一个文件。只会执行一次。


/**
 * 参考：
 * 0.ES6 模块与 CommonJS 模块的差异:https://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82
 * 1.深入理解 ES6 模块机制 :https://juejin.cn/post/6844903565236895758
 * 2.Node.js 如何处理 ES6 模块 http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html
 * 3.你不知道JavaScript（上）之 闭包-5.5模块：https://weread.qq.com/web/reader/8c632230715c01a18c683d8k1c3321802231c383cd30bb3
 */

/**
 * 10. 说了这么多，觉得跟说完了，但还是觉得还得说说V8(内存)?
    a. 对内存理解？
    内存主要是存储变量等数据的，比如值类型怎么存，引用类型怎么存
    全局对象会始终存活到程序运行结束。
    // a.js 执行假如内存溢出。程序运行结束的意思在这里就是 node a.js 后
    var arr1 = new Array (1024*1024*1024);
    var arr2 = new Array (1024*1024*1024);
    var arr3 = new Array (1024*1024*1024);
    var arr4 = new Array (1024*1024*1024);
    局部变量就是当程序执行结束，且没有引用的时候就回随着消失。
    // a.js 执行后，因为arr2，arr3为局部变量且没有引用，所以立即执行完就被垃圾回收机制回收了
    var arr1 = new Array (1024*1024*1024);
    var bar = (function () {
        var arr2 = new Array (1024*1024*1024);
        var arr3 = new Array (1024*1024*1024);
    }) ();
    var arr4 = new Array (1024*1024*1024);
    b. 如何优化内存？
    尽快不要定义全局变量
    全局变量记得销毁掉。 a = undefined || null;
    用匿名自执行函数变全局为局部。
    尽量避免闭包。// 外部一直存在对父函数内部变量引用，导致父函数执行完作用域没有销毁。
    c. 内存泄露？
    滥用缓存 ：比如，图表问题
    // a.js
     var a = [];
     var bar = function () {
         a.push()
     };
    大内存操作：写文件 一次性写到内存还是 一点一点写（流）
  */

