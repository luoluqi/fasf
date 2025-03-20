const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database({
  throwOnNotFound: false
})
const $ = db.command.aggregate
const _ = db.command
class BaseService {
  constructor(){
    this.cloud = cloud
    this.db = db
    this.$ = $
    this._ = _
  }
}
module.exports = BaseService