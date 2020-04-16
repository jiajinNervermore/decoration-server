const express = require('express');
const query = require('./query.js');
let router = express.Router();
module.exports = router;


router.get('/gallery', (req, res, next) => {
  var result = {}
  // 获取画廊厨房和浴室页面展示信息
  let sql1 = 'SELECT kid,pic,galId,fTime FROM dec_kitchen_bath';
  // 获取画廊客厅信息
  let sql2 = 'SELECT lid,pic,galId,fTime FROM dec_livingroom';
  // 获取画廊卧室信息
  let sql3 = 'SELECT bid,pic,galId,fTime FROM dec_bedroom';
  try {
    (async function () {
      var result1 = await Promise.all([
        query(sql1).then(res => {
          result.kitchenBath = res
        }),
        query(sql2).then(res => {
          result.livingroom = res
        }),
        query(sql3).then(res => {
          result.bedroom = res
        })
      ])
      res.send(result)
    })()

  } catch (error) {
    next(error)
    return
  }
})
router.post('/room', (req, res, next) => {
  
  let galId = req.body.galId;
  
  if (!galId) {
    let output = {
      code: 401,
      msg: 'galId required'
    }
    res.send(output)
    return
  }
  if (galId == 1) {
    //单独查询厨房与浴室的数据
    let sql = 'SELECT kid,pic,galId,fTime FROM dec_kitchen_bath';
    query(sql, (err, result) => {
      if (err) {
        next(err)
        return
      }
      res.send(result)
    })
  }
  if (galId == 2) {
    //单独查询客厅的数据
    let sql = 'SELECT lid,pic,galId,fTime FROM dec_livingroom';
    query(sql, (err, result) => {
      if (err) {
        next(err)
        return
      }
      res.send(result)
    })
  }
  if (galId == 3) {
    //单独查询卧室的数据
    let sql = 'SELECT bid,pic,galId,fTime FROM dec_bedroom';
    query(sql, (err, result) => {
      if (err) {
        next(err)
        return
      }
      res.send(result)
    })
  }
})