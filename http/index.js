/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-17 20:51:30
 * @LastEditors: your name
 * @Description: 
 */
// nodejs搭建一个静态资源服务器
// 当客户端请求 http://localhost:9527/index.html -> public/index.html
// 当客户端请求 http://localhost:9527/css/index.css -> public/css/index.css

const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 6100;

async function getStat(filename) {
  try {
    return await fs.promises.stat(filename);
  } catch {
    return null;
  }
}

/**
 * 描述 得到要处理的文件内容;
 * @date 2022-03-17
 * @param {any} url
 * @returns {any}
 */
let reqHeaderHost = null;
async function getFileContent(url) {
  const urlObj = new URL(url, `http://${reqHeaderHost}`);
  let filename; // 要处理的文件路径
  filename = path.resolve(__dirname, 'public', urlObj.pathname.substring(1));
  let stat = await getStat(filename);

  if (!stat) {
    // 文件不存在
    return null;
  } else if (stat.isDirectory()) {
    // 文件是一个目录
    filename = path.resolve(
      __dirname,
      'public',
      urlObj.pathname.substring(1),
      'index.html'
    );
    stat = await getStat(filename);
    if (!stat) {
      // 文件不存在
      return null;
    } else {
      console.log(filename);
      return await fs.promises.readFile(filename);
    }
  } else {
    // 是一个正常文件
    console.log(filename);
    return await fs.promises.readFile(filename);
  }
}

async function handler(req, res) {
  reqHeaderHost = req.headers.host;
  const info = await getFileContent(req.url);
  if (info) {
    res.write(info);
  } else {
    res.statusCode = 404;
    res.write('Resource is not exist');
  }
  res.end();
}

const server = http.createServer(handler);
server.on('listening', () => {
  console.log(`server is listening on ${port}`);
});
server.listen(port);
