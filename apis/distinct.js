// 数组去重
module.exports = //1. for循环+对象结构: 效率较高
function distinct1(arr){
  var hash={};//定义字典对象,像统计字符串中字符出现次数的案例中的对象用法一样——复习
  var newArr=[];//定义新数组，准备接不重复的元素
  //遍历原数组中每个数字
  for(var elem of arr){
    //如果在字典对象中不包含以当前数字为key的成员，说明从未遇到过这个成员，就将这个数字加入结果数组newArr中，同时在字典中以该数字为属性名添加一个新成员，表示已经碰到过该数字一次。
    if(hash[elem.fromuid]===undefined){
      hash[elem.fromuid]=1;
      newArr.push(elem);
    }
    //如果字典中已经有了以当前数字为属性名的成员，说明已经碰到过当前数字，就不是唯一的了，则该数字就不要了。
  }
  //最后，返回结果数组即可
  return newArr;
}
/*
**es6语法
module.exports = function(arr){
  //Set是特殊的集合，要求其中的元素不可重复
  //new Set()是创建Set类型集合的意思
  //new Set(arr)是将一个数字，转为Set类型的集合，同时自动取出数组中重复的数字
  //.values()是获得Set集合中所有值的数组。
  return new Set(arr).values();
}*/