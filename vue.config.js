module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //反向代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8989/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
      //可同时请求多个接口----其他接口
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  }
}