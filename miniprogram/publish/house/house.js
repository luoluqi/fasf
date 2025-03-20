// publish/rent/rent.js
import dayjs from 'dayjs'
import houseApi from '.././../api/houseApi'
import msgCheck from '../../utils/msgCheck'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        /**城市id */
        cityId: '',
        /**城市名称 */
        cityName: '',
        /**小区名称 */
        community: '',
        /**楼栋号 */
        doorNum: '',
        /**楼层 */
        curFloor: 0,
        /**总楼层 */
        totalFloor: 0,
        /**面积 */
        area: '',
        /**室数量 */
        roomNum: 0,
        /**厅数量 */
        hallNum: 0,
        /**卫生间数量 */
        toiletNum: 0,
        /**朝向 */
        dir: '',

        /**租金 */
        money: '',
        /**付款方式 */
        payType: '',
        /**包含费用 */
        cost: [],
        /**看房时间 */
        lookTime: '',
        lookTimeOptions: [{
                label: '仅周末',
                value: '仅周末'
            },
            {
                label: '仅工作日',
                value: '仅工作日'
            },
            {
                label: '随时看房',
                value: '随时看房'
            },
            {
                label: '工作日晚上和周末',
                value: '工作日晚上和周末'
            },
        ],
        /**入驻时间 */
        liveTime: dayjs().format('YYYY-MM-DD'),
        /**租房类型 */
        type: '',
        typeOptions: [{
                label: '整租',
                value: 1
            },
            {
                label: '合租',
                value: 2
            },

        ],
        /**标签 */
        tagList: [],
        /**描述 */
        remark: '',
        /**位置名称 */
        locationName: '',
        /**经度 */
        longitude: 0,
        /*纬度 */
        latitude: 0,
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
        title: '修改租房'
      })
      let res = await houseApi.get(_id)
      console.log(res)
      this.setData({
        ...res
      })
      const uploadImgCom = this.selectComponent("#uploadImg")
      uploadImgCom.setData({
        ...res
      })
    },


    costChange(e) {
        this.setData({
            cost: e.detail
        })
    },

    tagChange(e) {

        this.setData({
            tagList: e.detail
        })
    },

    async submit() {
        let params = {
            cityId: this.data.cityId,
            cityName: this.data.cityName,
            type: this.data.type,
            locationName: this.data.locationName,
            longitude: this.data.longitude,
            latitude: this.data.latitude,
            community: this.data.community,
            // doorNum: this.data.doorNum,
            curFloor: this.data.curFloor,
            totalFloor: this.data.totalFloor,
            area: this.data.area,
            roomNum: this.data.roomNum,
            hallNum: this.data.hallNum,
            toiletNum: this.data.toiletNum,
            dir: this.data.dir,
            cost: this.data.cost,
            money: this.data.money,
            payType: this.data.payType,
            lookTime: this.data.lookTime,
            liveTime: this.data.liveTime,
            tagList: this.data.tagList,
            remark: this.data.remark,
            phone: this.data.phone,
            wechat: this.data.wechat,
            status: 1,
            openid: wx.getStorageSync('openid')
        }
        const required = {
            type: '请选择租房类型',
            locationName: '请选择位置',
            community: '请输入小区名称',
            // doorNum: '请输入楼栋号',
            curFloor: '请选择楼层',
            area: '请选择房屋面积',
            roomNum: '请选择户型朝向',
            money: '请选择月租金',
            lookTime: '请选择看房时间',
            liveTime: '请选择入住时间',
            tagList: '请选择房屋标签',
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
                title: '请选择房源图片',
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

        let pass = await msgCheck(this.data.community + this.data.remark)
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
          res = await houseApi.update(params)
          res._id = this.data._id
        } else {
          res = await houseApi.add(params)
        }
        
        wx.hideLoading()
        wx.showToast({
            title: '发布成功',
        })

        wx.redirectTo({
            url: '/info/houseDetail/houseDetail?id=' + res._id,
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