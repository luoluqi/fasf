
cloud.init({
 
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

module.exports = {
    async updateNoneImg(check){
      let prize = await db.collection('prize').doc(check.prizeId)
      let imgList = prize.imgList
      for(let img of imgList){
        if(img == check.mediaUrl){
          img = 'https://7171-qqqq-bqgzl-1301041841.tcb.qcloud.la/none.png'
        }
      }
      await db.collection('prize').doc(check.prizeId).update({
          data: {
            imgList: imgList,
            // fileList: ['cloud://qqqq-bqgzl.7171-qqqq-bqgzl-1301041841/none.png']
          }
        })
    }
}