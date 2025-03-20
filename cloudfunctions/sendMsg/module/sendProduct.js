
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

        res = await db.collection('prizeWin').aggregate()
        .match({
            prizeId: prize._id
        })
        .end()
        if(res.list.length == 0){
          return
        }

        let winner =  res.list[0]

        await cloud.openapi.subscribeMessage.send({
            touser: winner.openid,
            templateId:'_2971CcE5y8IEsaDUPlV1yAsLtgJbYwJ7gx6IKpTWfI',
            page: 'prize/prizeDetail/prizeDetail?prizeId=' + prize._id,
            data: {
              thing2: {
                value: prize.content,
              },
              thing7: {
                value: '已发货'
              }
            }
          })
      } catch (error) {
      
      }
    }

    
}