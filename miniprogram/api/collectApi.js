const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate
const collectionName = 'collect'
export default {
    getList: async function ({
        pageNum,
        pageSize,
        openid,
        type,
        dataId
    }) {

        let res = await wx.cloud.callFunction({
            name: 'cityCloud',
            data: {
                url: '/collect/getCollectList',
                pageNum,
                pageSize,
                openid,
                type,
                dataId
            }
        })
        return res.result.list
    },
    get: async function (id) {
        let res = await db.collection(collectionName).doc(id).get()
        return res.data
    },
    add: async function (data) {
        data.createTime = new Date()
        if (data.longitude) {
            data.location = new db.Geo.Point(data.longitude, data.latitude)
        }

        return await db.collection(collectionName).add({
            data: data
        })
    },

    update: async function (data) {
        let _id = data._id
        delete data._id
        if (data.longitude) {
            data.location = new db.Geo.Point(data.longitude, data.latitude)
        }

        var res = await db.collection(collectionName).doc(_id).update({
            data: data
        })
        return res
    },

    delete: async function (id) {
        var res = await db.collection(collectionName).doc(id).remove()
        return res
    },
}