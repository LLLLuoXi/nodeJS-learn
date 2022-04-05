/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 09:27:29
 * @LastEditors: your name
 * @Description: admin 业务逻辑
 */
// 管理员初始化
// 判断数据库中是够有管理员，如果没有，自动添加一个默认管理员

const Admin = require('../models/Admin')
exports.addAdmin = async function (adminObj) {
  // 这里应该判断管理员的各种属性是够合理，账号是否已存在
  const ins = await Admin.create(adminObj)
  console.log('新建管理员成功...');
  return ins.toJSON()
}

exports.deleteAdmin = async function (adminId) {
  await Admin.destroy({
    where: {
      id: adminId
    }
  })
}

exports.updateAdmin = async function (id, adminObj) {
  // const ins = await Admin.findByPk(id)
  // ins.name = adminObj.name
  // ins.save()

  // 方式2
  Admin.update(adminObj, {
    where: {
      id
    }
  })
}