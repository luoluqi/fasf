const BaseController = require('./baseController');
const HouseService = require('../service/houseService')
class HouseController extends  BaseController{
  constructor(){
    super()
    this.houseService = new HouseService()
  }
  async getList(event){
    return await this.houseService.getList(event)
  }
}

module.exports = HouseController;