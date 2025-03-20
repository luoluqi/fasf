import orderApi from '../../api/orderApi'

// testShop/testOrder/testOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 10,
    list: [],
    isMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList(1)
  },

  async getList(num) {
    if (!this.data.isMore) {
      return
    }
    this.data.pageNum = num
    let res = await orderApi.getList({
      pageNum: num,
      pageSize: this.data.pageSize,
      // openid: wx.getStorageSync('openid')
    })
    console.log(res)
    if (res.length < this.data.pageSize) {
      this.setData({
        isMore: false
      })
    }
    this.setData({
      list: res
    })
  },

  async refund(e) {

    wx.showLoading({
      mask: true
    })
    let res = await wx.cloud.callFunction({
      name: 'cityCloud',
      data: {
        url: '/pay/refund',
        outTradeNo: e.currentTarget.dataset.id,
        refundFee: 1,
        totalFee: 1,

      }
    })
    console.log(res)
    wx.hideLoading()

  },
  async share(e) {

    let item = e.currentTarget.dataset.item
    wx.showLoading({
      mask: true
    })
    let res = await wx.cloud.callFunction({
      name: 'cityCloud',
      data: {
        url: '/pay/profitSharing',
        outTradeNo: item._id,
        transactionId: item.transactionId,
        receivers: JSON.stringify([{
          "type": "PERSONAL_OPENID",
          "account": wx.getStorageSync('openid'),
          "amount": 1,
          "description": "分到个人"
        }])
      }
    })
    console.log(res)
    wx.hideLoading()
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