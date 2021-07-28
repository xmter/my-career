1. 用于动态构建用户界面的 JavaScript 库(只关注于视图)，虚拟DOM对象最终都会被React转换为真实的DOM而更新界面。 UI=f(data);

2. JSX（JavaScript XML)
 * react定义的一种类似于XML的JS扩展语法: JS + XML本质是```React.createElement(component, props, ...children)```方法的语法糖
 * 作用: 用来简化创建虚拟DOM VDOM = React.createElement(component, props, ...children);
 * 写法：```var ele = <h1>Hello JSX!</h1>```最终产生的就是一个JS对象

3. 渲染虚拟DOM
 * ReactDOM.render(virtualDOM, containerDOM)
 * 作用: 将虚拟DOM元素渲染到页面中的真实容器DOM中显示

4. 模块化、组件化、工程化简单解释
 * 组件化：拆分html/css/js/img的集合等
 * 模块化：拆分js
 * 工程化：比如项目的整体技术架构react + webpack + es6 + eslint

5. 相关js库
 * react.js：React核心库。
 * react-dom.js：提供操作DOM的react扩展库。
 * babel.min.js：解析JSX语法代码转为JS代码的库。

6. 组件三大核心属性state， props，refs

7. 事件处理onXxx
* React使用的是自定义(合成)事件, 而不是使用的原生DOM事件
* React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)


8. 生命周期的三个阶段（旧）
 * 初始化阶段: 由ReactDOM.render()触发---初次渲染
   constructor()
   componentWillMount()
   render()
   componentDidMount()
 * 更新阶段: 由组件内部this.setSate()或父组件重新render触发
   shouldComponentUpdate()
   componentWillUpdate()
   render()
   componentDidUpdate()
 * 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
   componentWillUnmount()

9. 生命周期的三个阶段（新）
 * 初始化阶段: 由ReactDOM.render()触发---初次渲染
   constructor()
   getDerivedStateFromProps
   render()
   componentDidMount()
 * 更新阶段: 由组件内部this.setSate()或父组件重新render触发
   getDerivedStateFromProps
   shouldComponentUpdate()
   render()
   getSnapshotBeforeUpdate
   componentDidUpdate()
 * 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
   componentWillUnmount()

10. 重要的勾子
 * render：初始化渲染或更新渲染调用
 * componentDidMount：开启监听, 发送ajax请求
 * componentWillUnmount：做一些收尾工作, 如: 清理定时器
11. 即将废弃的勾子（UNSAFE_前缀）
 * componentWillMount
 * componentWillReceiveProps
 * componentWillUpdate

12. 了解Fetch
 * fetch: 原生函数，不使用XmlHttpRequest对象提交ajax请求
 * GET请求
  ```
    fetch(url).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
    }).catch(function(e) {
        console.log(e)
    });
  ```
 * POST请求
 ```
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  }).then(function(data) {
    console.log(data)
  }).catch(function(e) {
    console.log(e)
  })
 ```
