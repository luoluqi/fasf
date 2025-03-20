// publish/rent/rent.js
import localServiceApi from '../../api/localServiceApi'
import msgCheck from '../../utils/msgCheck'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cityId: '',
        cityName: '',
        /**标题 */
        title: '',
        /**描述 */
        remark: '',
        price: '',
        /*联系电话 */
        phone: '',
        /**微信号 */
        wechat: '',
        isAgree: false,
        _id: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if(options._id){
        this.getDetail(options._id)
      }
    },
    async getDetail(_id){
      wx.setNavigationBarTitle({
        title: '修改本地服务'
      })
      let res = await localServiceApi.get(_id)
      console.log(res)
      this.setData({
        ...res
      })
      const uploadImgCom = this.selectComponent("#uploadImg")
      uploadImgCom.setData({
        ...res
      })
    },
    async submit() {
        let params = {
            cityId: this.data.cityId,
            cityName: this.data.cityName,
            // locationName: this.data.locationName,
            // longitude: this.data.longitude,
            // latitude: this.data.latitude,
            title: this.data.title,
            remark: this.data.remark,
            // price: this.data.price,
            phone: this.data.phone,
            wechat: this.data.wechat,
            status: 1,
            openid: wx.getStorageSync('openid')
        }
        const required = {
            title: '请输入标题',
            remark: '请输入简介',
            // price: '请输入价格',
            // locationName: '请选择位置',
            // phone: '请输入电话号码',
        }
        for (let key in required) {
            if (!params[key] || params[key].length == 0) {
                wx.showToast({
                    icon: 'none',
                    title: required[key],
                })
                return
            }
        }

        if (!this.data.phone && !this.data.wechat) {
            wx.showToast({
                icon: 'none',
                title: '请填写手机或者微信号',
            })
            return
        }

        const uploadImgCom = this.selectComponent("#uploadImg")
        if (uploadImgCom.data.imgList.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '请选择图片',
            })
            return
        }

        // if(!this.data.isAgree){
        //     wx.showToast({
        //         icon: 'none',
        //         title: '请同意用户服务协议',
        //     })
        //     return
        // }

        let pass = await msgCheck(this.data.title + this.data.remark)
        if (!pass) {
            return
        }

        pass = await uploadImgCom.imgCheck(this.data.imgList)
        if (!pass) {
            return
        }

        wx.showLoading({
            title: '正在发布',
            mask: true
        })
        let res = await uploadImgCom.upload()
        params.fileList = res.map((f) => f.fileID)
        params.imgList = res.map((f) => f.tempFileURL)
        console.log(params)
        if(this.data._id){
          params._id = this.data._id
          res = await localServiceApi.update(params)
          res._id = this.data._id
        } else {
          res = await localServiceApi.add(params)
        }
        
        wx.hideLoading()
        wx.showToast({
            title: this.data._id ? '修改成功' : '发布成功',
        })

        wx.redirectTo({
            url: '/info/localServiceDetail/localServiceDetail?id=' + res._id,
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

    }
})