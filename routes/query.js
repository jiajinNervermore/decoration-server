var pool = require('../pool.js')
module.exports=function(sql,params){
  return new Promise(function(open,err){
    pool.query(sql,params,(err,result)=>{
      if(err) throw err
      else open(result);
    })
  })
}