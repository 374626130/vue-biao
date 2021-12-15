// 1:引入i18n
import Vue from 'vue'
import VueI18n from 'vue-i18n'
//引入element库
import Element from 'element-ui'
//语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

//2：准备语言
const messages = {
    //英文
    en: {
        menu: {
            home: 'home',
            good: 'commodity',
            params: 'parameters'

        },
        //导入element-ui里面的语言包
        ...enLocale
    },
    //中文
    zh: {
        menu: {
            home: '首页',
            good: '商品管理',
            params: '规格参数'

        },
        //导入element-ui里面的语言包
        ...zhLocale
    }
}
//3： 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 选中当前语言
    messages, // 设置地区信息
})
//配置使用 element语言包
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})

// vue-i18n@8.x 
// Element.i18n((key, value) => i18n.t(key, value))
// 4：导出
export default i18n