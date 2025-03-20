var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    qqmapsdk = new QQMapWX({
      key: 'U3DBZ-LN6LW-GZLRI-3ZINO-XL6VV-5GBY5'
    });

    // qqmapsdk.geocoder({
    //   address: "列治文",
    //   success(res){
    //     console.log(res)
    //   },
    //   fail(err){
    //     console.log(err)
    //   }
    // })
  },

  tapMap(e) {
    console.log(e.detail)
    this.setData({
      latitude: e.detail.latitude,
        longitude: e.detail.longitude
    })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: e.detail.latitude,
        longitude: e.detail.longitude
      },
      success(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})