/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 22:08:43
 * @LastEditors: your name
 * @Description: student 学生student数据
 */

const Mock = require('mockjs')
const result = Mock.mock({
  'datas|500-700': [{
    'id|+1': 1,
    name: '@cname',
    birthday: "@date",
    'sex|1-2': true,
    mobile: /1\d{10}/,
    'ClassId|1-16': 0,
    // location: '@city(true)',
  }]

}).datas
console.log('result', result);

const Student = require('../models/Student')
Student.bulkCreate(result)