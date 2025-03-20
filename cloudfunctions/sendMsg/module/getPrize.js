
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database()


module.exports = {  
    async send(prizeId){
      try {
        let res = await db.collection('prize').doc(prizeId).get()
        let prize = res.data
        await cloud.openapi.subscribeMessage.send({
            touser: prize.openid,
            templateId:'FdxWMtATv2zBhSEYu5rG0TnNVNu5H3CLSAfnD6S5xKA',
            page: 'prize/prizeDetail/prizeDetail?prizeId=' + prize._id,
            data: {
              thing6: {
                value: '奖品已被领取，快去发货吧',
              },
              thing7: {
                value: prize.content,
              }
            }
          })
      } catch (error) {
      
      }
    }

    
}