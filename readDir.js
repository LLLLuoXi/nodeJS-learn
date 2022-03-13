/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-13 17:09:11
 * @LastEditors: your name
 * @Description: 读取一个目录中的所有子目录和文件，并返回一个描述信息的对象
 */
const fs = require('fs');
const path = require('path');

class File {
  constructor(filename, name, ext, isFile, size, createTime, updateTime) {
    this.filename = filename;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }

  /**
   * @description: 获取文件的内容
   * @param {*} isBuffer 是否以buffer的形式读取
   * @return {*}
   */
  async getContent(isBuffer = false) {
    if (this.isFile) {
      if (isBuffer) {
        return await fs.promises.readFile(this.filename)
      } else {
        return await fs.promises.readFile(this.filename, "utf-8")
      }
    }
    // 是目录
    return null
  }

  async getChildren() {
    if (this.isFile) {
      return []
    }
    // 是一个目录
    let children = await fs.promises.readdir(this.filename)
    children = children.map(name => {
      const result = path.resolve(this.filename, name)
      return File.getFile(result)
    })
    return Promise.all(children)
  }

  /**
   * @description: 
   * @param {*} filename 文件绝对路径
   * @return {*}  描述文件信息的对象
   */
  static async getFile(filename) {
    const stat = await fs.promises.stat(filename);
    const name = path.basename(filename);
    const ext = path.extname(filename);
    const isFile = stat.isFile();
    const size = stat.size;
    const createTime = new Date(stat.birthtime)
    const updateTime = new Date(stat.mtime)

    return new File(filename, name, ext, isFile, size, createTime, updateTime);
  }
}

// async function test() {
//   const filename = path.resolve(__dirname, './myFile/text.txt')
//   const filename1 = path.resolve(__dirname, './myFile')
//   const file = await File.getFile(filename)
//   const file1 = await File.getFile(filename1)
//   console.log(await file.getContent());
//   console.log(await file.getChildren());
//   console.log(await file1.getChildren());
// }

// test()




/**
 * @description: 读取一个目录中的所有子目录和文件，并返回一个描述信息的对象
 * @param {*} dirname 目录名字
 * @return {*}
 */
module.exports = async function readDir(dirname) {
  const file = await File.getFile(dirname);
  return await file.getChildren()
}