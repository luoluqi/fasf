// pages/map/map.js
import houseApi from '../../api/houseApi'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        longitude: 0,
        latitude: 0,
        markers: [],
        city: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let city = wx.getStorageSync('city')
        this.setData({
            longitude: city.longitude,
            latitude: city.latitude,
            city
        })

        this.getAllList()
    },

    onShow() {
        this.getTabBar().setData({
            selected: 1
        })

        const city = wx.getStorageSync('city')
        
        if(this.data.city._id != city._id){
            this.setData({
                longitude: city.longitude,
                latitude: city.latitude,
                city
            })
    
            this.getAllList()
        }
    },

    async getAllList() {
        wx.showLoading({
            mask: true,
        })
        let res = await houseApi.getAllList({
            pageNum: 1,
            pageSize: 1000,
            cityId: this.data.city._id,
            status: 1
        })
        wx.hideLoading()

        let list = []

        for (let item of res) {

            list.push({
                id: item._id,
                latitude: item.latitude,
                longitude: item.longitude,
                name: item.locationName,
                iconPath: '/images/location.png',
                width: 23,
                height: 31,
                callout: {
                    content: item.money,
                    display: "ALWAYS",
                    padding: 5,
                    bgColor: '#fe552e',
                    color: '#fff',
                    fontSize: 20
                }
            })
        }
        this.setData({
            markers: list
        })
    },

    onMarkerTap(e) {
        let id = e.detail.markerId
        
        wx.navigateTo({
            url: '/info/houseDetail/houseDetail?id=' + id,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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