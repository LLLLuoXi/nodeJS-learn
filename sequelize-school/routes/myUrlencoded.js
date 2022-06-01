/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-02 00:04:21
 * @LastEditors: your name
 * @Description: 
 */
const qs = require('querystring')

module.exports = (req, res, next) => {
  console.log('111');
  console.log(req.headers["content-type"]);
  if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    // 自行解析消息体
    console.log('.....');
    let result = "";
    req.on('data', (chunk) => {
      result += chunk.toString("utf-8");
    })
    req.on('end', () => {
      const query = qs.parse(result)
      console.log('query', query);
      req.body = query;
      next();
    })
  }
  else {
    next();
  }
}