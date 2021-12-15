"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var base = (_base = {
  host: 'http://localhost:8989',
  projectList: '/api/projectList',
  //商品接口
  search: '/api/search',
  //搜索接口
  selectCategory: '/api/backend/itemCategory/selectItemCategoryByParentId',
  //类目接口
  uploadUrl: '/api/upload',
  //图片上传 post请求
  addGoods: '/api/backend/item/insertTbItem',
  //商品添加
  delGoods: '/api/backend/item/deleteItemById',
  //删除商品
  xiuGoods: '/api/backend/item/updateTbItem',
  //修改商品
  login1: '/api/login',
  //登录接口   
  sellTotal: '/api/sellTotal',
  //折线图数据
  params: '/api/backend/itemParam/selectItemParamAll'
}, _defineProperty(_base, "search", '/api/params/search'), _defineProperty(_base, "addG", '/api/backend/itemParam/insertItemParam'), _defineProperty(_base, "category", '/api/category/data'), _base);
var _default = base;
exports["default"] = _default;