'use-strict'

// 处理url路由

const fs = require('mz/fs');
const path = require('path');

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`Register url mapping: GET ${path}.`);
    } else if (url.startsWith('POST')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`Register url mapping: POST ${path}.`);
    } else if (url.startsWith('PUT')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`Register url mapping: PUT ${path}.`);
    } else if (url.startsWith('DELETE')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`Register url mapping: DELETE ${path}.`);
    } else {
      console.log(`Invalid url ${path}.`);
    }
  }
}

// dir为controller所在目录名称
function addControllers(router, dir) {
  fs.readdirSync(path.join(__dirname, dir)).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    let mapping = require(path.join(__dirname, dir, f));
    addMapping(router, mapping);
    console.log(`Controller ${f} added.`);
  });
}

// dir为controller所在目录名称
module.exports = function (dir) {
  let router = require('koa-router')();
  addControllers(router, dir || 'controllers');
  return router.routes();
}