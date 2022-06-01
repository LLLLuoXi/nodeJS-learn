/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-01 22:39:04
 * @LastEditors: your name
 * @Description: 处理错误的中间件
 */
module.exports = (err, req, res, next) => {
  if (err) {
    // 发生了错误
    res.status(500).send({
      code: 500,
      msg: err instanceof Error ? err.message : err
    })
  } else {
    next()
  }
}