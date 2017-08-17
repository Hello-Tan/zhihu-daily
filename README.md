# vue-music

> vue全家桶开发知乎日报webapp
# 在线演示地址：
  https://tanrenjie.github.io/zhihu-daily
  
    
### 技术栈
- Vue2.3：采用最新Vue2.3的语法
- Vuex：管理组件之间状态
- vue-router：单页面应用路由
- aixos：ajax动态获取数据
- stylus：css预处理语言
- Webpack：自动化构建工具，主要配置vue-cli脚手架提供。
- ES6：采用ES6语法。
- CSS3：CSS3动画及样式。


### 具体实现
1. 自己封装了首页轮播图/滑屏翻页
2. 使用手淘flexible配合rem布局
3. 组件切换过渡效果与原生app一致 / 增加上拉加载文章的过渡效果
4. 用localStorage存储收藏模式和夜间模式设置
5. 用<meta name=referrer content=never>标签去除referrer信息，解决知乎图片防盗链问题
6. 对于知乎api返回"不支持阅读模式"的数据，采用iframe获取文章内容,但因此导致阅读此类文章夜间模式不起作用。

## Build Setup

``` bash
# 安装项目依赖
npm install

# 启动项目，在浏览器输入localhost:8080访问
npm run dev

# 打包项目
npm run build

```

