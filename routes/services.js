const express = require('express');
const query = requrie('./query');
let router = express.Router();
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