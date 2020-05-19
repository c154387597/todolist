const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const VueServerRender = require('vue-server-renderer');

const serverRender = require('./server-render');

const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    // 重新创建上下文
    runInNewContext: false,
    // 控制使用 template 时是否执行自动注入
    inject: false,
    // 提供一个由 vue-server-renderer/client-plugin 生成的客户端构建 manifest 对象
    clientManifest
  }
);

const pageRouter = new Router();

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
);

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template);
});

module.exports = pageRouter;
