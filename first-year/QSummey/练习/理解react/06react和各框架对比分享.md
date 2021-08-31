1. react

 * 横向对比 

 * 领域状态（逻辑相关）redex、vuex+视图状态（跟UI相关）reat、vue

 * UmiJS是react的一个框架 (包含了状态管理+路由+内置的request)
 * 后端框架next.js,egg.js

 * 前端框架umi---解决 路由、请求库、工程化 状态（领域状态+视图状态）不同于视图库react，同时可以相当于是一个create-react-app脚手架 但不是 ，他就是一个框架
 * UI = fn( state)  =====>  视图 = 库（视图状态）

2. 视图库比较
* Svelte：节点级更细粒度， 模板， 预编译/关心触发更新的节点/无虚拟DOM
* react:  树级更新粒度，全量的diff， JSX，基本无编译/不关心触发节点的更新/虚拟DOM
* vue: 组件级更新粒度（关心是那个组件） 不是全量的diff， JSX or 模板， 有预编译的能力/关心触发更新的节点/虚拟dom

* solidjas: https://www.solidjs.com/docs/latest/api

3. 什么是副作用？
* 组件内部控制不了的就是副作用 （不受react控制的是副总用，比如改变 document.title）

4. 对函数式理解？
* 自变量变了 因变量就变了，，，，，，，，

5. [useLayoutEffect和useEffect的区别](https://zhuanlan.zhihu.com/p/348701319)


6. 什么是ConcurrentMode？

* 并发模式 & 可中断渲染
* 对于 CPU-bound 的更新 (例如创建新的 DOM 节点和运行组件中的代码)，并发意味着一个更急迫的更新可以“中断”已经开始的渲染。
* 对于 IO-bound 的更新 (例如从网络加载代码或数据)，并发意味着 React 甚至可以在全部数据到达之前就在内存中开始渲染，然后跳过令人不愉快的空白加载状态。

![react性能分析和解决办法](http://ww1.sinaimg.cn/large/006BEibLly1gt1tbge6jbj31v616wkjl.jpg)
* 参考：https://sspai.com/post/53327