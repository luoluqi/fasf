// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  toMyPublish(){
    wx.navigateTo({
      url: '/myPublish/myPublishIndex/myPublishIndex',
    })
  },

  toMyCollect(){
    wx.navigateTo({
      url: '/myCollect/collectIndex/collectIndex',
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
    this.getTabBar().setData({
      selected: 2
    })
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

  },
  countNum(){
      
    this.data.num ++
    if(this.data.num > 10) {
        this.data.num = 0
        wx.navigateTo({
          url: '/admin/adminIndex/adminIndex',
        })
    }
  }
})