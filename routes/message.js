const express = require("express");
let router = express.Router();
let bubble = require("../apis/bubble");
let distinct = require("../apis/distinct");
const query = require("./query.js");
module.exports = router;
router.post("/addMessage", (req, res, next) => {
  let fromuid = req.body.fromuid;
  let uname = req.body.uname;
  let avatar = req.body.avatar;
  if (!fromuid) {
    let output = {
      code: 401,
      msg: "fromuid required",
    };
    res.send(output);
    return;
  }
  let touid = req.body.touid;
  let mes = req.body.mes;
  if (!mes) {
    let output = {
      code: 402,
      msg: "mes required",
    };
    res.send(output);
    return;
  }
  let fTime = Date.now();
  let files = req.body.files;
  let sql =
    "insert into dec_message(fromuid,uname,avatar,touid,mes,fTime,files) values(?,?,?,?,?,?,?)";
  try {
    query(sql, [fromuid, uname, avatar, touid, mes, fTime, files]).then(
      (result) => {
        let output = {
          code: 200,
          msg: "add succ",
          uid: result.insertId, //新插入的用户在数据库中的自增编号
        };
        res.send(output);
      }
    );
  } catch (error) {
    next(error);
  }
});
// 查询所有消息
router.get("/messagelist", (req, res, next) => {
  console.log(req.ip)
  let sql = "select * from dec_message ORDER BY mid DESC LIMIT ?,5";
  let sql2 = "select * from dec_user where uid=?";
  let start = req.query.start;
  if (!start) {
    start = 0;
  } else {
    start = (parseInt(start) - 1) * 5;
  }
  let results = {};
  results.mesUser = [];
  try {
    (async function () {
      await query(sql, start).then((result) => {
        result = bubble(result);
        results.messageList = result;
      });
      var newUserList = [];
      newUserList = distinct(results.messageList);
      if (newUserList.length > 0) {
        // 声明一个新的用户数组保存不重复的用户
        var len = newUserList.length;
        for (var i = 0; i < len; i++) {
          (function (sql2, i, len) {
            query(sql2, [newUserList[i].fromuid]).then((result) => {
              // console.log(cartList)
              // 提前声明一个空数组保存用户信息

              results.mesUser.push(result[0]);
              // 将购物车表里的数量强行赋值到返回数组对象里
              if (i == len - 1) {
                res.send({ code: 200, msg: "查询成功", results });
              }
            });
          })(sql2, i, len);
        }
      } else {
        let output = {
          code: 400,
          msg: "nothing is message",
        };
        res.send(output);
      }
    })();
  } catch (error) {
    next(error);
  }
});
