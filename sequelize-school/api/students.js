/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-02 23:10:07
 * @LastEditors: your name
 * @Description: 
 */
const express = require('express');
const stuServ = require('../services/studentService')
const { asyncHandler } = require("../utils/getSendResult")


const router = express.Router();

// 分页获取学生
router.get("/",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || ""
    return await stuServ.getStudents(page, limit, sex, name)
  })
)

// 获取单个学生
router.get("/:id", asyncHandler(async (req, res) => {
  return await stuServ.getStudentById(req.params.id)
}))

// 添加一个学生
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuServ.addStudent(req.body);
  })
);

router.delete("/:id",
  asyncHandler(async (req, res) => {
    return await stuServ.deleteStudent(req.params.id);
  })
)

router.put("/:id",
  asyncHandler(async (req, res) => {
    return await stuServ.updateStudent(req.params.id, req.body);
  })
)

module.exports = router;