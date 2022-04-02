/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-02 21:22:04
 * @LastEditors: your name
 * @Description: Model Book
 */

const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgurl: {
    type: DataTypes.STRING,
  },
  publishDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  paranoid: true,
})

module.exports = Book
