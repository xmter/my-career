## 一 执行node程序
1. 运行文件
* node node.js
2. 终端执行
* node --> conole.log(123) -->两次 ctrl+C === ctr+D ===process.exit()
* `多行输入？部分输入+enter`
3. npm发包 (包含package.json文件)
* npm login (首次邮箱验证)
* npm publish
* npm unpublish xxx
* 使用自己发的包
4. 查看全局安装的npm包
* npm list -g
* npm list -g | grep yarn  (筛选)
* npm list -g --depth=0 // 获取顶层的软件包
5. 查看本地（-S(npm 5 后不需要-S)或-D,其实指——S）安装的npm包
* npm list
* npm list | grep express
* npm view [package_name] version 查看软件包在npm的最新版本
* npm view [package_name] versions 查看软件包在npm的所有版本
:cherries: npm list 简写 npm ls
6. 可执行文件如何执行？
* 方式1： node ./node_modules/.bin/可执行文件（npm包的可执行文件） 123
* 方式2： npx npm包（npm包的可执行文件） //如果没有安装 安装并执行，执行完安装的消失
7. package.json文件
* "name": "nodejs_cn" //名称必须少于 214 个字符，且不能包含空格，只能包含小写字母、连字符（-）或下划线（_）。// 这是因为当软件包在 npm 上发布时，它会基于此属性获得自己的 URL。
* "version": "1.0.0"
* "main": "src/main.js" // 当在应用程序中导入此软件包时，应用程序会在该位置搜索模块的导出。
* "browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
] //此配置意味着需要支持使用率超过 1％的所有浏览器的最新的 2 个主版本，但不含 IE8 及更低的版本。
8. npm update 更新package-lock.json.
9. 时间循环
* 调用堆栈
* process.nextTick()  异步 类似promise.then
* setImmediate() 约等于 setTimeout(() => {}, 0)
10. 环境变量
* NODE_ENV=production node app.js
11. nodejs中打印对象
* console.log(JSON.stringify(obj, null, 2))
* require('util').inspect.defaultOptions.depth = null console.log(obj)