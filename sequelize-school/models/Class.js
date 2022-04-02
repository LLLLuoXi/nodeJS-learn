/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-02 21:29:00
 * @LastEditors: your name
 * @Description: Model Class
 */
const sequelize = require('./db')
const { DataTypes } = require('sequelize')
const Student = require('./Student')

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
Class.hasMany(Student)

module.exports = Class