/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 08:58:34
 * @LastEditors: your name
 * @Description: orm init
 */
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('myschooldb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null
})

module.exports = sequelize
