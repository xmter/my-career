
基本组件：小标题组件（无子元素）

1. 类型：type
圆角的、带图标的(竖线)、带序号的(圈数字)
默认值 圆角的

序号（tip:选择带序号才有）: order
选择 1，2，3，4，5——10

2. 文本(tip:标题文本)：input

3. 色调: tonal
xxx、yyy、zzz等 默认：黑色
（xxx：#d51328 墨黑：#000000）
（yyy：#E6081f 灰色：383841）
 (zzz：#ff6c00)

4. 大小: size
small middle large 默认：middle
或者 百分比

5. 位置: position
左 、 中 、右 默认：居中

6. 是否加锚点---(考虑)

默认封装：
文本框 change事件 输入文字映射到h5标题整体样式【配色（颜色、背景色）、大小(整体大小、文字大小)、字体类型、加粗）】改变
备注：文字大小(根据正标题、副标题大小设计)



去除掉：事件：双击可编辑，移出单击编辑成功 （h5）