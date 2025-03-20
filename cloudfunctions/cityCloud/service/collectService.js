const BaseService = require('./baseService')

class CollectService extends BaseService {
  constructor() {
    super()

  }
  async getCollectList({
    pageNum,
    pageSize,
    openid,
    type,
    dataId,
  }) {
    var skip = (pageNum - 1) * pageSize
    var limit = pageSize
    let matchObj = {}
    if(openid){
        matchObj.openid = openid
    }
    if(type){
        matchObj.type = type
    }
    if(dataId){
        matchObj.dataId = dataId
    }
    let res = await this.db.collection('collect').aggregate()
      .match(matchObj)
      .skip(skip)
      .limit(limit)
      .lookup({
        from: type,
        localField: "dataId",
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


}

module.exports = CollectService