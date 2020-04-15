const express = require('express');
const query = require('./query.js');
let router = express.Router();
let toJson = require('../apis/toJson');
module.exports = router;
router.get('/services',(req,res,next)=>{
  var result = {}
  // 获取服务页面展示信息
  let sql1 = 'SELECT id,works,services FROM dec_services';
  // 获取服务页面为什么选择我们的展示信息
  let sql2 = 'SELECT cid,title,decs FROM dec_choose';
  try {
    (async function () {
      var result1 = await Promise.all([
        query(sql1).then(res => {
          let works = {};
          let services =[]
          works = toJson(res[0].works)
          // console.log(pics,typeof(pics))
          res[0].works = works;
          services = res[0].services.split(',')
          res[0].services = services;        
          result.aboutpic = res
        }),
        query(sql2).then(res => {
          result.company = res
        })
      ])
      res.send(result)
    })()

  } catch (error) {
    next(error)
    return
  }
})