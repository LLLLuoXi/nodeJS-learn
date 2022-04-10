/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-10 16:43:18
 * @LastEditors: your name
 * @Description: 初始化操作
 */
const moment = require('moment')
const validate = require('validate.js');
validate.extend(validate.validators.datetime, {
  /**
   * 描述 会在验证时自动触发，需要将任何数据转换为时间戳返回
   * @date 2022-04-10
   * @param {any} value 传入要转换的值
   * @param {any} options 针对某个属性的验证配置
   * @returns {any}
   */
  parse(value, options) {
    let formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x']
    if (options.dateOnly) {
      formats = ['YYYY-MM-DD', 'YYYY-M-D', 'x']
    }
    return +moment.utc(value, formats, true)

  },

  /**
   * 描述 用户显示错误消息时，使用的显示字符串
   * @date 2022-04-10
   * @param {any} value
   * @param {any} options
   * @returns {any}
   */
  format(value, options) {
    let formats = 'YYYY-MM-DD'
    if (!options.dateOnly) {
      formats += 'HH:mm:ss'
    }
    return moment.utc(value).format(formats)
  }
})