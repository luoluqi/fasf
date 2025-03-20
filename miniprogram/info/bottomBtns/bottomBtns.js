// info/bottomBtns/bottomBtns.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        status: Number,
        isCollect: Boolean,
        phone: String,
        wechat: String,
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
        collect() {
            this.triggerEvent('collect')
        },
        callPhone() {
            wx.makePhoneCall({
                phoneNumber: this.data.phone
            })
        },
        showWechat() {
            wx.showModal({
                title: '复制微信号',
                content: this.data.wechat,
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.setClipboardData({
                            data: this.data.wechat,
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    }
})