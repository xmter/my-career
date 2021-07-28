// https://webpack.docschina.org/concepts/plugins/
const MyTestPluginName = 'MyTestPlugin';

class MyTestPlugin {
    constructor(opts) {
        console.log(opts);
        this.opts = opts || {};
    }
    apply(compiler) {
        // 打印compiler,compilation会报错~
        compiler.hooks.run.tap(MyTestPluginName, (compilation) => {
            console.log(444, 'webpack 构建过程开始！');
        });
    }
}

module.exports = MyTestPlugin;


/**
 * webpack 插件是一个具有 apply 方法的 JavaScript 对象。
 * apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象。
 * compilation 处理 webpack 内部实例的特定数据。
 */