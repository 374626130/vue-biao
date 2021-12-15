const base = {
    host: 'http://localhost:8989',
    projectList: '/api/projectList', //商品接口
    search: '/api/search', //搜索接口
    selectCategory: '/api/backend/itemCategory/selectItemCategoryByParentId', //类目接口
    uploadUrl: '/api/upload', //图片上传 post请求
    addGoods: '/api/backend/item/insertTbItem', //商品添加
    delGoods: '/api/backend/item/deleteItemById', //删除商品
    xiuGoods: '/api/backend/item/updateTbItem', //修改商品
    login1: '/api/login', //登录接口   
    sellTotal: '/api/sellTotal', //折线图数据
    params: '/api/backend/itemParam/selectItemParamAll', //规格参数列表
    search: '/api/params/search', //规格参数模糊查询
    addG: '/api/backend/itemParam/insertItemParam', //规格参数添加 参数：itemCatId,content,specsName
    category: '/api/category/data' //规格参数的配置

}
export default base