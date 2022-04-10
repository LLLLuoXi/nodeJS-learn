/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-10 17:42:16
 * @LastEditors: your name
 * @Description: 
 */

/**
 * 描述 挑选对象（obj）的属性
 * @date 2022-04-10
 * @param {any} obj
 * @param {any} ...props
 * @returns {any}
 */
exports.pick = function (obj, ...props) {
  if (!obj || typeof obj !== 'object') return
  const newObj = {};
  for (const key in obj) {
    if (props.includes(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}