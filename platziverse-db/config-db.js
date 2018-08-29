'use strict'

const debug = require('debug')

module.exports = function ( reset = false ){
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: s => debug(s),
    setup: reset
  }

  return config
}