export default {
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
        setUser(state, ply) {
            state.userInfo = ply
        }
    },
    //清空
    clearUser(state) {
        state.userInfo = {
            username: '',
            token: ''
        }
    }

}