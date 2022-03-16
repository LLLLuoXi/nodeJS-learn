const net = require('net');
const server = net.createServer();

server.listen(9527); // 服务器监听9527端口
server.on('listening', () => {
  console.log('server listen 9527');
});

server.on('connection', (socket) => {
  console.log('有客户端连接到服务器');

  socket.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
    socket.write(`HTTP/1.1 200 OK

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>你好啊</h1>
    <script src="./run.js"></script>
  </body>
</html>
`);
    socket.end();
  });

  socket.on('end', () => {
    console.log('连接关闭了');
  });
});

// 浏览器首先会发送一个测试连接
