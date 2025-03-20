// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database({
  throwOnNotFound: false
})
const $ = db.command.aggregate
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('payCallback').add({
    data: event
  })
  let {
    outTradeNo,
    refundStatus,
    returnCode
  } = event
  if (refundStatus == "SUCCESS" && returnCode == "SUCCESS") {
    await db.collection('order').doc(outTradeNo).update({
      data: {
        status: 2
      }
    })
  }
  
  return {
    errcode: 0,
    errmsg: 'ok'
  }
}