// nodejs搭建一个服务器

const http = require('http');

function handleRequest(req) {
  console.log('有请求进来了');
  console.log('请求地址：', req.url);
  console.log('请求方法：', req.method);
  const url1 = new URL(req.url, `http://${req.headers.host}`);
  console.log(url1);
  // 请求体
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString('utf-8');
  });
  req.on('end', () => {
    console.log('请求体', body);
  });
}

const server = http.createServer((req, res) => {
  handleRequest(req);
  res.setHeader('a', '1');
  res.setHeader('b', '2');
  // res.statusCode = 404
  res.write('hello');
  res.end();
});

server.listen(9527);
server.on('listening', () => {
  console.log('server is listening on 9527');
});
