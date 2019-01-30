const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'udemy-node',
  'root',
  '111111', 
  {
    dialect: 'mysql',
    host: 'localhost'
  }
);

module.exports = sequelize;