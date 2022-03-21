'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable === 'production') {
  const { DATABASE_URL } = process.env;
  const dbUrl = process.env.database;
  const username = process.env.username;
  const password = process.env.password;
  const host = process.env.host;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(username, password, config, {
    define: {
      freezeTableName: true,
    },
    trim: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
