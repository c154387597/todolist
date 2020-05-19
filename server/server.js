const Koa = require('koa');
const app = new Koa();
const send = require('koa-send');
const path = require('path');
const staticRouter = require('./router/static');

const isDev = process.env.NODE_ENV === 'development';

app.use(staticRouter.routes()).use(staticRouter.allowedMethods());

let pageRouter;
if (isDev) {
  pageRouter = require('./router/dev.ssr');
} else {
  pageRouter = require('./router/ssr');
}

/**
 * 对于每一个http请求，koa将调用我们传入的异步函数来处理
 * 参数ctx是由koa传入的封装了request和response的变量
 * next是koa传入的将要处理的下一个异步函数
 */
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`);
    await next(); 
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    if (isDev) {
      ctx.body = err.message;
    } else {
      ctx.body = `please try again later`;
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')});
  } else {
    await next();
  }
});

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`);
})
