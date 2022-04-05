/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-05 10:16:16
 * @LastEditors: your name
 * @Description: Model student
 */

const Student = require("../models/Student");
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