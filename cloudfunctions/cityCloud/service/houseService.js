const BaseService = require('./baseService')

class HouseService extends BaseService {
    constructor() {
        super()

    }
    async getList({
        pageNum,
        pageSize,
        keyword,
        openid,
        status,
        cityId
    }) {
        var skip = (pageNum - 1) * pageSize
        var matchObj = {}
        if(openid){
            matchObj.openid = openid
        }
        if(status){
            matchObj.status = status
        }
        if(cityId){
            matchObj.cityId = cityId
        }
        if (keyword) {
            matchObj.community = db.RegExp({
                regexp: keyword,
                options: 'i',
            })
        }

        let res = await this.db.collection('house')
            .where(matchObj)
            .orderBy('createTime', 'desc')
            .skip(skip)
            .limit(pageSize)
            .get()
        return res.data
    }

}

module.exports = HouseService