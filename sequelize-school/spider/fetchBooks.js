/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-06 18:42:05
 * @LastEditors: your name
 * @Description: 抓取豆瓣图书
 */


const axios = require('axios').default
const cheerio = require('cheerio')
const Book = require('../models/Book')
/**
 * 描述 抓取豆瓣读书中的源代码
 * @date 2022-04-06
 * @returns {any}
 */
async function getBooksHtml() {
  const resp = await axios.get("https://book.douban.com/latest")
  return resp.data
}

/**
 * 描述 得到一个书籍详情页链接数组
 * @date 2022-04-06
 * @returns {any}
 */
async function getBookLinks() {
  const html = await getBooksHtml()
  const $ = cheerio.load(html)
  const achorElements = $("#content .grid-16-8 li div.media__img a")
  // console.log(achorElements.length);
  const links = achorElements.map((i, ele) => {
    const href = ele.attribs["href"]
    // console.log(href);
    return href
  }).get()
  return links
}

/**
 * 描述 根据书籍详情页的地址，得到该书籍的详细信息
 * @date 2022-04-06
 * @param {any} detaiUrl
 * @returns {any}
 */
async function getBookDetail(detaiUrl) {
  const resp = await axios.get(detaiUrl)
  const $ = cheerio.load(resp.data)
  const name = $('h1').text().trim()
  const imgurl = $('#mainpic .nbg img').attr('src')
  const spans = $('#info span.pl')
  const authorSpan = spans.filter((i, ele) => {
    return $(ele).text().includes('作者')
  })
  const author = authorSpan.next('a').text()
  const publishSpan = spans.filter((i, ele) => {
    return $(ele).text().includes('出版年')
  })
  const publishDate = publishSpan[0].nextSibling.nodeValue.trim()
  return {
    name,
    imgurl,
    publishDate,
    author
  }
}

/**
 * 描述 获取所有书籍的信息
 * @date 2022-04-06
 * @returns {any}
 */
async function fetchAll() {
  // 得到书籍详情页链接
  const links = await getBookLinks()
  const proms = links.map((link) => {
    return getBookDetail(link)
  })
  return Promise.all(proms)
}

async function saveToDB() {
  const books = await fetchAll()
  await Book.bulkCreate(books)
  console.log('保证抓取的数据到数据库成功...');
}

saveToDB()