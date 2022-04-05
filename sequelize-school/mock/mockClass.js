/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 21:52:56
 * @LastEditors: your name
 * @Description: class 班级mock数据
 */
const Mock = require('mockjs')
const result = Mock.mock({
  'datas|16': [{
    'id|+1': 1,
    'name': '五年 @id 班',
    openDate: "@date"
  }]

}).datas
console.log('result', result);

const Class = require('../models/Class')
Class.bulkCreate(result)
