/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-02 21:19:29
 * @LastEditors: your name
 * @Description: 
 */
// const sequelize = require('./models/db')
// console.log('sequelize', sequelize);

// // 测试连接
// async function run() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// }

// run();

require('./models/sync')