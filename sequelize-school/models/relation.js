/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 22:06:36
 * @LastEditors: your name
 * @Description: 设置模型关系
 */
const Class = require('./Class')
const Student = require('./Student')

Class.hasMany(Student)
Student.belongsTo(Class)

