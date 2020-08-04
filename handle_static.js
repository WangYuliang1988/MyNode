'use strict'

// 处理静态资源，静态资源均放在static目录下
// 实际在生产环境中，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件

const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// prefix表示静态文件在http请求的url中的公共前缀，如/static/
// dir表示静态文件在文件系统中的目录，如/srv/node
function handleStatic(prefix, dir) {
  return async (ctx, next) => {
    let rpath = ctx.request.path;

    if (rpath.startsWith(prefix)) {
      let fp = path.join(dir, rpath);
      if (await fs.exists(fp)) {
        ctx.response.type = mime.getType(rpath);
        ctx.response.body = await fs.readFile(fp);
      } else {
        // 文件不存在
        ctx.response.status = 404;
      }
    } else {
      // 不是静态文件，继续处理下一个middleware
      await next();
    }
  };
}

module.exports = handleStatic;