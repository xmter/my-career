
1. 下单即转换率-->等价提高用户体验

2. 最重要是移动端的性能优化
性能指标（性能优化参考标准）：
TTFB(请求发出去到请求回来的总时长)：影响因素：后台处理能力、回路网络的情况、资源下载时长
fcp(首屏渲染时间):白屏时间
Speed Index(速度指标): 页面内容的填充速度,4s内为绿色
load(所有资源加载时间)
blocking time：用户交互中页面卡住的时间
first view: 首次访问
repeat view：第二次访问

* 区别：
dom加载的时间 (蓝线) documentContentLoaded
所有资源加载时间 (红线)load


3. 工具：
瀑布图waterfall
HAR(格式)存储性能表格
cmd+shift+p
webpagetest
DevTools
Lighthouse： 网站整体（一站式：Performance、Accessibility、Best Practices、SEO 即不仅仅是Performance）质量评估
performance: main主线程
network：去掉勾选 disable cache （原因是性能测试的时候，看我们设置的缓存生效了没）;throtting（调整网络吞吐）;timing

4. RAIL：
response（<50ms）、animation（<1000ms/60侦 - 6ms）、idle（空闲）、load(加载、解析、渲染 -->达到用户可交互的状态 <5s)

5. profiling 分析中


6. 下载资源后渲染到页面做了什么？

* js（用户操作变化了）->style（重新计算）->layout（绘制（大小位置）到页面）->paint（真正的绘制图，文字等）-> composite(合成)（页面拆分成多个图层来绘制）

* html(DOM) + style(CSSOM) ==(合并)==> render tree （比如删除display为none的）

* 布局layout： 关心的位置和大小（几何线性）
* paint： 绘制（实心）

* 不布局而重绘： bg
* 不布局也不重绘：位移不会 transform 、透明度

* 避免回流：修改top 用 transform 位移，别直接
* 读写分离：批量的读 然后再写（浏览器写是异步的 但是你在读 就强制读(强制回流)）

* main里面查看，cmd+双指滚动 放大查看

react时间调度的实现：fiber时间调度（利用window.requestAnimationFrame()---layout、paint -----requestidleCallback）

code splitting 代码拆分

Tree shaking 代码减重

行间脚本不要超过1kb

主线程

measure 读
mutate 写
idle 空闲



反思：联想

https://www.kancloud.cn/kancloud/web_performance_optimization/81001



1. v8 编译原理

    * js -- parse解析 --> ast -- interpreter解释 --> 字节码 --> 机器码

2. V8优化机制

    * 脚本流
    * 字节码缓存
    * 懒解析 （针对函数真正被调用的时候才解析） lazy vs eager （fun） ==> optimize.js

2. 函数优化

    * eager parse: 括号语法（fun）

3. 对象优化

    * 初始化顺序，并且避免新增属性
      因为：js弱类型---引擎变成确定的类型(也就底层的隐藏类型)
    * 类数组没有真实数组遍历快---底层对数组优化了
      建议：转为数组遍历，利用v8对数组的优化
    * 避免超过数组长度
    * 数组值的类型别各种。PACKED_SMI_ELEMENTS
    * 参考：https://zhuanlan.zhihu.com/p/29638866

4. html优化

    * 减少iframes的使用 或者 iframe的src最后设置属性而不是标签内部
    * 压缩空白符
    * 避免节点深层嵌套
    * 删除注释
    * 避免table布局
    * css&JavaScript尽量外链
    * 删除元素默认的属性
    * 参考：https://www.imooc.com/article/4307

5. css优化

    * 使用 contain属性
    * 参考： https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain
    * 使用font-display属性

6. 资源的压缩和合并---为了优化网络加载还是渐进式加载，主要的先加载，再。。。考虑用户体验。
    * html压缩、css压缩
    * js压缩和混淆（混淆就是改变量名）
    * css文件合并、js文件合并
    * 了解Service Worker:https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API
    * 参考在线工具 和 webpack

7. 图片优化

    * 图片的格式
    * 图片的大小
    * 图片适配不同的屏幕（合适的尺寸）
    * 图片合适的压缩（精致、色彩丰富）
    * 图片加载的优先级---图片懒加载技术 lazy-load （根据用户所需加载）
    * 查看:图片属性 loading
    * 压缩工具 ？？
    * jpg(色彩丰富、体积小，场景用大图)&png(强调纹理，体积大，场景小图logo)
    * WebP格式(考虑兼容性哪些浏览器支持)---png&jpg优点的结合.
    * SVG 适合手机端

建议：看js新的规范、自动化解决方案



1. 兼容性
  * 工具: https://caniuse.com/?search=webp
  * 渐进式图片（越来越清晰） vs 基线图片（一半一半显示出来）
  * 响应式： srcset  and sizes (dpi)
2. webpack优化
  * tree-shaking 只能是es6模块？
    `https://webpack.docschina.org/guides/tree-shaking/#root`
  * babel-plugin-transform-runtime
    `https://www.babeljs.cn/docs/babel-plugin-transform-runtime`
  * DllPlugin (动态链接库)
    `https://webpack.docschina.org/plugins/dll-plugin/#root`
  * code-splitting (bundle ---> chunks)
    `https://webpack.docschina.org/guides/code-splitting/`
  * dynamic-imports 动态加载 lasy or suspense
    `https://webpack.docschina.org/guides/code-splitting/#dynamic-imports`
  * terser 压缩 JavaScript
    `https://webpack.docschina.org/plugins/terser-webpack-plugin/#getting-started`
  * html-webpack-plugin 压缩html
    `https://github.com/jantimon/html-webpack-plugin`
  * 持久化缓存 文件命hash （contenthash）
    filename 没有拆分的文件
    chunkFilename 动态加载的文件
  * 性能分析可视化工具 Webpack Chart
  * source-map-explorer
  * bundle-analysis
3. nginx: download
4. keep alive: 持久链接 Connection: keep-alive
5. http缓存
  * disable cache
  * cache-control expires and so on
6. http2
7. ssr



1. svg: 在 react中使用尽量用组件https://learnku.com/articles/22771
2. felxBox >flot
3. 移动端不缩放：<meta name="viewport" content="width=device-width, initial-scale=1.0">



vendor :供应商 第三方

