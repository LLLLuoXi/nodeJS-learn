/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-13 11:27:01
 * @LastEditors: your name
 * @Description: 
 */

const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, './myFile/text.txt')

async function test() {
    // await fs.promises.writeFile(fileName, "写入的内容", {
    //     flags: "a"  // 表示追加内容
    // })
    const result = await require('./isExists')(fileName)
    console.log(result);
}
test()
