import houseApi from '../../api/houseApi'
import houseTagList from '../../utils/houseTagList'
import collectApi from '../../api/collectApi'
import unitBehavior from '../../behaviors/unit'
Component({
  behaviors: [unitBehavior],

    /**
     * 组件的属性列表
     */
    properties: {
        house: {
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
        tagList: []
    },
    observers: {
        'house': function () {
            this.setTagList()
        }
    },

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {},
        moved: function () {},
        detached: function () {},
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toDetail() {
            let id = this.data.house._id
            if(this.data.house.dataId){
                id = this.data.house.dataId
            }
            wx.navigateTo({
                url: '/info/houseDetail/houseDetail?id=' + id,
            })
        },
        setTagList() {

            let list = []
            for (let item of houseTagList) {
                if (item.title == '装修情况' || item.title == '房屋亮点' || item.title == '是否有电梯') {
                    list = list.concat(item.tagList)
                }
            }
            let arr = []
            for (let item of this.data.house.tagList) {
                if (list.includes(item)) {
                    arr.push(item)
                }
            }
            this.setData({
                tagList: arr
            })
        },
        async toUp() {
            wx.showLoading({
                mask: true,
            })
            await houseApi.update({
                _id: this.data.house._id,
                status: 1
            })
            wx.hideLoading()
            wx.showToast({
                title: '已上架',
            })
            this.setData({
                'house.status': 1
            })

        },
        async toDown() {
            wx.showLoading({
                mask: true,
            })
            await houseApi.update({
                _id: this.data.house._id,
                status: 0
            })
            wx.hideLoading()
            wx.showToast({
                title: '已下架',
            })
            this.setData({
                'house.status': 0
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
                        await houseApi.delete(this.data.house._id)
                        this.triggerEvent('delete', this.data.house._id)
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
                        await collectApi.delete(this.data.house._id)
                        this.triggerEvent('uncollect', this.data.house._id)
                        wx.hideLoading()
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        async toEdit(){
          let id = this.data.house._id
           
          wx.navigateTo({
            url: '/publish/house/house?_id=' + id,
          })
        }
    }
})