const BaseController = require('./baseController');
const PointService = require('../service/pointService')
class PointOrder extends  BaseController{
  constructor(){
    super()
    this.pointService = new PointService()
  }
  async getMyOrderList(event){
    return await this.pointService.getMyOrderList(event)
  }
  async exchange(event){
    return await this.pointService.exchange(event)
  }
}

module.exports = PointOrder;