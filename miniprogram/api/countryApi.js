const db = wx.cloud.database()
const collectionName = 'country'
export default {
    getList: async function ({
        pageNum,
        pageSize,
    }) {
        let res = await wx.cloud.callFunction({
            name: 'cityCloud',
            data: {
                url: '/country/getList',
                pageNum,
                pageSize,
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
        return await db.collection(collectionName).add({
            data: data
        })
    },

    update: async function (data) {
        let _id = data._id
        delete data._id
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