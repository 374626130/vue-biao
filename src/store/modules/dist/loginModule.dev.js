"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  //命名空间
  namespaced: true,
  state: {
    userInfo: {
      username: '',
      token: ''
    }
  },
  mutations: {
    //设置用户信息
    setUser: function setUser(state, ply) {
      state.userInfo = ply;
    }
  },
  //清空
  clearUser: function clearUser(state) {
    state.userInfo = {
      username: '',
      token: ''
    };
  }
};
exports["default"] = _default;