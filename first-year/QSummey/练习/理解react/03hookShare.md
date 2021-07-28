## 一、为什么要在react中引入hooks？

1. 代码复用
    * 在组件之间复用状态逻辑(state)很难。 --->比如 render props 和 高阶组件。--->增加了额外的组件
    * Hook 使你在无需修改组件结构的情况下复用状态逻辑。---> 自定义 Hook --->不增加组件

2. 代码管理
    * 复杂组件变得难以理解。 --->componentDidMount(获取数据、事件监听)等
    * Hook 将组件中相互关联的部分拆分成更小的函数 --->Effect Hook

3. 难以理解的 class
    * this 的理解，babel/plugin-proposal-class-properties
    * Hook 则拥抱了函数
    :cherries: 开始“用 Hook 的方式思考”前，需要做一些思维上的转变。按照我们的经验，最好先在新的不复杂的组件中尝试使用 Hook。

4. 结论: 无状态的函数式组件 + hooks（state）---> 有状态的函数组件

## 二、Hook 是什么？
   * Hook 是一个特殊的函数，它可以让你`“钩入” React 的特性` (“钩入” React state 及生命周期等特性的函数)。例如，`useState `是允许你在 React 函数组件中`添加 state 的 Hook`。

## 三、hook中更新state和class组件更新state的区别是什么？
   * 更新 state 变量总是替换它而不是合并它。
   * 比如 const [obj,setObj] = useState({age: 1, name: 'xx'});
   * setObj({age: 2, name: 'xx'}); ---> obj = {age: 1, name: 'xx'}现在是 obj = {age: 2, name: 'xx'}
   * 对于class state = {obj:{age: 1, name: 'xx'}}
   * this.setState({obj:{age: 2, name: 'xx'}});---> obj = {...{age: 1, name: 'xx'}, ...{age: 2, name: 'xx'}}

## 四、hook的使用规则
   1. 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
   2. 只能在 React 的函数组件中 Hook、自定义的 Hook 中调用。不要在其他 JavaScript 函数中调用。

## 五、useEffect的使用、useCallback的使用、useMemo的使用
   1. useEffect的各个生命周期使用、踩坑（死循环、async）、使用场景

    ```
        // 会死循环
        const [a, setA] = useState({});
        useEffect(() => {
            setA({ num: 1 });
        }, [a]);

        // 不会死循环
        const [a, setA] = useState({});
        useEffect(() => {
        }, [a]);
        const onClickBth = () => {
            setA({ num: 1 });
        }

        // 不会死循环
        const [a, setA] = useState(0);
        useEffect(() => {
            setA(1);
        }, [a]);

        // 会死循环
        const [a, setA] = useState(0);
        useEffect(() => {
            setA(Math.random());
        }, [a]);
    ```

    ```
        // useEffect可以为多个。
        // 踩坑场景：多选依赖一个数组，默认值从后端获取
        // bad
        const [arr, setA] = useState([]);
        const barApi = () => {
            setA([1, 2, 3]);
        }
        useEffect(() => {
            barApi();
        }, [arr]);

        // good
        const [arr, setA] = useState([]);
        const barApi = () => {
            setA([1, 2, 3]);
        }
        useEffect(() => {
            barApi();
        }, []);
        useEffect(() => {
            // 其他操作
        }, [arr]);
    ```

    ```
        // async 会不会有问题？yes
        useEffect(async () => {
            setA(1);
            console.log('ewadszx', a);
        }, [a]);


        // good
        const far = async () => {
            setA(1);
        }
        useEffect(() => {
            far();
            console.log('ewadszx', a);
        }, [a]);
    ```

    ```
        useEffect(() => () => {
            for (const c of charts) {
                c[1] && c[1].destroy();
            }
        }, []);
    ```

   2. useCallback 和 useMemo 缓存 和不用 useCallback 和 useMemo的区别 以及 踩坑（缓存错误)

    ```
        const { Input } = antd;
        const { AudioOutlined } = icons;

        const { Search } = Input;

        const suffix = (
            <AudioOutlined
                style={{
                    fontSize: 16,
                    color: '#1890ff',
                }}
            />
        );
        let number = 1;
        let searchCb1 = null;
        let searchCb2 = null;
        const App = () => {
            console.log('执行' + (number++) + '次')
            const [value, setValue] = React.useState('123');
            const onSearch = value => {
                setValue(value)
            }

            const onSearchCallback = React.useCallback(value => {
                setValue(value)
            }, [])

            React.useEffect(() => {
                console.log('执行一次')
                searchCb1 = onSearch;
                searchCb2 = onSearchCallback;
            }, [])

            React.useEffect(() => {
                console.log('searchCb1 === onSearch', searchCb1 === onSearch)
                console.log('searchCb2 === onSearchCallback', searchCb2 === onSearchCallback)
            })

            return (
                <>
                    <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                    {value}
                </>
            )
        }

        ReactDOM.render(<App />, mountNode);
    ```
    3. 依赖项:如何确定依赖项？
       * 依赖项
       * 漏选导致缓缓存

    4. 函数式组件要引入 React吗？ 即import React from 'react';
       * 用babel试一试即可： https://babeljs.io/ 其实就是React.createElement
       * 为什么有的函数式组件没有写可以？1.真正的就是一个普通函数没有jsx语法 2.用了babel-plugin-react-require插件


