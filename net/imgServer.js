/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-16 21:22:12
 * @LastEditors: your name
 * @Description: 用net模块创建一个图片服务器
 */

const net = require('net');
const path = require('path');
const fs = require('fs');
const server = net.createServer();

server.listen(9527); // 服务器监听9527端口
server.on('listening', () => {
  console.log('server listen 9527');
});

server.on('connection', (socket) => {
  console.log('有客户端连接到服务器');

  socket.on('data', async (chunk) => {
    // console.log(chunk.toString('utf-8'));
    const filename = path.resolve(__dirname, './healthy.png');
    const bodyBuffer = await fs.promises.readFile(filename);
    const headBuffer = Buffer.from(
      `HTTP/1.1 200 OK
Content-Type: image/png

`,
      'utf-8'
    );
    const result = Buffer.concat([headBuffer, bodyBuffer]);
    socket.write(result);
    socket.end();
  });

  socket.on('end', () => {
    console.log('连接关闭了');
  });
});

// 浏览器首先会发送一个测试连接
