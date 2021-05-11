'use strict'

/**
 * 使用MVC框架，涉及：
 *    controllers目录
 *    views目录
 *    static目录
 *    controller.js文件
 *    handle_static.js文件
 *    templating.js文件
 *    app.js文件
 * 
 * 需提前安装：koa、koa-bodyparser、koa-router、nunjucks、mz、mime模块
 */

// 定义一个常量，判断当前是否生产环境，用于控制缓存、静态文件处理等
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
const Koa = require('koa');

const app = new Koa();

// 记录url请求日志
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}.`);

  var start = new Date().getTime();
  var execTime = 0;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 处理静态资源
if (!IS_PRODUCTION) {
  let handleStatic = require('./handle_static');
  app.use(handleStatic('/static/', __dirname));
}

// 解析请求body
app.use(bodyParser());

// 添加视图
app.use(templating('views', {
  noCache: !IS_PRODUCTION,
  watch: !IS_PRODUCTION
}));

// 添加控制器
app.use(controller());

app.listen(8080);

console.log('Web app started at http://127.0.0.1:8080.');