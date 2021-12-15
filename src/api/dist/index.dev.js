"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _base = _interopRequireDefault(require("./base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//node.js
var qs = require('querystring'); //axios 接口配置基础路径


_axios["default"].defaults.baseURL = process.env.VUE_APP_BASE_URL;
var api = {
  //获取商品
  getGoods: function getGoods(params) {
    //params={page=xxx}
    return _axios["default"].get(_base["default"].projectList, {
      params: params
    });
  },
  getVal: function getVal(params) {
    //params={search=xxx}
    return _axios["default"].get(_base["default"].search, {
      params: params
    });
  },
  getCategory: function getCategory(params) {
    //{id:cid}
    return _axios["default"].get(_base["default"].selectCategory, {
      params: params
    });
  },
  // 参数： title cid  category sellPoint price num descs paramsInfo image
  getAddGoods: function getAddGoods(params) {
    //添加商品
    return _axios["default"].get(_base["default"].addGoods, {
      params: params
    });
  },
  getDelGoods: function getDelGoods(params) {
    //删除商品  {id:xxx}
    return _axios["default"].get(_base["default"].delGoods, {
      params: params
    });
  },
  getXiuGoods: function getXiuGoods(params) {
    return _axios["default"].get(_base["default"].xiuGoods, {
      params: params
    });
  },
  getLogin: function getLogin(params) {
    //登录
    return _axios["default"].post(_base["default"].login1, qs.stringify(params));
  },
  getSellTotal: function getSellTotal() {
    return _axios["default"].get(_base["default"].sellTotal);
  },
  getParams: function getParams(params) {
    return _axios["default"].get(_base["default"].params, {
      params: params
    });
  },
  getSearch: function getSearch(params) {
    //search=xx
    return _axios["default"].get(_base["default"].search, {
      params: params
    });
  },
  //规格参数新增
  getAddG: function getAddG(params) {
    return _axios["default"].get(_base["default"].addG, {
      params: params
    });
  },
  //商品列表里获取类目规格的信息
  getcategory: function getcategory(params) {
    return _axios["default"].get(_base["default"].category, {
      params: params
    });
  }
};
var _default = api;
exports["default"] = _default;