/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-02 22:01:08
 * @LastEditors: your name
 * @Description: orm init
 */
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('myschooldb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null
})

module.exports = sequelize
