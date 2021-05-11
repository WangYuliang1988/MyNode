'use strict'

// 通过koa-router处理url映射
// 安装：koa、koa-router

const Koa = require('koa');

const app = new Koa();

/**
 * 简单直接的处理方式，针对不用的url调用不同的处理函数
app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.body = 'index page';
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.path === '/error') {
    ctx.response.body = 'error page';
  } else {
    await next();
  }
});
*/

// 通过koa-router处理url映射
const router = require('koa-router')();

router.get('/welcome/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>`;
});

// 处理post请求时，会遇到一个问题：post请求通常会将一系列数据作为request的body进行发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能
// 这时需要引入koa-bodyparser，解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body
// 安装：npm install koa-bodyparser
const bodyParser = require('koa-bodyparser');

router.post('/signin', async (ctx, next) => {
  var name = ctx.request.body.name || '';
  var password = ctx.request.body.password || '';
  console.log(`Signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === 'password') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try Agin</a></p>`;
  }
});

// 添加parser
app.use(bodyParser());

// 添加router
app.use(router.routes());

app.listen(8080);

console.log("Web app started at http://127.0.0.1:8080.");
