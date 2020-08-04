'use strict'

// 导入http模块
var http = require('http');

// 创建http server
var server = http.createServer(function (request, response) {
  // 获取http请求的method和url
  console.log(request.method + ': ' + request.url);

  // 生成http响应内容
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('<h1>Hello, World!</h1>');
});

// 让服务器监听8080端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080');