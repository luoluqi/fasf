const BaseController = require('./baseController');
const CityService = require('../service/cityService')
class CityController extends  BaseController{
  constructor(){
    super()
    this.cityService = new CityService()
  }
  async getList(event){
    return await this.cityService.getList(event)
  }
}

module.exports = CityController;