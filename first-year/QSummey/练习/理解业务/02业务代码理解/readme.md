1. 改名导入：import { name as newName } from "person"

2. dnd 没有没有Dnd Context的树
https://www.npmjs.com/package/react-sortable-tree
//或者您可以在没有Dnd Context的情况下将树导入为一个命名导出。如
import {SortableTreeWithoutDndContext as SortableTree} from ` react-sortable-tree `;

3. 组件位置：app/web/component/public-component

4. Button.displayName = '高途教师详情导航'; displayName

5. shouldCopyOnOutsideDrop 是?

6. CHANGE_TREE change_tree
SELECT_NODE select_node

7. newNodeTree 与 action.nodeTree
dispatch({ type: 'CHANGE_TREE', nodeTree: newNodeTree });

await pageDataToNodeTree(action.nodeTree);

8. react-dnd 是？

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default class YourApp {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        /* Your Drag-and-Drop Application */
      </DndProvider>
    )
  }
}

9. redux-saga是一个库，旨在使应用程序的副作用(例如，异步的事情，如数据获取和不纯粹的事情，如访问浏览器缓存)更容易管理，更有效地执行，易于测试，并更好地处理故障.redux-saga是一个redux中间件

10. 为什么用postMessage
`https://m.genshuixue.com/minecraft/`

11. react-redux 中 connect的两种写法
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

项目：
const VisibleTodoList = connect(
  mapStateToProps
)(({dispatch}) => (<div></div>));

12. classnames 组件
import classnames from 'classnames';

var Button = React.createClass({
  // ...
  render () {
    var btnClass = classNames({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    }); // 'btn btn-pressed btn-over'
    return <button className={btnClass}>{this.props.label}</button>;
  }
});

13. h5 和 iframe、postMessage

onLoad 是 react里?
<iframe
    src="/edit-viewer"
    onLoad={onFrameLoad}
>
    <p>Your browser does not support iframes.</p>
</iframe>

<iframe>元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用window.postMessage方法。

14. loadsh 库的使用

15. 装饰器
` 装饰器 表面看有注释的作用, 其实有 修改 和 增强 类的作用`
`类装饰器 两种写法：@deractor 或者 高阶函数`
`函数装饰器：由于存在变量提升 高阶函数`
```
function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}
// 这种 函数变量提升也没关系？ 2. 这种写法报错
@loggingDecorator
function doSomething(name) {
  console.log('Hello, ' + name);
}

const wrapped = loggingDecorator(doSomething)
wrapped('xmt','yz');
```

16. currentNode 、 nodeTree 、 pageProps  所代表的数据

export default connect(s => s)(PageProperty);  // s 就是 store 吧


17. Cookies npm trackId()
Cookies is a node.js module for getting and setting HTTP(S) cookies. Cookies can be signed to prevent tampering, using Keygrip. It can be used with the built-in node.js HTTP library, or as Connect/Express middleware.



18. 一个组件的开发逻辑串起来...?

19. React.createContext({}) props传递 跨组件

20. 页面 和 iframe 都有, 因为 两个路由？公用模板渲染
<script>
    new window.VConsole();
</script>
`H5调试工具`
直接这么写，怎么识别是开发环境有？ `加条件判断`

21. ctx.render(filename, locals, viewOptions)参数三个?
`filename: 是完整的文件的路径，框架查找文件时已确认文件是否存在，这里不需要处理`
`locals: 渲染所需的数据，数据来自 app.locals，ctx.locals 和调用 render 方法传入的。框架还内置了 ctx，request, ctx.helper 这几个对象。`
`viewOptions: 用户传入的配置，可覆盖模板引擎的默认配置，这个可根据模板引擎的特征考虑是否支持。比如默认开启了缓存，而某个页面不需要缓存`

22. 函数名.属性; 类名.属性
`静态属性`

`类的静态属性`
```
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

23. mongodb

24. egg项目目录
https://eggjs.org/zh-cn/basics/structure.html
