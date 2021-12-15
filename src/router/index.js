import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/first/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '',
    component: Home,
    meta: {
      isLogin: true
    },
    children: [{
        path: '/',
        component: () => import('../views/second/Main.vue')
      },
      {
        path: '/store',
        component: () => import('../views/second/Store.vue'),
      },
      {
        path: '/addGoods',
        component: () => import('../views/second/addGoods.vue')
      },
      {
        path: '/addGoodsList',
        component: () => import('../views/second/addGoodList.vue')
      },
      {
        path: '/size',
        component: () => import('../views/second/Size.vue'),
        redirect: '/size/sizeinfo',
        children: [{
          path: 'sizeinfo',
          component: () => import('../views/third/SizeInfo.vue'),
        }, ]
      },
      {
        path: '/Ad',
        component: () => import('../views/second/Ad.vue')
      },
      {
        path: '/order',
        component: () => import('../views/second/Order.vue'),
        redirect: '/order/Listoder',
        children: [{
            path: 'Listoder',
            component: () => import('../views/third/LsitOder.vue')
          },
          {
            path: 'Listback',
            component: () => import('../views/third/ListBack.vue')
          },
        ]
      },
      {
        path: '/user',
        component: () => import('../views/second/User.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../views/first/Login.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//获取vuex数据
import store from '../store/index'
//路由拦截
router.beforeEach((to, from, next) => {
  console.log('-------------to------------', to);
  //判断是否需要登录
  if (to.matched.some(record => record.meta.isLogin)) {
    //需要登陆
    //判断当前的用户已经登录
    let token = store.state.LoginModule.userInfo.token;
    if (token) {
      next()
    } else {
      next('/login')
    }

  } else { //不需要登录
    next() // 确保一定要调用 next()
  }
})

export default router