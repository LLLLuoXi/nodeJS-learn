/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-02 22:57:05
 * @LastEditors: your name
 * @Description: 
 */

exports.getErr = function (err = "server internal error", errCode = 500) {
  return {
    code: errCode,
    mes: err
  }
}

exports.getResult = function (result) {
  return {
    code: 0,
    masg: '',
    data: result
  }
}

// 返回一个try catch包装的异步函数
exports.asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send(exports.getResult(result));
    } catch (err) {
      next(err);
    }
  };
};