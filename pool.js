//****连接池模块****
// 引入mysql模块
const mysql = require("mysql")
//创建连接池对象
let pool = mysql.createPool({
  host:"127.0.0.1",
  port:3306,
  database:"decorate",
  user:"root",
  password:'',
  connectionLimit:15
})
module.exports=pool