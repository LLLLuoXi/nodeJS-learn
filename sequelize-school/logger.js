/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-17 16:39:39
 * @LastEditors: your name
 * @Description: log4 日志记录
 */

const log4js = require('log4js')
const path = require('path')
log4js.configure({
  appenders: {
    sql: {
      // 定义一个sql日志出口
      type: "dateFile",
      filename: path.resolve(__dirname, "logs", 'sql', "logging.log"),
      // 文件的最大字节数
      maxLogSize: 1024 * 1024,
      keepFileExt: true,
      layout: {
        type: "pattern",
        pattern: "🗨️ %c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
      }
    },
    default: {
      type: "stdout",
      // filename: path.resolve(__dirname, "logs", 'default', "logging.log")
    }

  },
  categories: {
    sql: {
      // 该分类使用出口sql的配置写入日志
      appenders: ['sql'],
      level: "all",
    },
    default: {
      // 该分类使用默认出口的配置写入日志
      appenders: ['default'],
      level: "all"
    }
  }
})

process.on("exit", () => {
  log4js.shutdown()
})

const sqlLogger = log4js.getLogger("sql")
const defaultLogger = log4js.getLogger("")

exports.sqlLogger = sqlLogger
exports.defaultLogger = defaultLogger
