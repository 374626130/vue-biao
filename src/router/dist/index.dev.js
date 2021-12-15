"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/first/Home.vue"));

var _index = _interopRequireDefault(require("../store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '',
  component: _Home["default"],
  meta: {
    isLogin: true
  },
  children: [{
    path: '/',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/Main.vue'));
      });
    }
  }, {
    path: '/store',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/Store.vue'));
      });
    }
  }, {
    path: '/addGoods',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/addGoods.vue'));
      });
    }
  }, {
    path: '/addGoodsList',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/addGoodList.vue'));
      });
    }
  }, {
    path: '/size',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/Size.vue'));
      });
    },
    redirect: '/size/sizeinfo',
    children: [{
      path: 'sizeinfo',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/third/SizeInfo.vue'));
        });
      }
    }]
  }, {
    path: '/Ad',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/Ad.vue'));
      });
    }
  }, {
    path: '/order',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/Order.vue'));
      });
    },
    redirect: '/order/Listoder',
    children: [{
      path: 'Listoder',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/third/LsitOder.vue'));
        });
      }
    }, {
      path: 'Listback',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/third/ListBack.vue'));
        });
      }
    }]
  }, {
    path: '/user',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/second/User.vue'));
      });
    }
  }]
}, {
  path: '/login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/first/Login.vue'));
    });
  }
}];
var router = new _vueRouter["default"]({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
}); //获取vuex数据

//路由拦截
router.beforeEach(function (to, from, next) {
  console.log('-------------to------------', to); //判断是否需要登录

  if (to.matched.some(function (record) {
    return record.meta.isLogin;
  })) {
    //需要登陆
    //判断当前的用户已经登录
    var token = _index["default"].state.LoginModule.userInfo.token;

    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    //不需要登录
    next(); // 确保一定要调用 next()
  }
});
var _default = router;
exports["default"] = _default;