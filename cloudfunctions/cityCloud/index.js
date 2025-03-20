// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const appid = wxContext.appid
    const unionid = wxContext.unionid
    const url = event.url
    const arr = url.split('/')
    const controllerName = arr[1]
    const action = arr[2]
    let controller = require(`./controller/${controllerName}Controller`)
    return await new controller()[action](event)
}