const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'udemy-node',
  password: '111111'
});

module.exports = pool.promise();