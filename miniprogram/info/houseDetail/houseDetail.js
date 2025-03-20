import houseApi from '../../api/houseApi'
import houseTagList from '../../utils/houseTagList'
import collectApi from '../../api/collectApi'
import unitBehavior from '../../behaviors/unit'
Page({
  behaviors: [unitBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    house: '',
    demand: [],
    configList: [],
    featureList: [],
    collectObj: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var id = ''
    if (options.scene) {
      var scene = decodeURIComponent(options.scene);
      id = scene
    } else {
      id = options.id
    }
    await this.getDetail(id)

    this.getCollectObj()
  },

  async getDetail(id) {
    let res = await houseApi.get(id)
    this.setData({
      house: res
    })
    for (let item of houseTagList) {
      if (item.title == '出租要求') {
        for (let tag of item.tagList) {
          if (res.tagList.includes(tag)) {
            this.data.demand.push(tag)
          }
        }
      }
      if (item.title == '房屋配置') {
        for (let tag of item.tagList) {
          if (res.tagList.includes(tag)) {
            this.data.configList.push(tag)
          }
        }
      }
      if (item.title == '装修情况' || item.title == '房屋亮点' || item.title == '是否有电梯') {
        for (let tag of item.tagList) {
          if (res.tagList.includes(tag)) {
            this.data.featureList.push(tag)
          }
        }
      }
    }
    this.setData({
      demand: this.data.demand,
      configList: this.data.configList,
      featureList: this.data.featureList
    })

  },

  async getCollectObj() {
    let res = await collectApi.getList({
      pageNum: 1,
      pageSize: 1,
      type: 'house',
      dataId: this.data.house._id,
      openid: wx.getStorageSync('openid')
    })
    if (res.length > 0) {
      this.setData({
        collectObj: res[0]
      })
    }
  },

  async collect() {
    wx.showLoading({
      mask: true,
    })
    if (this.data.collectObj) {
      await collectApi.delete(this.data.collectObj._id)
      this.setData({
        collectObj: ''
      })
    } else {
      let res = await collectApi.add({
        type: 'house',
        dataId: this.data.house._id,
        openid: wx.getStorageSync('openid')
      })
      this.setData({
        collectObj: res
      })

    }
    wx.hideLoading()
  },

  openLocation() {
    wx.openLocation({
      latitude: this.data.house.latitude,
      longitude: this.data.house.longitude,
      address: this.data.house.locationName,
      name: this.data.house.locationName,
    })
  },

  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.house.phone
    })
  },

  onTapSwiper(e) {

    let index = e.detail.index
    wx.previewImage({
      current: this.data.house.imgList[index], // 当前显示图片的http链接
      urls: this.data.house.imgList // 需要预览的图片http链接列表
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
    let title = `${this.data.house.type == 1 ? '整租' : '合租'} ${this.data.house.community}`

    var obj = {
      title: title,
      path: "/info/houseDetail/houseDetail?id=" + this.data.house._id
    }
    if (this.data.house.imgList.length > 0) {
      obj.imageUrl = this.data.house.imgList[0]
    }


    return obj
  }
})