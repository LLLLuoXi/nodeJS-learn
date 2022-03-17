// nodejs作为客户端如何收到服务器的响应结果

const http = require('http');

const request = http.request(
  'http://www.baidu.com/',
  {
    method: 'GET',
  },
  (resp) => {
    console.log('服务器响应的状态码:', resp.statusCode);
    console.log('服务器响应头:', resp.headers['content-type']);
    // console.log('服务器响应体:', resp.headers['content-type']);
    let result = '';
    resp.on('data', (chunk) => {
      result += chunk.toString('utf-8');
    });
    resp.on('end', (chunk) => {
      console.log(result);
    });
  }
);

// request 是一个可写流
request.end(); // 消息体结束
