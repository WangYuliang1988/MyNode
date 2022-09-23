'use strict'

/**
 * Sequelize访问MySQL
 * 
 * 安装：mysql2、sequelize
 */

const Sequelize = require('sequelize');

// 数据库相关配置
var config = {
  database: 'node',
  username: 'wangyuliang',
  password: 'langzi_1206',
  host: 'localhost',
  port: '3306'
};

// 创建Sequelize对象
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 6,
      min: 0,
      idle: 30000
    }
  }
);

// 定义模型，Sequelize将根据模型映射数据库表
var Pet = sequelize.define('Pet', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  birth: Sequelize.STRING(10),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
  version: Sequelize.BIGINT
}, {
  tableName: 'pets',
  timestamps: false
});

// 写数据
(async () => {
  var now = Date.now();
  await Pet.create({
    id: 'd-' + now,
    name: 'Tom',
    gender: true,
    birth: '2008-08-08',
    createdAt: now,
    updatedAt: now,
    version: 0
  });
})();

// 查数据
(async () => {
  var pets = await Pet.findAll();
  for (let p of pets) {
    console.log('Find: ' + JSON.stringify(p));
  }
})();

// 更新数据
(async () => {
  await Pet.update({
    updatedAt: Date.now(),
    version: Sequelize.literal('version + 1')
  }, {
    where: {
      name: 'Tom'
    }
  });
})();

// 删除数据
(async () => {
  await Pet.destroy({
    where: {
      name: 'Tom'
    }
  });
})();