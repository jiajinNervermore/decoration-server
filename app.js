
//*** xhs服务器 ***
//引入express模块
const express = require("express")
//引入history模块
const history = require("connect-history-api-fallback")
//引入cors模块
const cors = require('cors')
//引入session模块
const session = require("express-session")
//创建web服务器
let server = express()

//引入路由模块

var index = require("./routes/index");
var about = require('./routes/about')
var gallery = require('./routes/gallery')
var services = require('./routes/services')
server.use(index)
server.use(about)
server.use(gallery)
server.use(services)
//配置跨域模块
server.use(cors({
  origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
  credentials: true
}))
//指定静态资源目录 public
server.use(express.static("public"));
server.use(express.urlencoded({ extended: false }));
//配置session对象
server.use(session({
  secret: "128位安全字符串",//加密条件
  cookie: { maxAge: 60 * 1000 * 30 },//过期时间ms
  resave: true,//每次请求更新数据
  saveUninitialized: true,//保存初始化数据
}));
//挂载路由到服务器上

//注册history
server.use(history());
//为服务器绑定监听端口 9527
server.listen(5050);

console.log("服务器起动.......");