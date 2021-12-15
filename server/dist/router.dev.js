"use strict";

var express = require('express');

var router = express.Router(); //导入数据库 sqlFn('sql',[],res=>{})

var sqlFn = require('./mysql'); //图片所需要的模块


var multer = require('multer');

var fs = require('fs'); //导入模块 jsonwebtoken   密钥


var jwt = require('jsonwebtoken'); // config.jwtSecert


var config = require('./secert'); //导入mockjs 


var Mock = require('mockjs');
/**
 * 商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */


router.get('/projectList', function (req, res) {
  var page = req.query.page || 1;
  var sqlLen = "select * from project where id";
  sqlFn(sqlLen, null, function (data) {
    var len = data.length;
    var sql = "select * from project order by id desc limit 8 offset " + (page - 1) * 8;
    sqlFn(sql, null, function (result) {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pageSize: 8,
          total: len
        });
      } else {
        res.send({
          status: 500,
          msg: "暂无数据"
        });
      }
    });
  });
});
/**
 * 商品查询接口 search
 * 参数：search
 */

router.get("/search", function (req, res) {
  var search = req.query.search;
  var sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'";
  sqlFn(sql, null, function (result) {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据"
      });
    }
  });
});
/**
 * 类目选择
 * 接口说明：接口不同的参数cid 返回不同的类目数据 后台接受变量：id  
 */

router.get("/backend/itemCategory/selectItemCategoryByParentId", function (req, res) {
  var id = req.query.id || 1;
  var sql = "select * from category where id=?";
  var arr = [id];
  sqlFn(sql, arr, function (result) {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据"
      });
    }
  });
});
/**
 * 类目结构数据获取
 */

router.get("/category/data", function (req, res) {
  var cid = req.query.cid;
  var sql = "select * from params where itemCatId=?";
  sqlFn(sql, [cid], function (result) {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据"
      });
    }
  });
});
/**
 * 上传图片 post请求 upload
 * 说明：
 *  1.后台安装 multer 模块   同时引入fs模块
 *  2.router.js入口文件导入模块
 *      const fs=require('fs')
        const multer=require('multer')
 *  3.上传图片 
 * 
 */

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var createFolder = function createFolder(folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({
  storage: storage
});
router.post('/upload', upload.single('file'), function (req, res, next) {
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  res.json({
    res_code: '0',
    name: file.originalname,
    url: file.path
  });
});
/**
 * 商品添加
 * 参数： title cid  category sellPoint price num descs paramsInfo image
 */

router.get("/backend/item/insertTbItem", function (req, res) {
  /**
   * 获取参数
   */
  var title = req.query.title || "";
  var cid = req.query.cid || "";
  var category = req.query.category || "";
  var sellPoint = req.query.sellPoint || "";
  var price = req.query.price || "";
  var num = req.query.num || "";
  var desc = req.query.descs || "";
  var paramsInfo = req.query.paramsInfo || "";
  var image = req.query.image || "";
  var sql = "insert into project values (null,?,?,?,?,?,?,?,'',1,'','',?,?)";
  var arr = [title, image, sellPoint, price, cid, category, num, desc, paramsInfo];
  sqlFn(sql, arr, function (result) {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功"
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败"
      });
    }
  });
});
/**
 * 商品删除接口 id
 */

router.get("/backend/item/deleteItemById", function (req, res) {
  var id = req.query.id;
  var sql = "delete from project where id=?";
  var arr = [id];
  sqlFn(sql, arr, function (result) {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功"
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败"
      });
    }
  });
});
/**
 * 批量删除 batchDelete  idArr Array  id标识
 * sql = "delete from A where id in (1,2,3)"  
 */

router.get("/batchDelete", function (req, res) {
  var arr = req.query.idArr; //[] 数组格式 需要传递数据是 离散的数字格式 
  // const sql =`delete from project where id in (?)`;

  var sql = '';

  function fun(arr) {
    //sql =`delete from project where id in (101,102,103)`;
    sql = "delete from project where id in (";

    for (var i = 0; i < arr.length; i++) {
      sql += arr[i] + ','; //101,102,
    }

    sql = sql.slice(0, -1);
    sql = sql + ')'; // console.log(sql);
  }

  fun(arr);
  sqlFn(sql, null, function (result) {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功"
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败"
      });
    }
  });
});
/**
 * 修改商品
 */