## 六、React 是如何把对 Hook 的调用和组件联系起来的？等价于：调用同一个hook,在组件首次渲染的时候如何区别的？以及更新组件怎么对应上更新那个hook？
   * React 保持对当前渲染中的组件的追踪。多亏了 `Hook 规范`，我们得知 Hook 只会在 React 组件中被调用（或自定义 Hook —— 同样只会在 React 组件中被调用）。
   * 每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 useState() 调用一个 Hook 的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。
   ```
        let isMount = true;
        let workInProgressHook = null;

        // 组件级别东西
        const fiber = {
            memoizedState: null,
            stateNode: App
        };

        // 模拟render
        function schedule() {
            workInProgressHook = fiber.memoizedState;
            const app = fiber.stateNode();
            isMount = false;
            return app;
        }

        // hook-useState
        function useState(initialState) {
            let hook;

            if (isMount) {
                hook = {
                    memoizedState: initialState,
                    next: null,
                    queue: {
                        pending: null //pending指向最新的
                    }
                }
                if (!fiber.memoizedState) {
                    fiber.memoizedState = hook;
                } else {
                    workInProgressHook.next = hook;
                }
                workInProgressHook = hook;
            } else {
                hook = workInProgressHook;
                workInProgressHook = workInProgressHook.next;
            }

            let baseState = hook.memoizedState;
            if (hook.queue.pending) {
                let firstUpdate = hook.queue.pending.next;

                do {
                    const action = firstUpdate.action;
                    baseState = action(baseState);
                    firstUpdate = firstUpdate.next;
                } while (firstUpdate !== hook.queue.pending)

                hook.queue.pending = null;
            }
            hook.memoizedState = baseState;

            return [baseState, dispatchAction.bind(null, hook.queue)];
        }

        // 更新hook
        function dispatchAction(queue, action) {

            // 创建update
            const update = {
                action,
                next: null
            }

            // 环状单向链表操作
            if (queue.pending === null) {
                update.next = update;
            } else {
                update.next = queue.pending.next;
                queue.pending.next = update;
            }
            queue.pending = update;

            // 模拟React开始调度更新
            schedule();
        }

        function App() {
            const [num, updateNum] = useState(0);
            const [num1, updateNum1] = useState(100);

            console.log(`${isMount ? 'mount' : 'update'} num: `, num);
            console.log(`${isMount ? 'mount' : 'update'} num1: `, num1);

            return {
                click() {
                    updateNum(num => num + 1);
                    updateNum1(num => num + 100);
                },
                focus() {
                    updateNum1(num => num + 100);
                }
            }
        }

        const app = schedule();
        app.click();
        app.click();
   ```

## 七、自定义hook是什么？
    ```
        import React, { useState, useEffect } from 'react';

        function useFriendStatus(friendID) {
        const [isOnline, setIsOnline] = useState(null);

        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        useEffect(() => {
            ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
            return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
            };
        });

        return isOnline;
        }
        ```
        * 它将 friendID 作为参数，并返回该好友是否在线：

        * 现在我们可以在两个组件中使用它：
        ```
        function FriendStatus(props) {
            const isOnline = useFriendStatus(props.friend.id);

            if (isOnline === null) {
                return 'Loading...';
            }
            return isOnline ? 'Online' : 'Offline';
        }
        ```
        ```
        function FriendListItem(props) {
        const isOnline = useFriendStatus(props.friend.id);

        return (
            <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
            </li>
            );
        }
    ```