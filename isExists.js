/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-13 11:25:36
 * @LastEditors: your name
 * @Description: 
 */
const fs = require('fs');

module.exports = async function exists(filename) {
  try {
    await fs.promises.stat(filename)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') {
      // 文件不存在
      return false
    }
  }
  throw err
}
