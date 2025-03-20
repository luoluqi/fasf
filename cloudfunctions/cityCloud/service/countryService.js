const BaseService = require('./baseService')

class CountryService extends BaseService {
    constructor() {
        super()

    }
    async getList({
        pageNum,
        pageSize,
    }) {
        var skip = (pageNum - 1) * pageSize
        var matchObj = {}
        let res = await this.db.collection('country')
            .where(matchObj)
            .orderBy('sort', 'asc')
            .skip(skip)
            .limit(pageSize)
            .get()
        return res.data
    }

}

module.exports = CountryService