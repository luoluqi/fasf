// myPublish/myPublishIndex/myPublishIndex.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    onTabsChange(e) {
        console.log(e)
        this.setData({
            tabIndex: e.detail.value
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
        console.log('on reach bottom...')
        switch (this.data.tabIndex) {
            case 0:
                const jobList = this.selectComponent("#jobList")
                jobList.getList(jobList.data.pageNum + 1)
                break;
            case 1:
                const houseList = this.selectComponent("#houseList")
                houseList.getList(houseList.data.pageNum + 1)
                break;
            case 2:
                const secHandList = this.selectComponent("#secHandList")
                secHandList.getList(secHandList.data.pageNum + 1)
                break;
            case 3:
                const localServiceList = this.selectComponent("#localServiceList")
                localServiceList.getList(localServiceList.data.pageNum + 1)
                break;
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})