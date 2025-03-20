const map = {
  '加拿大': '加币',
  '美国': '美元',
  '中国': '元',
}

module.exports = Behavior({
  
  data: {
    unitStr: ''
  },
  attached: function(){
    let city = wx.getStorageSync('city')
    this.setData({
      unitStr: map[city.countryName]
    })
  },
  
})
