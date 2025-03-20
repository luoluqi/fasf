const BaseController = require('./baseController');
const CountryService = require('../service/countryService')
class CountryController extends  BaseController{
  constructor(){
    super()
    this.countryService = new CountryService()
  }
  async getList(event){
    return await this.countryService.getList(event)
  }
}

module.exports = CountryController;