0. 浏览器渲染流程
    * js（用户操作变化了）->style（重新计算）->layout（绘制（大小位置）到页面）->paint（真正的绘制图，文字等）-> composite(合成)（页面拆分成多个图层来绘制）

1. 每秒绘制的帧数 FPS ，60帧数/1秒 ----> 1帧数约为16毫米

    * 其实浏览器的每帧并不是严格的16毫秒，它动态调整的，这样为了方便记忆

2. life of frame 每一帧

3. requestAnimationFrame(animationCallback); // `绘制前执行`,animationCallback的参数是一个微秒级别的时间performance.now()

    * 所以，不用定时器（毫秒级别）刷新，用raf刷新，它流畅

4. GUI渲染 和 JavaScript引擎 在同一个线程,是性能优化的基础。

    * 所以 GUI渲染 和 JavaScript引擎 是互斥的

5. requestIdleCallback 一帧中浏览器的空闲时间，执行优先级低的任务的回调。 // `绘制后执行`,所以不要在requestIdleCallback操作dom，会引起重新渲染

    * 优先级高的任务：事件响应、资源加载、渲染（布局绘制）---即浏览器自己的事情
    * 优先级低的任务：用户的事情
    * window.requestIdleCallback(userTaskCallback,[timeout: 1000])
    * timeout：如果指定了timeout并具有一个正值，并且`尚未通过超时毫秒数`调用回调，那么回调会在下一次空闲时期被强制执行，尽管这样很可能会对性能造成负面影响。什么意思呢？就是用户的任务执行事件`超过了这个timeout`,下一次帧就执行。
    * userTaskCallback 有1个参数IdleDeadline:{timeRemaining:func，didTimeout:boolean} 其中里面一个是空闲时间，一个是任务是否超时（userTaskCallback的执行时间是否超过timeout）
    * 没有空闲时间 或者 超时了 就执行下一个requestIdelCallback。

6. fiber 是什么？
    * fiber 是把整个任务userTaskCallback，分成很小的任务，每次执行一个任务
    * 执行完成后，看看有没有剩余时间，如果有继续下一个任务，如果没有，放弃执行。然后交给浏览器进行调度（交给下一个requestIdelCallback）。

7. 参考
    [react fiber](https://zhuanlan.zhihu.com/p/26027085)