Node.js 学习工程

## Node.js 简介及应用

### Node.js 简介
Node.js是一个基于Chrome V8引擎的JavaScript运行时环境。

### Node.js 安装
打开 https://nodejs.org/en/download/ 页面，选择最新的稳定版本下载，然后根据提示安装即可，本示例基于的Node.js版本是v10.16.0。

### npm 简介
npm 是Node.js的包管理工具（Node Package Manager），用于下载、管理第三方包。

### 搭建Web服务-初始示例
使用Node.js进行服务器开发非常简单，Node.js自身提供了http模块，用于处理TCP连接、解析HTTP等基础工作，因此只需以下代码即可实现一个简单的Web服务：
```
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
```
示例代码位于web.js中，通过在终端中执行node web.js命令，即可启动服务，然后通过浏览器访问 http://127.0.0.1:8080 ，显示“Hello, World”页面，成功！

### 搭建Web服务-使用koa
koa是一个基于Node.js的Web框架，对Node.js的http模块进行了封装，使用更加方便，并且支持异步。对应的示例代码位于web_koa.js中，通过在终端中执行node web_koa.js命令，即可启动服务。

### 搭建Web服务-使用koa-router
koa-router是一个用于处理url映射的模块，使得处理url映射更加方便。对应示例代码位于web_koa_router.js中，通过在终端中执行node web_koa_router.js命令，即可启动服务。

### 搭建Web服务-使用MVC框架
在正式的Node.js开发中，一般使用MVC等架构进行开发，提高开发效率，降低出错风险。使用MVC框架的示例包含以下目录及文件：controllers目录、views目录、static目录、controller.js文件、handle_static.js文件、templating.js文件、app.js文件。通过在终端中执行node app.js，即可启动服务。

### 操作MySQL数据库-使用ORM框架
Sequelize是一个用来操作MySQL数据库的ORM框架，对应示例代码位于：mysql_orm.js中，需配合本地MySQL数据库查看操作结果。