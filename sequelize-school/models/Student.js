/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-02 21:16:44
 * @LastEditors: your name
 * @Description: Model Student
 */
const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sex: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING(11),
    allowNull: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true,
})

module.exports = Student