/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-17 16:38:08
 * @LastEditors: your name
 * @Description: orm init
 */
const { Sequelize } = require('sequelize')
const { sqlLogger } = require('../logger')

const sequelize = new Sequelize('myschooldb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => {
    sqlLogger.debug(msg)
  }
})

module.exports = sequelize
