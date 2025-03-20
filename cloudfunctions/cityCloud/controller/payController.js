const BaseController = require('./baseController');
const PayService = require('../service/payService')
class PayController extends  BaseController{
  constructor(){
    super()
    this.payService = new PayService()
  }
  async unifiedOrder(event){
    return await this.payService.unifiedOrder(event)
  }
  async refund(event){
    return await this.payService.refund(event)
  }
  async profitSharing(event){
    return await this.payService.profitSharing(event)
  }
}

module.exports = PayController;