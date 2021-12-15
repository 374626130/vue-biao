"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueI18n = _interopRequireDefault(require("vue-i18n"));

var _elementUi = _interopRequireDefault(require("element-ui"));

var _en = _interopRequireDefault(require("element-ui/lib/locale/lang/en"));

var _zhCN = _interopRequireDefault(require("element-ui/lib/locale/lang/zh-CN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].use(_vueI18n["default"]); //2：准备语言


var messages = {
  //英文
  en: _objectSpread({
    menu: {
      home: 'home',
      good: 'commodity',
      params: 'parameters'
    }
  }, _en["default"]),
  //中文
  zh: _objectSpread({
    menu: {
      home: '首页',
      good: '商品管理',
      params: '规格参数'
    }
  }, _zhCN["default"])
}; //3： 通过选项创建 VueI18n 实例

var _i18n = new _vueI18n["default"]({
  locale: 'zh',
  // 选中当前语言
  messages: messages // 设置地区信息

}); //配置使用 element语言包


_vue["default"].use(_elementUi["default"], {
  i18n: function i18n(key, value) {
    return _i18n.t(key, value);
  }
}); // vue-i18n@8.x 
// Element.i18n((key, value) => i18n.t(key, value))
// 4：导出


var _default = _i18n;
exports["default"] = _default;