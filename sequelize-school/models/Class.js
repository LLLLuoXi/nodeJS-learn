/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 22:09:06
 * @LastEditors: your name
 * @Description: Model Class
 */
const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Class = sequelize.define('Class', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  openDate: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true,
})

module.exports = Class