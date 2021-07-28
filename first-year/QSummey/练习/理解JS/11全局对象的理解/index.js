
console.log('cdzx', ggg);
var app = {
    name: 'iphone',
    id: 123
}
var ctx = {
    name: 'node',
    id: 222
}
var isRequire = true;

console.log(app);
console.log(ctx);

var preapp = app;
var prectx = ctx;

function add() {
    app.color = 'red';
    // app.name = 'xxx';
    if (isRequire) {
        ctx = {
            name: 'hhh',
            id: 333
        }
    }
}
add();

setTimeout(()=> {
   console.log('123');
}, 1000);

console.log(preapp === app); // true
console.log(prectx === ctx); // false

// Q1：修改代码 app 重新加载 （类似刷新页面？） === ctx , 但 如果不修改代码 刷新页面 用的是同一个 app;

// Q2：多个用户 !== 打开多个标签页

// app是应用级别的,意思 就是每个用户过来访问 app.id 都是123
// 如果将senssion挂载到app上, 试着想一下senssion试试

// 是否挂掉:node服务器单个进程最大1400M,需要重启App应用


// 在说session是啥之前，我们先来说说为什么会出现session会话，它出现的机理是什么？我们知道，我们用浏览器打开一个网页，用到的是HTTP协议，学过计算机的应该都知道这个协议，它是无状态的，什么是无状态呢？就是说这一次请求和上一次请求是没有任何关系的，互不认识的，没有关联的。但是这种无状态的的好处是快速。
// 所以针对以上问题：这一次请求和上一次请求是没有任何关系： 那么我们引入session。
// session是什么呢？一个词：就是一次会话。
// 什么是一次会话？
// Session代表服务器与浏览器的一次会话过程，这个过程是连续的，也可以时断时续的。
// 针对同一个用户：关闭浏览器失效，浏览器子窗口共享（sessionkey一样），各浏览器窗口不共享（sessionkey不一样，但是想一下是同一个用户所以存的值是一样的，但是是两个对象，不是引用地址）。
// 这时候我们回想到 cookie也可以存么？但是cookie有限制。并且默认就是明文存放在客户端内存不安全。
// session呢？也受限制，但不至于那么小吧。另外本质上session最终还是要存入cookie的？意思就是比如我们将一个字段存在session中,这个字段小的话，直接存在cookie中了，但是如果大了，怎么处理的？
// 这时候我们想着不是session存在服务端吗？不是。太片面。你想想要解决cookie有大小限制问题。是不是有两种办法，另外开辟一块内存存，或者存服务器（这里说的就是存ridas、mysql数据库）。那再想想是不是
// 不是最终还是要存在cookie中了么，怎么解决cookie大小限制的。因为这时候在cookie中存的是sessionkey，key不大吧。同样默认加密存储，安全么。最终就是根据这个sessionkey去找session值。这里sessionkey为什么加密，我也不清楚，反正我觉得sessionvalue加密还能理解，这个可能就是cookie发现是存session，默认存的值都是加密的，不论存sessionkey还是sessionvalue。

// 彻底弄清楚session是什么？
// https://blog.csdn.net/think2me/article/details/38726429
// https://www.jianshu.com/p/25802021be63

// 签名验签的理解
// https://blog.csdn.net/joenqc/article/details/77434524

// 什么叫一次会话？
// https://blog.csdn.net/qin_xiaofang/article/details/77725946

// Web开发中四个域对象
// https://blog.csdn.net/chenyujian1987/article/details/14647155?locationNum=15&fps=1&utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242

// jsp教程
// https://www.runoob.com/jsp/jsp-tutorial.html
// jsp四大作用域详解
// https://www.cnblogs.com/WindSun/p/10209534.html

(function mokuai() {

})()