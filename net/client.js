const net = require('net');
const socket = net.createConnection(
  {
    host: 'baidu.com',
    port: 80,
  },
  () => {
    console.log('连接成功');
  }
);

let recieve = null;
/**
 * 描述 提炼出响应字符串的消息头和消息体
 * @date 2022-03-16
 * @param {any} response
 * @returns {any}
 */
function parseHeader(response) {
  const index = response.indexOf('\r\n\r\n');
  console.log('index', index);
  const head = response.substring(0, index);
  const headPart = head.split('\r\n');
  const headArray = headPart.slice(1).map((str) => {
    return str.split(':').map((s) => s.trim());
  });
  const body = response.substring(index + 2);
  const header = headArray.reduce((a, b) => {
    a[b[0]] = b[1];
    return a;
  }, {});
  console.log('head', header);
  console.log('body', body.trimStart());

  return {
    header,
    body: body.trimStart(),
  };
}

function isOver() {
  // 需要接收的消息体的总字节数
  const contentLength = recieve.header['Content-Length'];
  // 当前接收到的字节数
  const curReceivedLength = Buffer.from(recieve.body, 'utf-8').byteLength;
  console.log(contentLength, curReceivedLength);
  return curReceivedLength > contentLength;
}

socket.on('data', (chunk) => {
  const response = chunk.toString('utf-8');
  if (!recieve) {
    // 第一次解析
    recieve = parseHeader(response);
    if (isOver()) {
      socket.end();
    }
    return;
  }
  // 不是第一次
  recieve.body += response;
  if (isOver()) {
    socket.end();
    return;
  }
});

socket.write(`GET / HTTP/1.1
Host: baidu.com
Connection: keep-alive

`); // 不满足http协议的字符串

socket.on('close', () => {
  console.log(recieve.body);
  console.log('结束了');
});

// --------------------------------
// 客户端跟远程主机连接之后会得到一个文件叫socket，跟网卡关联到一起的，在里面写内容，会通过TCP/IP连接传输到远程主机。
// socket 在node中表现为一个双工流对象
//
