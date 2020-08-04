'use strict'

// 集成Nunjucks，给ctx对象绑定一个render(view, model)方法，方便调用

const nunjucks = require('nunjucks');

// path表示视图文件所在目录名称
function createEnv(path, opts) {
  var
    autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path || 'views', {
        noCache: noCache,
        watch: watch
      }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
      });

  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

// path表示视图文件所在目录名称
function templating(path, opts) {
  var env = createEnv(path, opts);
  return async (ctx, next) => {
    // 给ctx绑定render函数
    ctx.render = function (view, model) {
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
      ctx.response.type = 'text/html';
    };
    // 继续处理下一个middleware
    await next();
  };
}

module.exports = templating;