require('dotenv').config()
module.exports = {
  development: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: '127.0.0.9',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.NAME,
    password: process.env.PASS,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres'
  }
}