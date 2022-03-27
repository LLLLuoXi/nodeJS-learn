/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-27 22:57:45
 * @LastEditors: your name
 * @Description: 
 */
const Koa = require('koa')
const Router = require('koa-router')
const server = require('koa-static')
const path = require('path')
const multiparty = require('multiparty')

const app = new Koa()
const router = new Router()

router.post('/upload', async (ctx) => {
  const form = new multiparty.Form({
    uploadDir: 'temp'
  })
  form.parse(ctx.req)
  form.on('file', () => {
    console.log('上传成功');

  })
  ctx.response.body = "上传成功"
})

app.use(router.routes())
app.use(server(path.join(__dirname, '/public')))

app.listen(3000, () => {
  console.log('server listening on port 3000');
})