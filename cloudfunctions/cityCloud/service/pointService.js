const BaseService = require('./baseService')

class PointService extends BaseService {
  constructor() {
    super()

  }
  async getMyOrderList({
    pageNum,
    pageSize,
    openid
  }) {
    var skip = (pageNum - 1) * pageSize
    var limit = pageSize
    let res = await this.db.collection('pointOrder').aggregate()
      .match({
        openid
      })
      .skip(skip)
      .limit(limit)
      .lookup({
        from: 'pointGoods',
        localField: "goodsId",
        foreignField: "_id",
        as: "goodsList"
      })
      .replaceRoot({
        newRoot: this.$.mergeObjects([this.$.arrayElemAt(['$goodsList', 0]), '$$ROOT'])
      })
      .project({
        goodsList: 0
      })
      .end()
      return res
  }

  async exchange({openid, goodsId, orderItem, address, content}){
    
    let consume = parseInt(orderItem.point + '') 
    let res = await this.db.collection('point').where({openid}).get()
    let point = res.data[0]
    let pointId = point._id
    try {
      const result = await this.db.runTransaction(async transaction => {
        
        let a = await transaction.collection('pointGoods').doc(goodsId).get()
        let goods = a.data
        if(goods.count <= 0){
          return { code: 0, msg: '库存不足'} 
        }
        if(point.count < consume){
          return { code: 0, msg: '积分不足'} 
        }
        // 扣除积分
        await transaction.collection('point').doc(pointId).update({
          data: {
            count: this._.inc(-consume)
          }
        })
        // 扣除库存
        await transaction.collection('pointGoods').doc(goodsId).update({
          data: {
            count: this._.inc(-1)
          }
        })
        // 创建订单
        let orderRes = await transaction.collection('pointOrder').add({
          data: {
            openid: openid,
            content: content,
            ...address,
            ...orderItem,
            createDate : new Date(),
            status: 0
          }
        })

        return { code: 200, msg: 'success', data: orderRes._id}  
      })
      return result
    } catch (error) {
      console.log(error)
      return error
    }
   
  }
}

module.exports = PointService