'use strict'

// 使用koa处理http请求
// 安装：koa

// 在koa中，导入的是一个class，因此用变量首字母大写进行标明
const Koa = require('koa');

// 创建一个Koa对象并表示Web App本身
const app = new Koa();

// 对于http请求，app将调用该异步函数进行处理
app.use(async (ctx, next) => {
  // next是koa传入的将要处理的下一个异步函数
  // 为什么要调用await next()？原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
  // middleware会按照在代码中的顺序依次执行，因此其定义的顺序很重要
  // 如果一个middleware没有调用await next()，则后续的middleware将不再执行。
  await next(); // 调用下一个middleware，即下方的use函数
  // ctx是由koa传入的封装了request和response的变量
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, Koa!</h1>';
});

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

// 在端口8080进行监听
app.listen(8080);

console.log('Web app started at port 8080.');