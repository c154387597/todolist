# todolist任务管理工具

## 技术栈

 - vue
 - koa
 - node
 - webpack

## npm script 命令

``` bash
# 运行开发模式和ssr
npm run dev
# 运行开发模式
npm run dev:client
# 运行ssr开发模式
npm run dev:server
```

## 项目结构

```
|- src
  |- pages
    |- ...
  |- index.js                   // dev入口文件
  |- server.entry.js            // dev:server入口文件
|- server
  |- router
    |- ssr.js
    |- dev.ssr.js               // 开发模式ssr配置
    |- server-render.js         // 页面渲染
  |- server.js
  |- server.template.ejs        // html容器模板
|- nodemon.json                 // ssr热更新配置
```
