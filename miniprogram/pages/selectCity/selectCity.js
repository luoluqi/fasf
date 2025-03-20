// pages/selectCity/selectCity.js
import countryApi from '../../api/countryApi'
import cityApi from '../../api/cityApi'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top: 0,
        height: 0,
        countryList: [],
        country: '',
        cityList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.init()
        this.getCountryList()
    },



    async getCountryList() {
        wx.showLoading({
            mask: true,
        })
        let res = await countryApi.getList({
            pageNum: 1,
            pageSize: 1000
        })

        this.setData({
            countryList: res
        })

        if (res.length > 0) {
            this.setData({
                country: res[0]
            })
            await this.getCityList(res[0]._id)
        }

        wx.hideLoading()
    },

    selectCountry(e) {
        let country = e.currentTarget.dataset.country
        this.setData({
            country: country
        })

        this.getCityList(country._id)
    },

    async getCityList(countryId) {
        wx.showLoading({
            mask: true,
        })

        let res = await cityApi.getList({
            pageNum: 1,
            pageSize: 1000,
            countryId,
            keyword: this.data.keyword
        })

        this.setData({
            cityList: res
        })

        wx.hideLoading()
    },

    selectCity(e) {
        let city = e.currentTarget.dataset.city
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('selectCity', city);
        wx.navigateBack()
    },

    async searchConfirm(e){
        let detail = e.detail
        wx.showLoading({
          mask: true,
        })
        let res = await cityApi.getList({
            pageNum: 1,
            pageSize: 1000,
            keyword: detail,
            countryId: this.data.country._id
        })
        this.setData({
            cityList: res,
            keyword: detail,
        })
        wx.hideLoading()
    },

    init() {
        const query = wx.createSelectorQuery()
        query.select('#container').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res) => {
            console.log(res)
            res[0].top // #the-id节点的上边界坐标
            res[1].scrollTop // 显示区域的竖直滚动位置

            this.setData({
                top: res[0].top
            })

            let info = wx.getWindowInfo()

            console.log(info)
            this.setData({
                height: info.windowHeight - this.data.top
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

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