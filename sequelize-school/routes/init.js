/*
 * @Author: luoxi
 * @LastEditTime: 2022-06-02 00:04:40
 * @LastEditors: your name
 * @Description: 
 */
const express = require('express')
const path = require('path')
// 创建一个express应用
const app = express();

// app实际上是一个函数，用于处理请求的函数
// 配置一个请求映射，如果请求方法和请求路径均满足匹配，交给处理函数进行处理
// app.请求方法（“请求路径”，处理函数）
// app.get("/abc/:id", (req, res) => {
//   console.log("请求头", req.headers)
//   console.log("请求路径", req.path)
//   console.log("请求参数", req.query)
//   console.log("params", req.params)

//   // 响应
//   res.setHeader('a', "123")
//   res.send("<h1>你好啊！</h1>")
//   // res.status(302).header("location", "https://www.baidu.com").end()
//   // REST风格的API接口 用请求方法区分不同的请求 方便记忆区分
//   res.redirect("https://www.baidu.com", 302)
// })


// app.get('/news', (req, res, next) => {
//   console.log('handle1');
//   // 交给后续处理函数
//   next(new Error('abc'))
// })

// app.get('/news', (req, res, next) => {
//   console.log('handle3');
//   next()
// })

// 
/**
 * 当请求时，会根据请求路径（req.path），从指定的目录中寻找是否存在改文件，若存在，直接响应文件内容，而不再移交给后续的中间件处理
 * 如果不存在文件，则直接移交给后续的中间件处理
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件
 */
app.use(express.static(path.resolve(__dirname, "../public")))
// 能匹配 /news /new/abc /news/123 /news/ad/asd
// 不能匹配 /n  /newsdwdwd

app.use(express.urlencoded({
  extended: true
}))
// app.use(require("./myUrlencoded"))
app.use(express.json())
app.post("/api/student", (req, res) => {
  console.log(req.body);
})
app.use("/news", require('./errorMiddleware'))

const port = 5007;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});