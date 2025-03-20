// 云函数入口文件
const active = require('./modules/active')
const prize = require('./modules/prize')
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

      if(event.result.suggest == 'risky'){
        var res = await db.collection('mediaCheckPush').aggregate()
        .match({
          traceId: event.trace_id ? event.trace_id : event.traceId
        })
        .end()

        console.log(res)
        var list = res.list
       
        var r = await cloud.deleteFile({
          fileList: list.map(obj => obj.fileId)
        })

        console.log(r)


        if(list[0].activeId){
          await active.updateNoneImg(list[0])
        }
        if(list[0].prizeId){
          await prize.updateNoneImg(list[0])
        }
        
        
      } 
     
      return event.result
}