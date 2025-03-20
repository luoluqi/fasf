const BaseController = require('./baseController');
const CollectService = require('../service/collectService')
class CollectOrder extends  BaseController{
  constructor(){
    super()
    this.collectService = new CollectService()
  }
  async getCollectList(event){
    return await this.collectService.getCollectList(event)
  }
 
}

module.exports = CollectOrder;