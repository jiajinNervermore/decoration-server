const express = require('express');
// const query = require('./query.js');
const pool = require('../pool.js')
let router = express.Router();
const multer = require('multer')
const fs = require('fs')
module.exports = router;
router.post('/register', (req, res, next) => {
  //1.接收客户端提交的请求数据
  // console.log(req.body)
  let sign = req.body.sign;
  let fTime = Date.now()
  let uname = req.body.uname
  if (!uname) {
    let output = {
      code: 401,
      msg: 'uname required'
    }
    res.send(output)
    return
  }
  let upwd = req.body.upwd
  if (!upwd) {
    let output = {
      code: 402,
      msg: 'upwd required'
    }
    res.send(output)
    return
  }
  let email = req.body.email
  if(!email){
    let output = {
      code: 405,
      msg: 'email required'
    }
    res.send(output)
    return 
  }
  let phone = req.body.phone
  if (!phone) {
    let output = {
      code: 403,
      msg: 'phone required'
    }
    res.send(output)
    return
  }
  let captcha = req.body.captcha;
  // console.log('需要进行比对的服务器端验证码: ', req.session.registerCaptcha)
  if (!captcha) {
    let output = {
      code: 404,
      msg: 'captcha required'
    }
    res.send(output)
    return
  } else if (captcha.toLowerCase() != req.session.registerCaptcha) {
    // console.log(captcha,req.session.registerCaptcha)
    let output = {
      code: 405,
      msg: 'captcha error'
    }
    res.send(output)
    return
  }
  //用户输入的验证码验证通过 每个验证码只能使用一次，必须清除服务器端保存的验证码
  delete req.session.registerCaptcha
  //2.执行数据库插入操作
  let sql1 = 'SELECT uid FROM dec_user WHERE uname=? OR phone=?'  //查询uname和phone是否已经存在了
  pool.query(sql1, [uname, phone], (err, result) => {
    if (err) {
      next(err)
      return
    }
    if (result.length > 0) {	//根据客户端提交的uname和phone查询到相关记录
      let output = {		//uname或phone已被占用，则不再继续执行插入操作
        code: 400,
        msg: 'uname or phone already  taken'
      }
      res.send(output)
      return
    }
    if (!sign) {
      var sql2 = "INSERT INTO dec_user(uname,upwd,phone,email,fTime) VALUES(?,?,?,?,?)"
      pool.query(sql2, [uname, upwd, phone, email,fTime], (err, result) => {
        if (err) {
          next(err)
          return
        }
        //3.向客户端输出响应消息
        let output = {
          code: 200,
          msg: 'register succ',
          uid: result.insertId		//新插入的用户在数据库中的自增编号
        }
        res.send(output)
      })
    } else {
      var sql2 = "INSERT INTO dec_root(uname,upwd,phone,dep,position,fTime) VALUES(?,?,?,?,?,?)"
      pool.query(sql2, [uname, upwd, phone, dep, position, fTime], (err, result) => {
        if (err) {
          next(err)
          return
        }
        //3.向客户端输出响应消息
        let output = {
          code: 200,
          msg: 'register succ',
          uid: result.insertId		//新插入的用户在数据库中的自增编号
        }
        res.send(output)
      })
    }

  })

})
router.post('/query',(req,res,next)=>{
  // console.log(req.body)
  let uid = req.body.uid
  let sql = 'select * from dec_user where uid=?'
  pool.query(sql,uid,(err,result)=>{
    if(err){
      // next(err)
      throw err
      return 
    }
    if(result.length>0){
      let output = {
        code : 200,
        msg : 'succ',
        data:result[0]
      }
      res.send(output)
    }else{
      let output = {
        code : 401,
        msg : 'failed'
      }
      res.send(output)
    }
  })
})
router.post('/login', (req, res, next) => {
  //1.读取客户端提交的请求数据 
  let sign = req.body.sign
  let uname = req.body.uname
  if (!uname) {
    let output = {
      code: 401,
      msg: 'uname required'
    }
    res.send(output)
    return
  }
  let upwd = req.body.upwd
  if (!upwd) {
    let output = {
      code: 402,
      msg: 'upwd required'
    }
    res.send(output)
    return
  }
  if (sign) {
    var sql = "SELECT * FROM dec_root WHERE uname=? AND upwd=?"
  } else {
    //2.执行数据库查询操作
    var sql = "SELECT uid,uname,avatar,email,phone FROM dec_user WHERE uname=? AND upwd=?"
  }
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) {
      next(err)
      return
    }
    if (result.length === 0) {	//根据uname和upwd没查询到数据
      let output = {
        code: 400,
        msg: 'uname or upwd error'
      }
      res.send(output)
    } else {						//根据uname和upwd查询到了相关用户信息
      let output = {
        code: 200,
        msg: 'login succ',
        userInfo: result[0]		//登录成功后，把当前用户的信息返回给客户端
      }
      res.send(output)
      // 在当前客户端保存在服务器上的session空间内存储自己的数据
      req.session.userInfo = result[0]
      req.session.save()		//手工保存session中数据的修改
    }
  })
  //3.向客户端输出响应结果
})
router.post('/update', (req, res, next) => {
  
  //1.接收客户端提交的请求数据
  let sign = req.body.sign;
  let avatar = req.body.avatar;
  let uid = req.body.uid;
  if(!uid){
    let output = {
      code:406,
      msg: 'uid required'
    }
    res.send(output)
    return
  }
  let uname = req.body.uname
  if (!uname) {
    let output = {
      code: 401,
      msg: 'uname required'
    }
    res.send(output)
    return
  }
  let upwd = req.body.upwd
  if (!upwd) {
    let output = {
      code: 402,
      msg: 'upwd required'
    }
    res.send(output)
    return
  }
  let email = req.body.email
  if(!email){
    let output = {
      code: 405,
      msg: 'email required'
    }
    res.send(output)
    return 
  }
  let phone = req.body.phone
  if (!phone) {
    let output = {
      code: 403,
      msg: 'phone required'
    }
    res.send(output)
    return
  }
  //2.执行数据库插入操作
 

  let sql1 = 'SELECT * FROM dec_user WHERE uid=?'  //查询uid否已经存在了
  pool.query(sql1, uid,(err, result) => {
    if (err) {
      next(err)
      return
    }
    if (result.length == 0) {	//根据客户端提交的uname和phone查询到相关记录
      let output = {		//uname或phone已被占用，则不再继续执行插入操作
        code: 400,
        msg: 'uid required 请重新登录'
      }
      res.send(output)
      return
    }
    if (!sign) {
      var sql2 = "UPDATE dec_user SET upwd=?,avatar=?,phone=?,email=? WHERE uid=?"
      pool.query(sql2, [ upwd, avatar,phone, email,uid], (err, result) => {
        if (err) {
          next(err)
          return
        }
        //3.向客户端输出响应消息
        let output = {
          code: 200,
          msg: 'update succ'		//新插入的用户在数据库中的自增编号
        }
        res.send(output)
      })
    } else {
      var sql2 = "UPDATE dec_root SET upwd=?,avatar=?,phone=?,email=? WHERE uid=?"
      pool.query(sql2, [upwd,avatar, phone, email,uid], (err, result) => {
        if (err) {
          next(err)
          return
        }
        //3.向客户端输出响应消息
        let output = {
          code: 200,
          msg: 'update succ',
          uid: result.insertId		//新插入的用户在数据库中的自增编号
        }
        res.send(output)
      })
    }

  })

})
router.get('/check_uname', (req, res, next) => {
  //1.读取客户端提交的请求数据——服务器端验证
  
  let uname = req.query.uname
  // console.log(uname)
  if (!uname) {				//如果客户端未提交uname
    let output = {
      code: 400,
      msg: 'uname required'
    }
    res.send(output)  	//发送错误提示
    return				//终止请求的处理
  }
  //2.执行数据库查询操作
  let sql = 'SELECT uid FROM dec_user WHERE uname=?'
  pool.query(sql, uname, (err, result) => {
    if (err) {
      //throw err		//在开发测试阶段可用，但是正式上线的项目决不能使用！！
			/*				//每个请求都手工编写错误处理太麻烦了！
			let output = {code:500}	
			res.send(output)
			return
			*/
      next(err)		//把所有的错误都交给下一个“错误处理中间件”来处理
      return			//手工终止当前的路由处理过程
    }
    //3.向客户端输出响应消息			//对于SELECT语句，result永远是个数组
    if (result.length === 0) {		//根据用户名没有查询到记录
      let output = {
        code: 401,
        msg: 'non-exists'
      }
      res.send(output)
    } else {							//根据用户名查询到了记录
      let output = {
        code: 200,
        msg: 'exists'
      }
      res.send(output)
    }
  })
})

