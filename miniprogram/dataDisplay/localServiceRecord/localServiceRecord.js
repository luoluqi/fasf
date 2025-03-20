import localServiceApi from '../../api/localServiceApi'
import collectApi from '../../api/collectApi'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    localService: {
      type: Object,
      value: {}
    },
    showOperate: {
      type: Boolean,
      value: false
    },
    showUp: {
      type: Boolean,
      value: false
    },
    showDown: {
      type: Boolean,
      value: false
    },
    showEdit: {
      type: Boolean,
      value: false
    },
    showDelete: {
      type: Boolean,
      value: false
    },
    showCollect: {
      type: Boolean,
      value: false
    }
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
    toDetail() {
      let id = this.data.localService._id
      if (this.data.localService.dataId) {
        id = this.data.localService.dataId
      }
      wx.navigateTo({
        url: '/info/localServiceDetail/localServiceDetail?id=' + id,
      })
    },
    async toUp() {
      wx.showLoading({
        mask: true,
      })
      await localServiceApi.update({
        _id: this.data.localService._id,
        status: 1
      })
      wx.hideLoading()
      wx.showToast({
        title: '已上架',
      })
      this.setData({
        'localService.status': 1
      })

    },
    async toDown() {
      wx.showLoading({
        mask: true,
      })
      await localServiceApi.update({
        _id: this.data.localService._id,
        status: 0
      })
      wx.hideLoading()
      wx.showToast({
        title: '已下架',
      })
      this.setData({
        'localService.status': 0
      })
    },
    async toDelete() {
      wx.showModal({
        title: '提示',
        content: '确定删除吗？',
        success: async (res) => {
          if (res.confirm) {
            wx.showLoading({
              mask: true,
            })
            await localServiceApi.delete(this.data.localService._id)
            this.triggerEvent('delete', this.data.localService._id)
            wx.hideLoading()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    async uncollect() {
      wx.showModal({
        title: '提示',
        content: '确定取消收藏吗？',
        success: async (res) => {
          if (res.confirm) {
            wx.showLoading({
              mask: true,
            })
            await collectApi.delete(this.data.localService._id)
            this.triggerEvent('uncollect', this.data.localService._id)
            wx.hideLoading()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    async toEdit(){
      let id = this.data.localService._id
     
      wx.navigateTo({
        url: '/publish/localService/localService?_id=' + id,
      })
    }
  }
})