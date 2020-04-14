
DROP DATABASE IF exists decorate;
CREATE DATABASE decorate charset=utf8;
USE decorate;
CREATE TABLE dec_background (
  bid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(64) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO dec_background (bid,pic) VALUES(NULL,'images/6.jpg');
CREATE TABLE dec_designer (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32) NOT NULL,
  pic VARCHAR(64) NOT NULL,
  title VARCHAR(32) NOT NULL,
  descs VARCHAR(256) NOT NULL,
  wechat VARCHAR(64),
  qq VARCHAR(32),
  phone SMALLINT(11),
  email VARCHAR(32),
  weibo VARCHAR(32)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE dec_scheme(
  id INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(64),
  title VARCHAR(128),
  descs VARCHAR(256)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO dec_scheme(id,pic,title,descs) VALUES
(NULL,'images/w1.jpg','住宅设计','Betasase ferode vetuyasas deulidas vacsques mtreasades vias asey yoleacene aris masease. Bsaeats laoieu lacsqueses nullader yoleac enanrit ma deuytas.'),
(NULL,'images/w2.jpg','办公设计','Betasase ferode vetuyasas deulidas vacsques mtreasades vias asey yoleacene aris masease. Bsaeats laoieu lacsqueses nullader yoleac enanrit ma deuytas.'),
(NULL,'images/w3.jpg','住宅设计','Betasase ferode vetuyasas deulidas vacsques mtreasades vias asey yoleacene aris masease. Bsaeats laoieu lacsqueses nullader yoleac enanrit ma deuytas.');
CREATE TABLE dec_classical(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(64) NOT NULL,
  title VARCHAR(32) NOT NULL,
  descs VARCHAR(256) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO dec_classical(cid,pic,title,descs) VALUES
(NULL,'images/p.jpg','客厅','客厅宜用浅色，让客人有耳目一新的感觉，使来宾消除一天奔波的疲劳。'),
(NULL,'images/p1.jpg','楼梯/过道','突破了陈旧的设计理念，将具有个性与时尚风格的线条、色彩、造型等装饰元素，创新性地融入到了现代的家居设计中，使其更符合现代人的生活要求与审美情趣。'),
(NULL,'images/p2.jpg','浴室','浴室的装修设计与整个浴室的大小有着直接关系，首先是浴室柜的安置和卫浴间的面积有密切的关系，大空间要大而得当，小空间要各项功能俱全，但还是以使用方便为最终目的'),
(NULL,'images/p3.jpg','卧室','实用主义和浪漫主义可以在卧室中并存，蓝白色调浪漫而沉静，蓝色清透与白色的安静相互映衬，有着海一般的梦幻感觉，优雅的配色似如歌的行板，浪漫温馨，装点出如水一般纯净又内涵丰富的卧室氛围'),
(NULL,'images/p4.jpg','厨房','依靠新材料、新的科技元素加上光与影的无穷变化，追求无常规的空间解构，大胆运用对比鲜明的色彩，以及搭配刚柔并济的选材，这便是现代风格厨房'),
(NULL,'images/p5.jpg','娱乐室','一个真正的休闲场所，您与亲人、朋友惬意共处而不必拘泥礼仪的场所');
CREATE TABLE dec_interiors(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32) NOT NULL,
  num INT 
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO dec_interiors(id,title,num) VALUES
(NULL,'客户',5700),
(NULL,'现代设计',1700),
(NULL,'好评',5500),
(NULL,'奖项',250);

CREATE TABLE dec_feedback(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  descs VARCHAR(256) NOT NULL,
  users VARCHAR(32) NOT NULL
);

INSERT INTO dec_feedback(fid,descs,users) VALUES
(NULL,'可爱的小珍妮','设计的很有特色,满意这次的合作'),
(NULL,'威廉的苹果','设计的很有特色,满意这次的合作'),
(NULL,'难得孤独','设计的很有特色,满意这次的合作');
CREATE TABLE dec_newest(
  nid INT PRIMARY KEY AUTO_INCREMENT,
  descs VARCHAR(256) NOT NULL,
  pic VARCHAR(64) NOT NULL
);
INSERT INTO dec_newest(nid,descs,pic) VALUES
(NULL,'Quisque varius, nibh ac feugiat interdum, libero massa laoreet tellus, nec congue lorem arcu a nunc. Praesent quis felis eget.','images/e1.jpg'),
(NULL,'Quisque varius, nibh ac feugiat interdum, libero massa laoreet tellus, nec congue lorem arcu a nunc. Praesent quis felis eget.','images/e2.jpg'),
(NULL,'Quisque varius, nibh ac feugiat interdum, libero massa laoreet tellus, nec congue lorem arcu a nunc. Praesent quis felis eget.','images/e3.jpg');
-- 关于我们页面展示图片
CREATE TABLE dec_aboutpic(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  pics VARCHAR(128) NOT NULL
);
INSERT INTO dec_aboutpic(aid,pics) VALUES
(NULL,'{lg:"images/a1.jpg",ms:"images/a2.jpg"}');
-- 团队
CREATE TABLE dec_team(
  tid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32) NOT NULL,
  title VARCHAR(64),
  descs VARCHAR(256) NOT NULL,
  pic VARCHAR(64) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO dec_designer(id,uname,title,descs,pic,wechat,qq,email,weibo,phone) VALUES
(null,'刘潇潇','设计师','年度最佳设计师','images/t1.jpg',"13512345678","645536781","645536781@qq.com","liuxiaoxiao@sina.com",13512345678),
(null,'王晓明','设计师','年度最佳设计师','images/t2.jpg',"13512345678","645536781","645536781@qq.com","liuxiaoxiao@sina.com",13512345678),
(null,'何欣怡','设计师','年度最佳设计师','images/t3.jpg',"13512345678","645536781","645536781@qq.com","liuxiaoxiao@sina.com",13512345678);
INSERT INTO dec_team(tid,uname,title,descs,pic) VALUES
(null,'陈飞','总裁','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.','images/t1.jpg'),
(null,'胡先','总经理','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.','images/t2.jpg'),
(null,'张小萌','财务经理','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.','images/t3.jpg'),
(null,'李元','公关经理','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.','images/t3.jpg');

CREATE TABLE dec_company(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  pics VARCHAR(1024),
  decs VARCHAR(256),
  title VARCHAR(128),
  addr VARCHAR(256),
  wechat VARCHAR(64),
  qq VARCHAR(32),
  phone SMALLINT(11),
  email VARCHAR(32),
  weibo VARCHAR(32)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO dec_company(cid,uname,pics,decs,title,addr,wechat,qq,phone,email,weibo) VALUES
(NULL,'春晓室内设计工作室','{Furniture:"images/f1.jpg",talkarea:"images/a2.jpg",livingRoom:"images/a1.jpg"}',"我们拥有国内顶尖的设计团队，以其“全案设计”的服务模式实力领航高端装饰设计市场。原色云全案设计是指满足客户在别墅装修中的所有设计需求，为客户提供一站式的设计服务，包括户型解析、功能布局、风格定位、资金规划、图纸预算、软装配饰、家具选购、主材产品搭配、设备选购和园林设计的全方位设计过程。全案设计能很好地解除业主在装修中遇到的一系列的麻烦，实现业主心中理想的装修效果。它不仅是单一地为客户进行室内设计，还包括材料设计、配饰设计、园林改造设计、设备系统设计、智能家居设计、风水规划和环保设计等，综合地为客户提供全面细致的服务。",'非凡品位,独享专属空间设计','重庆市渝北新南路168号龙湖moco3栋10-13','13912345678','578166455','13912345678','578166455@qq.com','chunxiao@sina.com');
CREATE TABLE dec_services(
  id INT PRIMARY KEY AUTO_INCREMENT,
  works VARCHAR(2048),
  services VARCHAR(1048)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO dec_services(id,works,services) VALUES
(null,'[{img:"images/s2.jpg",title:"书房",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."},{img:"images/s3.jpg",title:"客厅",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."},{img:"images/s4.jpg",title:"卧室",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."},{img:"images/s5.jpg",title:"餐厅",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."},{img:"images/s6.jpg",title:"厨房",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."},{img:"images/s7.jpg",title:"会客厅",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."},{img:"images/s8.jpg",title:"走廊",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."},{img:"images/s9.jpg",title:"厨房",services:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare odio et massa dignissim, at accumsan metus viverra."}]','images/s1.jpg,images/s10.jpg');

CREATE TABLE dec_choose(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(32),
  decs VARCHAR(128)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO dec_choose(cid,title,decs) VALUES
(null,'室内设计','一般的装修设计公司通常只注重室内的空间效果，而家居配饰等设计搭配都分离的，往往导致装修风格与家居配饰的风格搭配不协调，达不到理性的效果。在全案设计里，在室内设计的同时，会考虑色彩、材质、家具配置、饰品配饰等各个元素之间的整体性搭配效果，保证装修效果与理想效果达到完美的统一'),
(null,'主材设计','在装修中，正确的材料选择与搭配能更好的营造空间效果，如果选材上的搭配与整体的室内效果搭配不一致，就会与理想的室内效果差别非常大。通常来说，一般的装修公司在设计的时候多数采用的是图片库的材料，实际并不一定能买得到。而业主对装修风格把握不一定都精准，因此花了很多的时间购买材料，往往与设计效果差别很大。而在全案设计中就不会出现这种问题，设计师在装修设计的时候，就会考虑到与整体室内装修风格统一的材料选择方案，并且能保证选择的材料能购买到，保证设计用材与使用用材的一致性'),
(null,'配饰设计','配饰设计就像室内空间的衣服，打扮成什么样，很多因素都依赖于配饰配饰设计，以往的装修公司只管室内装修效果，在配饰方面的选购和搭配都由业主自行购买与搭配，往往业主选择的家具款式颜色与环境及不协调。在全案设计里就不会出现这样的情况，设计师在装修设计的同时会考虑与家庭风格匹配可以购买到的家具、饰品，还为业主提供一套配置设计方案——色彩设计、品配置效果、配置家具所需的费用规格品牌等'),
(null,'建筑园林改造设计','通常一般别墅的园林改造设计，很多都是工长自己改造或者是业主自己去寻找。园林设计是一门综合学科，涉及到园林、建筑、雕刻等综合知识，而工长一般的知识水品不能达到专业的水品，可想而知，这样的建筑园林改造设计是很难达到与整个建筑设计一致的效果。如果是业主自己去寻找，会花费很多时间找专业公司，未必满意。在全案设计里，设计公司会与专业的园林设计公司合作，使园林与整个室外与室内的整体效果达成一种理想效果，并为主节约成本和时间');
-- 画廊
-- 厨房和浴室
CREATE TABLE dec_kitchen_bath(
  kid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(32),
  galId SMALLINT NOT NULL,
  fTime VARCHAR(13)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 客厅
CREATE TABLE dec_livingroom(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(32),
  galId SMALLINT NOT NULL,
  fTime VARCHAR(13)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 卧室
CREATE TABLE dec_bedroom(
  bid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(32),
  galId SMALLINT NOT NULL,
  fTime VARCHAR(13)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO dec_kitchen_bath(kid,pic,galId,fTime) VALUES
(NULL,'images/g3.jpg',1,'1586780450210'),
(NULL,'images/g4.jpg',1,'1586780450220'),
(NULL,'images/g5.jpg',1,'1586780450230'),
(NULL,'images/g3.jpg',1,'1586780450240'),
(NULL,'images/s2.jpg',1,'1586780450250'),
(NULL,'images/s6.jpg',1,'1586780450290');
INSERT INTO dec_livingroom(lid,pic,galId,fTime) VALUES
(null,'images/g1.jpg',2,'1586780450190'),
(null,'images/g7.jpg',2,'1586780450290'),
(null,'images/g8.jpg',2,'1586780450390'),
(null,'images/g1.jpg',2,'1586780450490'),
(null,'images/s8.jpg',2,'1586780450590');
INSERT INTO dec_bedroom(bid,pic,galId,fTime) VALUES
(null,'images/g10.jpg',3,'1586780451290'),
(null,'images/g11.jpg',3,'1586780452290'),
(null,'images/g10.jpg',3,'1586780453290'),
(null,'images/s4.jpg',3,'1586780450490');