// publish/tagList/tagList.js
import houseTagList from '../../utils/houseTagList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: [],
    list: houseTagList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
   
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('select', (data) => {
      this.setData({
        selected: data
      })
    })
  },

  onTag(e){
    let tag = e.currentTarget.dataset.tag
    let index = -1
    for(let i = 0; i < this.data.selected.length; i++){
      if(tag == this.data.selected[i]){
        index = i
      }
    }
    if(index == -1){
      this.data.selected.push(tag)
    } else {
      this.data.selected.splice(index, 1)
    }
    this.setData({
      selected: this.data.selected
    })
  },

  confirm(){
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('confirm', this.data.selected);
    wx.navigateBack()
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