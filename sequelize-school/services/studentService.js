/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-07 22:22:25
 * @LastEditors: your name
 * @Description: Model student
 */

const Student = require("../models/Student");
const Class = require("../models/Class");
const { Op } = require('sequelize')

exports.addStudent = async function (stuObj) {
  const ins = await Student.create(stuObj);
  return ins.toJSON();
};

exports.deleteStudent = async function (id) {
  return await Student.destroy({
    where: {
      id,
    },
  });
};

exports.updateStudent = async function (id, obj) {
  return await Student.update(obj, {
    where: {
      id,
    },
  });
};

exports.getStudents = async function (page = 1, limit = 10, sex = -1, name = '') {
  // const result = await Student.findAll({
  //   limit: +limit,
  //   offset: (page - 1) * limit,
  // })
  // console.log('result', result);
  // const total = await Student.count()
  // const data = JSON.parse(JSON.stringify(result))
  // return {
  //   total,
  //   data
  // }

  const condition = {}
  if (sex !== -1) {
    condition.sex = !!sex
  }
  if (name) {
    condition.name = {
      [Op.like]: `%${name}%`
    }
  }

  const { count, rows } = await Student.findAndCountAll({
    attributes: ['id', 'name', 'sex', 'birthday'],
    where: condition,
    include: [Class],
    limit: +limit,
    offset: (page - 1) * limit,
  })
  return {
    total: count,
    datas: JSON.parse(JSON.stringify(rows))
  }
}