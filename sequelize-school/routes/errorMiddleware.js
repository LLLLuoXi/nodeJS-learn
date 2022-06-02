/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-02 22:56:02
 * @LastEditors: your name
 * @Description: 处理错误的中间件
 */
const { getErr } = require('../utils/getSendResult')

module.exports = (err, req, res, next) => {
  if (err) {
    const errObj = err instanceof Error ? err.message : err;
    //发生了错误
    res.status(500).send(getErr(errObj));
  } else {
    next();
  }
};