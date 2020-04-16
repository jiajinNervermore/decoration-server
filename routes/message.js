const express = require('express');
let router = express.Router();
const query = require('./query.js');
module.exports = router;
router.post('/message', (req, res, next) => {
  let fromuid = req.body.fromuid;
  if(!fromuid){
    let output = {
      code : 401,
      msg : 'fromuid required'
    }
    res.send(output)
    return
  }
  let touid = req.body.touid;
  let mes = req.body.mes;
  if(!mes){
    let output = {
      code : 402,
      msg : 'mes required'
    }
    res.send(output)
    return
  }
  let fTime = Date.now();
  let files = req.body.files;
  let sql = 'insert into dec_message(fromuid,touid,mes,fTime,files) values(?,?,?,?,?)';
  try {
    query(sql,[fromuid,touid,mes,fTime,files]).then(result => {
      let output = {
        code: 200,
        msg: 'send succ',
        uid: result.insertId		//新插入的用户在数据库中的自增编号
      }
      res.send(output)
    })
  } catch (error) {
    next(error)
  }
})