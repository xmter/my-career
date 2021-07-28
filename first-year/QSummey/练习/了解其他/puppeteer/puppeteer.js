const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //设置可视区域大小,默认的页面大小为800x600分辨率
  await page.setViewport({width: 1920, height: 800});
  await page.goto('https://www.baidu.com/');
  //对整个页面截图
  await page.screenshot({
      path: './screenshot/a.png',  //图片保存路径
      type: 'png',
      fullPage: true //边滚动边截图
  });
  // 对页面某个元素截图
  let element = await page.$('#s_lg_img');
  await element.screenshot({
      path: './screenshot/baidu_logo.png'
  });
  await page.close();
  await browser.close();
})();