router.get("/backend/item/updateTbItem", function (req, res) {
  var id = req.query.id;
  var title = req.query.title || "";
  var sellPoint = req.query.sellPoint || "";
  var price = req.query.price || "";
  var cid = req.query.cid || "";
  var category = req.query.category || "";
  var num = req.query.num || "";
  var desc = req.query.descs || "";
  var paramsInfo = req.query.paramsInfo || "";
  var image = req.query.image || "";
  var sql = "update project set title=?,sellPoint=?,price=?,cid=?,category=?,num=?,descs=?,paramsInfo=?,image=? where id=?";
  var arr = [title, sellPoint, price, cid, category, num, desc, paramsInfo, image, id];
  sqlFn(sql, arr, function (result) {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功"
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失败"
      });
    }
  });
}); //登录接口

/**
 * 语法：
 * 如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
 *  jwt.sign({},'秘钥','过期时间,{expiresIn:20*1,'1day''1h'}')
 */

/**
 * 登录 login
 * 接受的字段：username,password
 * 测试：postman  
 */

router.post('/login', function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password; //请求数据库

  var sql = "select * from userinfo where username=? and password=?";
  var arr = [username, password];
  sqlFn(sql, arr, function (result) {
    if (result.length > 0) {
      var token = jwt.sign({
        username: result[0].username,
        id: result[0].id
      }, config.jwtSecert, {
        expiresIn: 20 * 1
      });
      res.send({
        status: 200,
        data: token
      });
    } else {
      res.send({
        status: 404,
        msg: '信息错误'
      });
    }
  });
});
/**
 * 注册接口 /register
 */

router.post("/register", function (req, res) {
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;
  var sql = "insert into userinfo values(null,?,?)";
  var arr = [username, password];
  sqlFn(sql, arr, function (result) {
    if (result.affectedRows > 0) {
      res.send({
        msg: "注册成功",
        status: 200
      });
    } else {
      res.status(401).json({
        errors: "用户名密码错误"
      });
    }
  });
});
/**
 * 统计数据--销售信息
 */

router.get('/statistical', function (req, res) {
  res.send(Mock.mock({
    success: true,
    status: 200,
    "list|4": [{
      'id|+1': 100,
      "title|+1": ['总销售额', '访问量', '支付总量', '收藏量'],
      "current|0-2000": 100,
      "total|100-999999": 200
    }]
  }));
});
/**
 * 统计 半年 月销量对比数据
 * 月度销售额
 */

router.get('/sellTotal', function (req, res) {
  res.send(Mock.mock({
    success: true,
    status: 200,
    info: {
      'id|+1': 100,
      date: function date() {
        var category = [];
        var dottedBase = +new Date();

        for (var i = 30; i > 0; i--) {
          var date = new Date(dottedBase -= 1000 * 3600 * 24 * 30);
          category.push([date.getFullYear(), date.getMonth() + 1].join("-"));
        }

        return category.slice(0, 6);
      },
      "xResult|3": [{
        'xName|+1': ["家具", '手机', '家电'],
        "data|6": [{
          'num|100-1000': 10
        }]
      }]
    }
  }));
}); //测试mockjs数据

router.get('/test', function (req, res) {
  //使用mock生成数据
  var data = Mock.mock({
    info: '我是一个单纯的对象',
    status: 200,
    //生成list字段：数组类型 内容是6个数据={}
    "list|6": [{
      "id|+1": 100,
      //id自增
      "flag|1-2": true,
      "city|1": {
        //获取两个城市数据
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省"
      },
      "arr|+1": [//一次获取一个数据值 依次获取
      "AMD", "CMD", "UMD", "aaaa", "bbb", "ccc"],
      "desc": '@cword(20,80)',
      //随机汉字
      'imgurl': "@Image()"
    }]
  });
  res.send(data);
});
/**
 * 规格参数列表  参数 page
 */

router.get("/backend/itemParam/selectItemParamAll", function (req, res) {
  var page = req.query.page || 1;
  var sqlLen = "select * from params where id";
  sqlFn(sqlLen, null, function (data) {
    var len = data.length;
    var sql = "select * from params order by id desc limit 8 offset " + (page - 1) * 8;
    sqlFn(sql, null, function (result) {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pageSize: 8,
          total: len
        });
      } else {
        res.send({
          status: 500,
          msg: "暂无数据"
        });
      }
    });
  });
});
/**
 * 规格参数  模糊查询  参数：search
 */

