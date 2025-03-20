
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database()


module.exports = {
    async sendOpenPrizeMsg({openid, prize, desc}){
      console.log('params', openid, prize._id, prize.content, desc)
      try {
        let res = await cloud.openapi.subscribeMessage.send({
          touser: openid,
          templateId:'Khz0Mi5ts0GWvU8NeN4AFtC-iuyvpS6nY5XOFM3eCbU',
          page: 'prize/prizeDetail/prizeDetail?prizeId=' + prize._id,
          data: {
            thing1: {
              value: prize.content,
            },
            thing2: {
              value: desc,
            }
          }
        })
        console.log('1111111111111')
        console.log('success:',res)
      } catch (error) {
        console.log('22222222')
        console.log('error:', error)
      }
    },

    async send(prizeId){
     
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
      this.sendOpenPrizeMsg({
        openid: winner.openid,
        prize, 
        desc: '恭喜您中奖了'
      })
      

      res = await db.collection('prizeJoin').aggregate()
        .match({
            prizeId: prize._id
          })
        .end()

      for(let join of res.list){
        if(join.openid == winner.openid){
          continue
        }
        this.sendOpenPrizeMsg({
          openid: join.openid,
          prize, 
          desc: '很遗憾您没有中奖'
        })
      }
    }

    
}