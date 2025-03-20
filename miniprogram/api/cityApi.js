const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate
const collectionName = 'city'
export default {
    getList: async function ({
        pageNum,
        pageSize,
        countryId,
        keyword
    }) {
        let res = await wx.cloud.callFunction({
            name: 'cityCloud',
            data: {
                url: '/city/getList',
                pageNum,
                pageSize,
                countryId,
                keyword
            }
        })
        return res.result
    },
    get: async function (id) {
        let res = await db.collection(collectionName).doc(id).get()
        return res.data
    },
    add: async function (data) {
        data.createTime = new Date()
        data.location = new db.Geo.Point(data.longitude, data.latitude)
        return await db.collection(collectionName).add({
            data: data
        })
    },

    update: async function (data) {
        let _id = data._id
        delete data._id
        data.location = new db.Geo.Point(data.longitude, data.latitude)
        var res = await db.collection(collectionName).doc(_id).update({
            data: data
        })
        return res
    },

    delete: async function (id) {
        var res = await db.collection(collectionName).doc(id).remove()
        return res
    },

    near: async function ({
        longitude,
        latitude,
        pageNum,
        pageSize,
    }) {
        let skip = (pageNum - 1) * pageSize
        var matchObj = {}

        let res = await db.collection(collectionName).aggregate()
            .geoNear({
                distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
                spherical: true,
                near: db.Geo.Point(longitude, latitude),
                // query: {
                //   docType: 'geoNear',
                // },
                key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
                includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
            })
            .match(matchObj)
            .skip(skip)

            .limit(pageSize)
            .end()

        return res.list
    },
}