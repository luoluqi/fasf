import jobApi from '../../api/jobApi'
import collectApi from '../../api/collectApi'
import unitBehavior from '../../behaviors/unit'
Component({
  behaviors: [unitBehavior],

    /**
     * 组件的属性列表
     */
    properties: {
        job: {
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
            let id = ''
            if (this.data.job.dataId) {
                id = this.data.job.dataId
            } else {
                id = this.data.job._id
            }
            wx.navigateTo({
                url: '/info/jobDetail/jobDetail?id=' + id,
            })
        },
        
        async toUp() {
            wx.showLoading({
                mask: true,
            })
            await jobApi.update({
                _id: this.data.job._id,
                status: 1
            })
            wx.hideLoading()
            wx.showToast({
                title: '已上架',
            })
            this.setData({
                'job.status': 1
            })

        },
        async toDown() {
            wx.showLoading({
                mask: true,
            })
            await jobApi.update({
                _id: this.data.job._id,
                status: 0
            })
            wx.hideLoading()
            wx.showToast({
                title: '已下架',
            })
            this.setData({
                'job.status': 0
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
                        await jobApi.delete(this.data.job._id)
                        this.triggerEvent('delete', this.data.job._id)
                        wx.hideLoading()
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        async uncollect(){
            wx.showModal({
                title: '提示',
                content: '确定取消收藏吗？',
                success: async (res) => {
                    if (res.confirm) {
                        wx.showLoading({
                            mask: true,
                        })
                        await collectApi.delete(this.data.job._id)
                        this.triggerEvent('uncollect', this.data.job._id)
                        wx.hideLoading()
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        toEdit() {
          let id = this.data.job._id
         
          wx.navigateTo({
            url: '/publish/seekJob/seekJob?_id=' + id,
          })
      },
    }
})