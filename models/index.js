'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = {
  "username": process.env.NAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DATABASE,
  "host": process.env.HOST,
  "dialect": "mysql"
}
var db = {};

if (env === "development") {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
else {
  var sequelize = new Sequelize(process.env.JAWSDB_URL);
}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
