"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _loginModule = _interopRequireDefault(require("./modules/loginModule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue["default"].use(_vuex["default"]); //引入登录模块


var _default = new _vuex["default"].Store(_defineProperty({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
}, "modules", {
  LoginModule: _loginModule["default"]
}));

exports["default"] = _default;