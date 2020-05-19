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

# 打包客户端和服务端
npm run build
# 打包csr
npm run build:client
# 打包ssr
npm run build:server
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
    |- ssr.js                   // 生产模式ssr配置
    |- dev.ssr.js               // 开发模式ssr配置
    |- server-render.js         // 页面渲染
    |- static.js                // 静态文件处理
  |- server.js
  |- server.template.ejs        // html容器模板
|- nodemon.json                 // ssr热更新配置
```
