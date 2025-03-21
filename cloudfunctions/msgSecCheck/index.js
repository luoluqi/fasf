// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
  })

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

  
       let openid = wxContext.OPENID
       let appid = wxContext.APPID
       let unionid = wxContext.UNIONID
    

    try {
        const result = await cloud.openapi.security.msgSecCheck({
            "openid": openid,
            "scene": 1,
            "version": 2,
            "content": event.content
          })
        return result
      } catch (err) {
        return err
      }
}