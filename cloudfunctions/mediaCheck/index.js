// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
  })
  const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

  
       let openid = wxContext.OPENID
       let appid = wxContext.APPID
       let unionid = wxContext.UNIONID
    
      console.log(event)
      
    try {
        const result = await cloud.openapi.security.mediaCheckAsync({
            mediaUrl: event.mediaUrl,
            mediaType: 2,
            version: 2,
            openid: openid,
            scene: 4
          })
  
        
          event.date = new Date()
          event.traceId = result.traceId
          await db.collection('mediaCheckPush').add({
            data: event
          })
        return result
      } catch (err) {
        return err
      }
}