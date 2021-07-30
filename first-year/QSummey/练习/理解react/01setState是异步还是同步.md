
### setState是异步还是同步？

0. 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。

1. 测试代码如下：
```
    class App extends React.Component {
    state = { val: 0 };
    changeValue = () => {
        this.setState({ val: this.state.val + 1 });
        console.log(this.state.val); // 输出的是更新后的值 --> 1
    };

    componentDidMount() {
        // this.setState({ val: this.state.val + 1 });
        // console.log(this.state.val);

        // this.setState({ val: this.state.val + 1 });
        // console.log(this.state.val);

        // setTimeout((_) => {
        //   this.setState({ val: this.state.val + 1 });
        //   console.log(this.state.val);

        //   this.setState({ val: this.state.val + 1 });
        //   console.log(this.state.val);
        // }, 0);

        document.body.addEventListener("click", this.changeValue, false);
    }

    increment = () => {
        this.setState({ val: this.state.val + 1 });
        console.log(this.state.val); // 输出的是更新前的val --> 0
    };

    render() {
        return <div onClick={this.increment}>{this.state.val}</div>;
    }
    }
```

2. 具体查看[源码分析](https://juejin.cn/post/6989858922337140750?utm_source=gold_browser_extension#heading-3)
