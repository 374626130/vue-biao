    import axios from 'axios'
    import base from './base.js'
    //node.js
    const qs = require('querystring')

    //axios 接口配置基础路径
    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
    const api = {
        //获取商品
        getGoods(params) { //params={page=xxx}
            return axios.get(base.projectList, {
                params
            })
        },
        getVal(params) { //params={search=xxx}
            return axios.get(base.search, {
                params
            })
        },
        getCategory(params) { //{id:cid}
            return axios.get(base.selectCategory, {
                params
            })
        },
        // 参数： title cid  category sellPoint price num descs paramsInfo image
        getAddGoods(params) { //添加商品
            return axios.get(base.addGoods, {
                params
            })
        },
        getDelGoods(params) { //删除商品  {id:xxx}
            return axios.get(base.delGoods, {
                params
            })
        },
        getXiuGoods(params) {
            return axios.get(base.xiuGoods, {
                params
            })
        },
        getLogin(params) { //登录
            return axios.post(base.login1, qs.stringify(params))
        },
        getSellTotal() {
            return axios.get(base.sellTotal)
        },
        getParams(params) {
            return axios.get(base.params, {
                params
            })
        },
        getSearch(params) { //search=xx
            return axios.get(base.search, {
                params
            })
        },
        //规格参数新增
        getAddG(params) {
            return axios.get(base.addG, {
                params
            })
        },
        //商品列表里获取类目规格的信息
        getcategory(params) {
            return axios.get(base.category, {
                params
            })
        }
    }
    export default api