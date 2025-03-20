const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate
const collectionName = 'localService'
export default {
    getList: async function ({
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
            matchObj.title = db.RegExp({
                regexp: keyword,
                options: 'i',
            })
        }

        let res = await db.collection(collectionName)
            .where(matchObj)
            .orderBy('createTime', 'desc')
            .skip(skip)
            .limit(pageSize)
            .get()
        
        return res.data
    },
    get: async function (id) {
        let res = await db.collection(collectionName).doc(id).get()
        return res.data
    },
    add: async function (data) {
        data.createTime = new Date()
        if(data.longitude){
            data.location = new db.Geo.Point(data.longitude, data.latitude)
        }
        
        return await db.collection(collectionName).add({
            data: data
        })
    },

    update: async function (data) {
        let _id = data._id
        delete data._id
        if(data.longitude){
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