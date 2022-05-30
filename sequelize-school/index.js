/*
 * @Author: luoxi
 * @LastEditTime: 2022-05-30 22:02:18
 * @LastEditors: your name
 * @Description:
 */
require('./init')
const express = require('express')
// 创建一个express应用
const app = express();
// app实际上是一个函数，用于处理请求的函数
// 配置一个请求映射，如果请求方法和请求路径均满足匹配，交给处理函数进行处理
// app.请求方法（“请求路径”，处理函数）
app.get("/abc/:id", (req, res) => {
  console.log("请求头", req.headers)
  console.log("请求路径", req.path)
  console.log("请求参数", req.query)
  console.log("params", req.params)

  // 响应
  res.setHeader('a', "123")
  res.send("<h1>你好啊！</h1>")
  // res.status(302).header("location", "https://www.baidu.com").end()
  // REST风格的API接口 用请求方法区分不同的请求 方便记忆区分
  res.redirect("https://www.baidu.com", 302)


})
const port = 5008;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
// const { sqlLogger } = require('./logger')
// sqlLogger.info('luoxi')


// ----------------------测试区域------------------------------------------

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


// 添加管理员
// const adminServ = require('./services/adminService')

// adminServ.addAdmin({
//   loginId: 'test1',
//   loginPwd: '123456',
//   name: 'test1'
// })

// adminServ.updateAdmin(2, {
//   name: '哈哈哈'
// })

// require('./models/relation')
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

// 查询学生数据
// const studentService = require('./services/studentService')
// studentService.getStudents(1, 10, false, '秀').then(res => {
//   console.log(res);
//   // include 链表的信息
//   console.log(res.datas[0].Class.name);
// })


// stuServ.addStudent({
//   name: "luoxi2",
//   birthday: "2015-1-9",
//   sex: true,
//   mobile: "13877995846",
//   ClassId: 50,
//   a: 3
// })
//   .catch(err => {
//     console.log(err);
//   })

// const stuServ = require('./services/studentService')
// stuServ.getStudents().then(res => {
//   console.log(res);
// })