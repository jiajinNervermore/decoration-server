const express = require('express');
const query = require('./query.js');
let router = express.Router();
let toJson = require('../apis/toJson')
module.exports = router;

router.get('/about',(req,res,next)=>{
  var result = {}
  // 获取画廊
  let sql1 = 'SELECT aid,pics from dec_aboutpic';
  // 获取公司信息
  let sql2 = 'SELECT cid,uname,pics,decs,title,addr,wechat,qq,phone,email,weibo FROM dec_company';
  // 获取公司设计师信息
  let sql3 = 'SELECT id,uname,title,descs,pic,wechat,qq,email,weibo,phone FROM dec_designer';
  // 获取公司团队信息
  let sql4 = 'SELECT tid,uname,title,descs,pic FROM dec_team';
  
  try {
    (async function () {
      var result1 = await Promise.all([
        query(sql1).then(res => {
          let pics = {}
          pics = toJson(res[0].pics)
          // console.log(pics,typeof(pics))
          res[0].pics = pics
          result.aboutpic = res
        }),
        query(sql2).then(res => {
          let pics1 = {}
          pics1 = toJson(res[0].pics)
          // console.log(pics,typeof(pics))
          res[0].pics = pics1
          result.company = res
        }),
        query(sql3).then(res => {
          result.designer = res
        }),
        query(sql4).then(res => {
          result.team = res
        })
      ])
      res.send(result)
    })()

  } catch (error) {
    next(error)
    return
  }
})