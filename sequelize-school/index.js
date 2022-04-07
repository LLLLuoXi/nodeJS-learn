/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-07 22:23:53
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

// 模型同步
// require('./models/sync')

// 增加
// const Admin = require('./models/Admin')

// // 同步方法，构建一个模型实例
// // const ins = Admin.build({
// //   loginId: 'test',
// //   loginPwd: '123'
// // });

// // ins.loginId = 'test1';
// // ins.save().then(() => {
// //   console.log('新建管理员成功...');
// // })

// Admin.create({
//   loginId: 'admin-t',
//   loginPwd: '12356',
//   name: 'admin1'
// }).then((ins) => {
//   console.log(ins.id, ins.loginId, ins.loginPwd);
// })


// const adminServ = require('./services/adminService')

// adminServ.addAdmin({
//   loginId: 'bcd',
//   loginPwd: '12356',
//   name: 'bcd'
// })

// adminServ.updateAdmin(2, {
//   name: '哈哈哈'
// })

require('./models/relation')
// require('./mock/mockStudent')
// require('./spider/fetchBooks')

// 查询
// const adminService = require('./services/adminService')
// adminService.login('bcd', '12356').then(res => {
//   console.log(res);
// })
// adminService.getAdminById(1).then(res => {
//   console.log(res);
// })

const studentService = require('./services/studentService')
studentService.getStudents(1, 10, false, '秀').then(res => {
  console.log(res);
  // include 链表的信息
  console.log(res.datas[0].Class.name);
})

