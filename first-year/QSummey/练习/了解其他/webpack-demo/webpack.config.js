const path = require('path');
const resolve = (...p) => path.resolve(__dirname, ...p); // p为数组
const MyTestPlugin = require(resolve('my-plugin', 'p'));

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: resolve('dist')
    },
    module: {
        rules: [
          {
            test: /\.js/,
            use: [
                {
                    // 默认可以不写后缀a.js 可以写成a
                    loader: resolve('my-loader', 'a'),
                    options: {
                        age: 18
                    }
                },
                {
                    loader: resolve('my-loader', 'b'),
                    options: {
                        name: 'xmt'
                    }
                }
            ],
            exclude: /node_modules/
          }
        ]
    },
    plugins: [
        new MyTestPlugin({a: 123})
    ]
}