router.get("/params/search", function (req, res) {
  var search = req.query.search;
  var sql = "select * from params where concat(`paramData`) like '%" + search + "%'";
  sqlFn(sql, [search], function (result) {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result
      });
    } else {
      res.send({
        status: 500,
        msg: '暂无数据'
      });
    }
  });
});
/**
 * 规格参数 添加 
 * 参数：itemCatId,content,specsName
 */

router.get("/backend/itemParam/insertItemParam", function (req, res) {
  var itemCatId = req.query.itemCatId;
  var paramsContent = req.query.content;
  var specsName = req.query.specsName; // console.log(itemCatId, paramsContent,specsName);

  var sql = "insert into params values (null,?,?,?)";
  sqlFn(sql, [itemCatId, paramsContent, specsName], function (result) {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功"
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败"
      });
    }
  });
});
/**
 * 修改规格参数 cid content id  specsName
 */

router.get("/update/category", function (req, res) {
  var cid = req.query.cid;
  var content = req.query.content;
  var id = req.query.id;
  var specsName = req.query.specsName;
  var sql = "update params set paramData=? ,itemCatId=?,specsName=? where id=?";
  sqlFn(sql, [content, cid, specsName, id], function (result) {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "修改成功"
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失败"
      });
    }
  });
});
/**
 * 规格参数删除
 */

router.get("/params/delete", function (req, res) {
  var id = req.query.id;
  var sql = "delete from params where id=?";
  var arr = [id];
  sqlFn(sql, arr, function (result) {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功"
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败"
      });
    }
  });
});
/**
 * 规格参数类目结构数据获取 cid
 */

router.get("/category/data", function (req, res) {
  var cid = req.query.cid;
  var sql = "select * from params where itemCatId=?";
  sqlFn(sql, [cid], function (result) {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result
      });
    } else {
      res.send({
        status: 500,
        msg: "暂无数据"
      });
    }
  });
}); //=====订单接口模拟==================================================

/**
 * 订单列表
 */

var MockRandom = Mock.Random;
var pageCount = MockRandom.integer(1, 10); //7

var haseMore = true; //是否还有更多数据  true有数据  false无更多数据 结束分页展示

var ids = 100; //自增长id

var result = {}; //数据模板

router.get('/order-list', function (req, res) {
  var currPage = parseInt(req.query.currPage || 1); //页码

  ids = currPage * 100;

  if (currPage === pageCount) {
    haseMore = false;
    result = {
      'hasMore': false,
      'totalPage': pageCount,
      "list|1-10": [//最后一页的数据在1-10的区间产生
      {
        'id|+1': ids,
        "title": '@cword(3,20)',
        //随机汉字,
        "address": '@province()/@city()/@county()',
        "num|1-100": 1,
        "user": {
          "avator": MockRandom.image('200x100', '#4A7BF7'),
          //图片大小
          "name": "@cname",
          "isvip": "@integer(0,1)",
          "level": "@integer(0,20)"
        },
        "created": "@date('yyyy-MM-dd-HH-mm-ss')",
        //日期
        'time': MockRandom.now('yyyy-MM-dd')
      }]
    };
  } else {
    result = {
      'hasMore': true,
      'totalPage': pageCount,
      "list|10": [//有分页的时候一页10条数据
      {
        'id|+1': ids,
        "title": '@cword(3,20)',
        //随机汉字,
        "address": '@province()/@city()/@county()',
        "num|1-100": 1,
        "user": {
          "avator": MockRandom.image('200x100', '#4A7BF7'),
          //图片大小
          "name": "@cname",
          "isvip": "@integer(0,1)",
          "level": "@integer(0,20)"
        },
        "created": "@date('yyyy-MM-dd-HH-mm-ss')",
        //日期
        'time': MockRandom.now('yyyy-MM-dd')
      }]
    };
  } //返回数据


  var mockData = Mock.mock(result);

  if (pageCount >= currPage) {
    res.send({
      status: 200,
      data: mockData,
      total: pageCount
    });
  } else {
    res.send({
      status: 403,
      data: []
    });
  }
});
module.exports = router;