1. 位图(Bitmap)是什么？
   * 即栅格图，理解为像素图好点。
   * 每个像素的颜色由RGB颜色组成。每个像素使用的信息位(这里的信息位就是1，4，8，16，24位)数越多，可用的颜色就越多，颜色表现就越逼真，相应的数据量越大。
2. 24位如何理解？
   * 上面说了1，4，8，16，24位，还说了每个像素使用的信息位数越多，可用的颜色就越多，颜色表现就越逼真，相应的数据量越大。如何理解？
   * 24位：2^24 = 2^8(B) 2^8(G) 2^8(R) =  16777216 可以总共显示16777216种颜色
   * 再解释一下，当24位深度时，使用24位显示一个像素点，由8位 Red 8位 Green 8位 Blue组合颜色而成，每一个原始颜色（R/G/B）都`可以完全显示`（0~0xff） 也就是R（0-255）,G（0-255）,B（0-255）。
   * 所以24位及以上叫，真彩色图。
3. jpg是什么？
   * JPG格式以24位存储。
   * 这意味着什么呢？意味着可以呈现数百万种颜色。所以每当网站需要呈现色彩丰富的图片，JPG 总是最佳选择。
   * 但是，还不是说jpg为有损压缩吗？不就质量下降了吗？对于色彩丰富的图片压缩前后的质量损耗并不容易被我们人类的肉眼所察觉。原因就是它为24位图。所以适当压缩。
   * 压缩的另一个好处就是体积小了,这对我们加载图片的速度大大提升了。
4. png呢？
   * 无损压缩，体积太大
   * 8位的有，24位的也有，但是相对8位的来说呈现的颜色少了，但是这时候在处理线条和颜色对比度方面的优势,所以呈现小的Logo,颜色简单且对比强烈的图片或背景用png。
5. 有损压缩是什么？
   * 有损压缩是利用了`人类`对图像或声波中的`某些频率成分不敏感的特性`，允许压缩过程中损失一定的信息；虽然不能完全恢复原始数据，但是所损失的部分对理解原始图像的影响缩小，却换来了大得多的压缩比。
   * 压缩算法`不会`对图片所有的数据进行编码压缩，而是在压缩的时候，`去除了人眼无法识别的图片细节`。因此有损压缩可以在同等图片质量的情况下`大幅降低`图片的体积。

6. 无损压缩呢？
   * 所谓无损压缩格式，是利用数据的统计冗余进行压缩，`可完全恢复原始数据而不引起任何失真`，但压缩率是受到数据统计冗余度的理论限制，一般为2:1到5:1.这类方法广泛用于文本数据，程序和特殊应用场合的图像数据（如指纹图像，医学图像等）的压缩。
   * 压缩算法`对`图片的所有的数据进行编码压缩，能在保证图片的质量的同时`降低`图片的体积。

