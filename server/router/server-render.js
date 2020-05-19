const ejs = require('ejs');

module.exports = async (ctx, renderer, template) => {
  ctx.headers['contentType'] = 'text/html';

  const context = {url: ctx.path};

  try {
    const appString = await renderer.renderToString(context);
    const {title} = context.meta.inject();
    const html = ejs.render(template, {
      title: title.text(),
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    });

    ctx.body = html;
  } catch (err) { 
    console.log('render error', err);
    throw err;
  }
}