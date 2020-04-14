const express = require('express');
let router = express.Router();
const query = require('./query.js');
module.exports = router;
router.get('/index', (req, res, next) => {
  var result = {}
  // 获取主页背景图
  let sql1 = 'SELECT pic from dec_background';
  // 获取主页设计方案
  let sql2 = 'SELECT id,pic,title,descs FROM dec_scheme';
  // 获取主页各种室内的展示资料
  let sql3 = 'SELECT cid,pic,title,descs FROM dec_classical';
  // 获取主页公司的荣誉展示
  let sql4 = 'SELECT id,title,num FROM dec_interiors';
  //获取主页用户反馈信息展示
  let sql5 = 'SELECT fid,descs,users FROM dec_feedback';
  // 获取主页最新设计的展示信息
  let sql6 = 'SELECT nid,descs,pic FROM dec_newest';
  try {
    (async function () {
      var result1 = await Promise.all([
        query(sql1).then(res => {
          result.background = res
        }),
        query(sql2).then(res => {
          result.scheme = res
        }),
        query(sql3).then(res => {
          result.classical = res
        }),
        query(sql4).then(res => {
          result.feedback = res
        }),
        query(sql5).then(res => {
          result.background = res
        }),
        query(sql6).then(res => {
          result.newest = res
        })
      ])
      // res.set('Access-Control-Allow-Orign','*')
      res.send(result)
    })()

  } catch (error) {
    next(error)
    return
  }
})