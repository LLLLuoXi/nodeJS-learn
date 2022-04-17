/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-17 15:21:06
 * @LastEditors: your name
 * @Description: Model Student
 */
const sequelize = require('./db')
const { DataTypes } = require('sequelize')
const moment = require('moment')

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return +moment(this.getDataValue("birthday"));
    }
  },
  age: {
    type: DataTypes.VIRTUAL,
    get() {
      const now = moment.utc()
      const birth = moment.utc(this.birthday)
      // 得到两个日期年份的差异
      return now.diff(birth, 'y')
    }
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