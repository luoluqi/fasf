import secHandApi from '../../api/secHandApi'
import collectApi from '../../api/collectApi'
import unitBehavior from '../../behaviors/unit'
Page({
  behaviors: [unitBehavior],

    /**
     * 页面的初始数据
     */
    data: {
        secHand: '',
        collectObj: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var id = ''
        if (options.scene) {
            var scene = decodeURIComponent(options.scene);
            id = scene
        } else {
            id = options.id
        }
        this.getDetail(id)
    },

    async getDetail(id) {
        let res = await secHandApi.get(id)
        this.setData({
            secHand: res
        })

        res = await collectApi.getList({
            pageNum:1,
            pageSize: 1,
            type: 'secHand',
            dataId: this.data.secHand._id,
            openid: wx.getStorageSync('openid')
        })
        if(res.length > 0) {
            this.setData({
                collectObj: res[0]
            })
        }
    },

    async collect(){
        wx.showLoading({
          mask: true,
        })
        if(this.data.collectObj){
            await collectApi.delete(this.data.collectObj._id)
            this.setData({
                collectObj: ''
            })
        } else {
            let res = await collectApi.add({
                type: 'secHand',
                dataId: this.data.secHand._id,
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
            latitude: this.data.secHand.latitude,
            longitude: this.data.secHand.longitude,
            address: this.data.secHand.locationName,
            name: this.data.secHand.locationName,
        })
    },

    callPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.secHand.phone
        })
    },

    onTapSwiper(e) {

        let index = e.detail.index
        wx.previewImage({
            current: this.data.secHand.imgList[index], // 当前显示图片的http链接
            urls: this.data.secHand.imgList // 需要预览的图片http链接列表
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
     
        var obj = {
            title: this.data.secHand.title,
            path: "/info/secHandDetail/secHandDetail?id=" + this.data.secHand._id
        }
        if (this.data.secHand.imgList.length > 0) {
            obj.imageUrl = this.data.secHand.imgList[0]
        }


        return obj
    }
})