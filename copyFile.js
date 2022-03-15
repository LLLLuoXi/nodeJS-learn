/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-15 22:00:38
 * @LastEditors: your name
 * @Description: 解决文件拷贝产生的背压问题
 */

const fs = require('fs');
const path = require('path');

// 
// async function method1() {
//   const from = path.resolve(__dirname, './temp/abc.txt');
//   const to = path.resolve(__dirname, './temp/abc2.txt');
//   console.time('方式1');
//   const content = await fs.promises.readFile(from);
//   await fs.promises.writeFile(to, content);
//   console.log('复制完成...');
//   console.timeEnd('方式1'); // 方式1: 17.665ms 不只是时间的长，而且占用的内存是比较高的
// }

// method1();



// 用流的方式解决背压

function method2() {
  const from = path.resolve(__dirname, './temp/abc.txt');
  const to = path.resolve(__dirname, './temp/abc2.txt');
  const rs = fs.createReadStream(from);
  const ws = fs.createWriteStream(to);

  rs.on('data', (chunk) => {
    // 读到一部分数据
    console.time('方式2');
    const flag = ws.write(chunk);
    if (!flag) {
      //  下一次写入，会产生背压
      rs.pause();
    }
  });

  ws.on('drain', () => {
    // 可以继续读写了
    rs.resume();
  });

  rs.on('close', () => {
    // 写完了
    ws.end();
    console.timeEnd('方式2'); // 方式2: 1.343ms
    console.log('复制完成...');
  });
}

method2();

// 以上代码可以利用rs.pipe()实现;
// function method2() {
//   const from = path.resolve(__dirname, './temp/abc.txt');
//   const to = path.resolve(__dirname, './temp/abc2.txt');
//   const rs = fs.createReadStream(from);
//   const ws = fs.createWriteStream(to);

//   rs.pipe(ws);
// }

// method2();