
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    longitude: {
      type: Number,
      value: 0
    },
    latitude: {
      type: Number,
      value: 0
    },
    locationName: {
      type: String,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    open(){
        
      wx.chooseLocation({
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        success: (res) => {

          this.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            locationName: res.address
          })

          // debugger
          // wx.setStorageSync('longitude', res.longitude)
          // wx.setStorageSync('latitude', res.latitude)
          // wx.setStorageSync('address', res.address)
          // wx.setStorageSync('addressName', res.name)
         
        }
      })
    }
  }
})