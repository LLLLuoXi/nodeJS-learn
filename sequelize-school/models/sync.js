/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 22:30:54
 * @LastEditors: your name
 * @Description: 同步所有模型
 */
require('./Admin')
require('./Book')
require('./Class')
require('./Student')
const sequelize = require('./db')
/**
 * 将检查数据库中标的当前状态（它具有那些列，它们的数据类型等），
然后再表中进行必要的更改以使其与模型匹配
 */
sequelize.sync({ alter: true }).then(() => {
  console.log('所有模型同步完成...');
})