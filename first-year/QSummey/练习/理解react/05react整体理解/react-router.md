
### 一、 React路由

0. SPA的理解
 * 单页Web应用（single page web application，SPA）。
 * 整个应用只有一个完整的页面。
 * 点击页面中的链接不会刷新页面，只会做页面的局部更新。
 * 数据都需要通过ajax请求获取, 并在前端异步展现。
1. 什么是路由?
 * 一个路由就是一个映射关系(key:value)
 * key为路径, value可能是function或component
2. 路由分类
 * 后端路由：
   理解： value是function, 用来处理客户端提交的请求。
   注册路由： router.get(path, function(req, res))
   工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
 * 前端路由：
   浏览器端路由，value是component，用于展示页面内容。
   注册路由: <Route path="/test" component={Test}>
   工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件
3. react-router-dom：专门用来实现一个SPA应用。
  ```
    <BrowserRouter>
    <HashRouter>
    <Route>
    <Redirect>
    <Link> :Link 此组件类似于 <a> ，但是不会导致数据的重新获取，只是在 react router 中进行路径跳转
    <NavLink> :NavLink 这是一种特殊的 Link 组件，会在当前路径匹配时处于 “active” 状态，比较适合用来做导航栏.
    ```
        <NavLink to="/react" activeClassName="hurray">
            React
        </NavLink>
    ```
    <Switch>: 对路由匹配的优化,多个相同路由匹配第一个
  ```
4. 其它
 * history对象: [对原生history对象的理解参考](https://developer.mozilla.org/zh-CN/docs/Web/API/History)
 * withRouter函数: 理解为一个装饰器，将把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上。
 * withRouter实现原理: 将组件包裹进 Route, 然后返回
 ```
    const withRouter = () => {
        return () => {
            return <Route component={Nav} />
        }
    }
 ```

 ```
   // 这里是简化版
    const withRouter = ( Component ) => () => <Route component={ Component }/>
 ```

5. 前端路由基本使用
```
    import React from "react";
    import { BrowserRouter as Router, Route, Link } from "react-router-dom";

    function BasicExample() {
    return (
        <Router>
        <div>
            <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
        </div>
        </Router>
    );
    }

    function Home() {
    return (
        <div>
        <h2>Home</h2>
        </div>
    );
    }

    function About() {
    return (
        <div>
        <h2>About</h2>
        </div>
    );
    }
```