router.get('/check_phone', (req, res, next) => {
  //1.读取客户端提交的请求数据——服务器端验证
  let phone = req.query.phone
  // console.log(phone)
  if (!phone) {				//如果客户端未提交uname
    let output = {
      code: 400,
      msg: 'phone required'
    }
    res.send(output)  	//发送错误提示
    return				//终止请求的处理
  }
  //2.执行数据库查询操作
  let sql = 'SELECT rid FROM dec_root WHERE phone=?';
  pool.query(sql, phone, (err, result) => {
    if (err) {
      throw err		//在开发测试阶段可用，但是正式上线的项目决不能使用！！
			/*				//每个请求都手工编写错误处理太麻烦了！
			let output = {code:500}	
			res.send(output)
			return
			*/
      // next(err)		//把所有的错误都交给下一个“错误处理中间件”来处理
      return			//手工终止当前的路由处理过程
    }
    //3.向客户端输出响应消息			//对于SELECT语句，result永远是个数组
    if (result.length === 0) {		//根据用户名没有查询到记录
      let output = {
        code: 401,
        msg: 'non-exists'
      }
      res.send(output)
    } else {							//根据用户名查询到了记录
      let output = {
        code: 200,
        msg: 'exists'
      }
      res.send(output)
    }
  })
});
const svgCaptcha = require('svg-captcha');
router.get('/register/captcha', (req, res, next) => {

  let options = {
    size: 5,
    color: true,
    ignoreChars: 'OolIzZ',
    background: '#c1eebd'
  }
  let captcha = svgCaptcha.create(options);
  // console.log(captcha,req.session)
  // 1.在服务器端会话中存储此时生成的验证码文本
  req.session.registerCaptcha = captcha.text.toLowerCase();
  // console.log('刚刚生成的服务器端验证码:',  req.session.registerCaptcha)
  // 2. 向客户端输出此验证码图片的内容
  res.type('svg')//修改 Content-Type : image/svg+xml
  res.send(captcha.data)
})
let upload = multer({
  dest: "./temp/",//destination 客户端上传的文件临时存储
})
router.post('/upload/avatar', upload.single('avatar'), (req, res, next) => {
  //使用第三方中间件处理客户端上传的文件
  // console.log(req.body, req.file)//客户端提交的文本域/文件域
  //在req.file 属性中已经保存了客户端提交上来 的文件信息——保存在临时文件目录
  //把临时目录下的且没有后缀的文件转存到另一个有实际意义目录下
  let oldName = req.file.path
  let newName = genaerateNewFilePath(req.file.originalname)
  fs.rename(oldName, newName, (err) => {
    if (err) {
      next(err)
      return
    }
    // console.log(1)
    let output = {
      code: 200,
      msg: 'upload succ',
      fileName: newName
    }
    res.send(output)
  })
})
// 更改用户头像
router.post('/update/avatar',(req,res,next)=>{
  // console.log(req.body)
  let uid = req.body.uid;
  let avatar = req.body.avatar;
  if(!uid){
    let output = {
      code:401,
      msg:'uid required'
    }
    res.send(output)
    return
  }
  if(!avatar){
    let output = {
      code:402,
      msg:'avatar required'
    }
    res.send(output)
    return
  }
  let sql = "UPDATE dec_user SET avatar=? WHERE uid=?"
  pool.query(sql,[avatar,uid],(err,result)=>{
    if(err){
      // next(err)
      // return
      throw err
    }
    // console.log(result)
    if(result.affectedRows>0){
      let output = {
        code:200,
        msg :'update avatar succ'
      }
      res.send(output)
    }else{
      let output = {
        code:402,
        msg :'update avatar failed'
      }
      res.send(output)
    }
  })
})
// 生成一个新的随机文件名路径
function genaerateNewFilePath(originalFileName) {
  // ./images/avatar +时间戳 +五位随机数+源文件后缀名
  let path = './public/images/avatar/';
  path += Date.now();
  path += Math.floor(Math.random() * 90000 + 10000)
  let lastDotIndex = originalFileName.lastIndexOf(".")//原文件名中最后一个.的下标
  let extName = originalFileName.substring(lastDotIndex)
  path += extName
  return path
}
