/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-10 17:43:00
 * @LastEditors: your name
 * @Description: Model student
 */
const { Op } = require('sequelize')
const validate = require('validate.js');
const moment = require('moment');
const { pick } = require('../utils/propertyHelper')
const Student = require("../models/Student");
const Class = require("../models/Class");

exports.addStudent = async function (stuObj) {
  // 验证传入的属性
  stuObj = pick(stuObj, "name", "birthday", "sex", "mobile", "ClassId");
  //自定义规则
  validate.validators.classExits = async function (value) {
    const c = await Class.findByPk(value)
    if (c) {
      return
    }
    return "is not exit!"
  }
  // 验证规则
  const rule = {
    name: {
      presence: {
        // 必须有值，‘’也不行
        allowEmpty: false
      },
      type: "string",
      length: {
        minimum: 1,
        maximum: 10
      }
    },
    birthday: {
      presence: {
        allowEmpty: false
      },
      datetime: {
        dateOnly: true,
        earliest: +moment.utc().subtract(100, "y"),
        latest: +moment.utc().subtract(5, 'y')
      }

    },
    sex: {
      presence: true,
      type: "boolean",
    },
    mobile: {
      presence: {
        allowEmpty: false
      },
      format: /1\d{10}/
    },
    ClassId: {
      presence: {
        allowEmpty: false
      },
      type: "integer",
      classExits: true
    }


  }
  // 返回结果正确的话返回undefined，错误则返回错误信息对象
  // const result = validate.validate(stuObj, rule)
  // console.log('result', result);
  await validate.async(stuObj, rule)
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