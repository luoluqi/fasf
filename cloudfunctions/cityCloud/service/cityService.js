const BaseService = require('./baseService')

class CityService extends BaseService {
    constructor() {
        super()

    }
    async getList({
        pageNum,
        pageSize,
        countryId,
        keyword
    }) {
        var skip = (pageNum - 1) * pageSize
        var matchObj = {}
        var andList = []
        if (countryId) {
            andList.push({
                countryId: countryId
              })
        }
        if (keyword) {
            var a  = this._.or([{
                    name: this.db.RegExp({
                        regexp: keyword,
                        options: 'i',
                    })
                },
                {
                    english: this.db.RegExp({
                        regexp: keyword,
                        options: 'i',
                    })
                }
            ])
            andList.push(a)
        }
        let res = await this.db.collection('city')
            .where(this._.and(andList))
            .orderBy('sort', 'asc')
            .skip(skip)
            .limit(pageSize)
            .get()
        return res.data
    }

}

module.exports = CityService