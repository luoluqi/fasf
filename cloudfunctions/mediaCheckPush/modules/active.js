cloud.init({
 
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()


module.exports = {
    async updateNoneImg(check){
        let active = await db.collection('active').doc(check.activeId)
        let imgList = active.imgList
        for(let img of imgList){
          if(img == check.mediaUrl){
            img = 'https://7171-qqqq-bqgzl-1301041841.tcb.qcloud.la/none.png'
          }
        }
        await db.collection('active').doc(check.activeId).update({
            data: {
              imgList: imgList,
              // fileList: ['cloud://qqqq-bqgzl.7171-qqqq-bqgzl-1301041841/none.png']
            }
          })
    }
}