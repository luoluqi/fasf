import {
    getLocation,
    chooseLocation
} from '../../utils/location'
import cityApi from '../../api/cityApi'
import houseApi from '../../api/houseApi'
import {getHomeList} from './homeList'
import test from '../../utils/test'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        city: {},
        pageNum: 1,
        pageSize: 4,
        list: [],
        isMore: true,
        keyword: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        // wx.getSetting({
        //     success(res) {
        //         console.log(res.authSetting)
        //         res.authSetting['scope.userFuzzyLocation']
                
        //         wx.showModal({
        //           title: '111',
        //           content: res.authSetting['scope.userFuzzyLocation'] + '',
        //         })
        //     }
        // })
        test.test()
        await this.getNearCity()
        this.refresh()
    },

    async getNearCity() {
        let storeCity = wx.getStorageSync('city')
        if (storeCity) {
            this.setData({
                city: storeCity
            })
            return
        }
        wx.showLoading({
            mask: true,
        })
        await getLocation(true)
        let res = await cityApi.near({
            longitude: wx.getStorageSync('longitude'),
            latitude: wx.getStorageSync('latitude'),
            pageNum: 1,
            pageSize: 1
        })
        wx.hideLoading()
        wx.setStorageSync('city', res[0])
        this.setData({
            city: res[0]
        })
    },

    toSelectCity() {
        wx.navigateTo({
            url: '/pages/selectCity/selectCity',
            events: {
                selectCity: (data) => {
                    console.log(data)
                    wx.setStorageSync('city', data)
                    this.setData({
                        city: data
                    })
                    this.refresh()
                }
            }
        })
    },

    toSearch() {
        let self = this
        wx.navigateTo({
            url: '/pages/search/search',
            events: {
                confirm: (data) => {
                    self.setData({
                        keyword: data
                    })
                    this.refresh()
                }
            }
        })
    },

    closeTag() {
        this.setData({
            keyword: ''
        })
        this.refresh()
    },

    async refresh() {
        this.setData({
            list: [],
            isMore: true,
        })
        await this.getList(1)
    },
    async getList(num) {
        if (!this.data.isMore) {
            return
        }
        this.data.pageNum = num
        wx.showLoading({
            mask: true
        })
        // let res = await houseApi.getList({
        //     pageNum: num,
        //     pageSize: this.data.pageSize,
        //     status: 1,
        //     cityId: wx.getStorageSync('city')._id,
        //     keyword: this.data.keyword
        // })
        let res = await getHomeList({
          pageNum: num,
          pageSize: this.data.pageSize,
          keyword: this.data.keyword
        })
        wx.hideLoading()
      
        this.setData({
            list: this.data.list.concat(res)
        })

        if (res.length < this.data.pageSize) {
            this.setData({
                isMore: false
            })
        }
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
            selected: 0
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
    async onPullDownRefresh() {
        await this.refresh()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
      this.getList(this.data.pageNum + 1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})