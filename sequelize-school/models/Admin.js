/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-02 21:20:00
 * @LastEditors: your name
 * @Description: Model Admin
 */
const sequelize = require('./db')
const { DataTypes } = require('sequelize')

// 自动配置主键列
// 创建一个模型对象
const Admin = sequelize.define('Admin', {
  loginId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loginPwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    // createdAt:false,
    // updatedAt:false,
    // 从此以后，该表的数据不会真正的删除，而是增加一列deletedAt ，默认值null 记录删除的时间
    paranoid: true,
  })

// 模型同步
// (async function () {
//   await Admin.sync({
//     alter: true,
//   })
//   console.log('Model模型同步完成！');
// }())



module.exports = Admin

