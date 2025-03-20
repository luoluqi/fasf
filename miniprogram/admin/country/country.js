// admin/country/country.js
import countryApi from '../../api/countryApi'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: [
      {
        text: '编辑',
        className: 'btn edit-btn',
      },
      {
        text: '删除',
        className: 'btn delete-btn',
      },
    ],
    addVisible: false,
    submitType: 'add',
    name: '',
    english: '',
    sort: 1,
    list: [],
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
  },

  async onActionClick(e){
    console.log(e)
    let item = e.currentTarget.dataset.item
    let text = e.detail.text
    this.setData({
      item
    })
    if(text == '编辑') {
      // 编辑
      this.setData({
        addVisible: true,
        submitType: 'update',
        name: item.name,
        english: item.english,
        sort: item.sort
      })
    } else {
      // 删除
      this.deleteCountry()
      
    }
  },
  onCellClick(e){
    console.log(e)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/admin/city/city?countryId=${item._id}&countryName=${item.name}`,
    })
  },

  async deleteCountry(){
    let self = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      async success (res) {
        if (res.confirm) {
          await countryApi.delete(self.data.item._id)
          self.getList()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

   
  },

  async submit(){
    wx.showLoading({
      mask: true
    })
    if(this.data.submitType == 'add'){
      await countryApi.add({
        name: this.data.name,
        english: this.data.english,
        sort:  parseInt(this.data.sort + '') 
      })
    } else {
      await countryApi.update({
        _id: this.data.item._id,
        name: this.data.name,
        english: this.data.english,
        sort:  parseInt(this.data.sort + '') 
      })
    }
    wx.hideLoading()
    this.setData({
      addVisible: false
    })
    this.getList()
  },

  async getList(){
    let res = await countryApi.getList({
      pageNum: 1,
      pageSize: 1000
    })
    this.setData({
      list: res
    })
  },

  toAdd(){
    this.setData({
      addVisible: true,
      submitType: 'add',
      name: '',
      english:'',
      sort: 1
    })
  },

  onAddVisibleChange(e){
    this.setData({
      addVisible: e.detail.visible
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