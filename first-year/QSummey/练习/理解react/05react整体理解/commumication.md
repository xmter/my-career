一、对redux理解
1. redux是什么
 * redux是一个专门用于做状态管理的JS库(不是react插件库)。
 * 它可以用在react, angular, vue等项目中, 但基本与react配合使用。
 * 作用: 集中式管理react应用中多个组件共享的状态。
2. 什么情况下需要使用redux
 * 某个组件的状态，需要让其他组件可以随时拿到（共享）。
 * 一个组件需要改变另一个组件的状态（通信）。
 * 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。
3. redux异步编程
 * redux默认是不能进行异步处理的,
 * 某些时候应用中需要在redux中执行异步任务(ajax, 定时器)
 * 使用异步中间件 npm install --save redux-thunk
4. react-Redux是什么
 * 一个react插件库
 * 专门用来简化react应用中使用redux
5. react-Redux将所有组件分成两大类
 * UI组件
 1) 只负责 UI 的呈现，不带有任何业务逻辑
 2) 通过props接收数据(一般数据和函数)
 3) 不使用任何 Redux 的 API
 4) 一般保存在components文件夹下
 * 容器组件
 1) 负责管理数据和业务逻辑，不负责UI的呈现
 2) 使用 Redux 的 API
 3) 一般保存在containers文件夹下
5. 相关API
 * Provider：让所有组件都可以得到state数据
 * connect：用于包装 UI 组件生成容器组件
 * mapStateToprops：将外部的数据（即state对象）转换为UI组件的标签属性
 * mapDispatchToProps：将分发action的函数转换为UI组件的标签属性
6. 参考
[a.Redux 基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
[b.中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
[c.React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

二. 对Context的理解
 * 创建Context容器对象：
   ```
    const xxxContext = React.createContext(null);
   ```
 * 渲染子组件时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
   ```
     <xxxContext.Provider value={数据}>
             子组件
     </xxxContext.Provider>
   ```
 * 后代组件读取数据：
  a. 第一种方式:仅适用于类组件
	  ```
      static contextType = xxxContext // 声明接收context
	  this.context // 读取context中的value数据
      ```
  b. 第二种方式: 函数组件与类组件都可以

	  ```
        <xxxContext.Consumer>
            {
            value => ( // value就是context中的value数据
                要显示的内容
            )
            }
        </xxxContext.Consumer>
      ```

三、消息订阅-发布机制 pubsub-js 理解
 * import PubSub from 'pubsub-js' //引入
 * PubSub.subscribe('delete', function(data){ }); //订阅
 * PubSub.publish('delete', data) //发布消息

四、对通信方式的总结
 * 父子：props & cb
 * 祖孙：Context
 * 兄弟：redux or 消息订阅-发布机制