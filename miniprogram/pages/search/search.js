// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let his = wx.getStorageSync('searchHistory')
    if (!his) {
      his = []
    }
    this.setData({
      searchHistory: his
    })
  },

  confirm(e) {
    let detail = e.detail
    if(!detail){
      return
    }
    this.data.searchHistory.push(detail)
    // 去重
    this.data.searchHistory = Array.from(new Set(this.data.searchHistory))
    wx.setStorageSync('searchHistory', this.data.searchHistory)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('confirm', detail);
    wx.navigateBack()
  },

  select(e){
   
    let item = e.currentTarget.dataset.item
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('confirm', item);
    wx.navigateBack()
  },

  clear(){
    wx.removeStorageSync('searchHistory')
    this.setData({
      searchHistory: []
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