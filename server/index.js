//搭建express服务
const express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({
    extended: true
}))
//路由
const router = require('./router')
//资源共享
const cors = require('cors')
app.use(cors())

//静态文件托管
app.use(express.static('upload'))

app.use('/api', router)

app.listen(8989, () => {
    console.log(8989);
})
