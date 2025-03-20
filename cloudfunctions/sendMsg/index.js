const getPrize = require('./module/getPrize')
const openPrize = require('./module/openPrize')
const sendProduct = require('./module/sendProduct')
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    switch(event.type){
        case 'openPrizeSend':
            openPrize.send(event.prizeId)
            break
        case 'getPrizeSend':
            getPrize.send(event.prizeId)
            break
        case 'sendProduct':
            sendProduct.send(event.prizeId)
            break
    }
    return {
        event
    }
}