import jobApi from '../../api/jobApi'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum: 1,
        pageSize: 8,
        list: [],
        isMore: true,
        keyword: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getList(1)
    },
    async getList(num) {
        if (!this.data.isMore) {
            return
        }
        this.data.pageNum = num
        wx.showLoading({
            mask: true
        })
        let res = await jobApi.getList({
            pageNum: num,
            pageSize: this.data.pageSize,
            status: 1,
            cityId: wx.getStorageSync('city')._id,
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


    confirm(e) {
        let detail = e.detail
        console.log(detail)
        this.setData({
            list: [],
            isMore: true,
            keyword: detail
        })
        this.getList(1)
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
        this.getList(this.data.pageNum + 1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})