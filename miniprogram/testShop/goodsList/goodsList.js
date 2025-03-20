// testShop/goodsList/goodsList.js
import orderApi from '../../api/orderApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  toOrderList(){
    wx.navigateTo({
      url: '/testShop/testOrder/testOrder',
    })
  },

  async buy(e) {
    
    wx.showLoading({
      mask: true
    })
    let res = await orderApi.add({
      status: 0,
      title: '商品1'
    })
    console.log(res)

    res = await wx.cloud.callFunction({
      name: 'cityCloud',
      data: {
        url: '/pay/unifiedOrder',
        outTradeNo: res._id,
        body: '商品1',
        totalFee: parseInt(e.currentTarget.dataset.fee) ,

      }
    })
    console.log(res.result)
    wx.hideLoading()

    wx.requestPayment({
      ...res.result.payment,
      success (res) {
        console.log('pay success', res)
      },
      fail (err) {
        console.error('pay fail', err)
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