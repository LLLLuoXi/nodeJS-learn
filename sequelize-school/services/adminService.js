/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-10 12:26:03
 * @LastEditors: your name
 * @Description: admin 业务逻辑
 */
// 管理员初始化
// 判断数据库中是够有管理员，如果没有，自动添加一个默认管理员

const md5 = require('md5');
const Admin = require('../models/Admin')
exports.addAdmin = async function (adminObj) {
  adminObj.loginPwd = md5(adminObj.loginPwd)
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
  if (adminObj.loginPwd) {
    adminObj.loginPwd = md5(adminObj.loginPwd)
  }
  const result = await Admin.update(adminObj, {
    where: {
      id
    }
  })
  return result
}

exports.login = async function (loginId, loginPwd) {
  loginPwd = md5(loginPwd)
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd
    }
  })
  if (result && result.loginId === loginId) {
    return result.toJSON()
  }
  return null
}

// 查询语句
exports.getAdminById = async function (id) {
  const result = await Admin.findByPk(id)
  if (result) {
    return result.toJSON()
  }
  return null
}

exports.getAdmins = async function () {
  const result = await Admin.findAll()
  return JSON.parse(JSON.stringify(result));
}