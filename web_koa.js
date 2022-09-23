'use strict'

// 使用koa处理http请求
// 安装：koa

// 在koa中，导入的是一个class，因此用变量首字母大写进行标明
const Koa = require('koa');

// 创建一个Koa对象并表示Web App本身
const app = new Koa();

// 向koa添加并执行middleware
app.use(async (ctx, next) => {
  // 等待下一个middleware（由下方的use方法添加并执行）完成执行
  await next();
  // ctx是由koa传入的封装了request和response的变量
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, Koa!</h1>';
});

app.use(async ctx => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
});

// 在端口8080进行监听
app.listen(8080);

console.log('Web app started at http://127.0.0.1:8080.');