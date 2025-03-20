// components/agreementTip/agreementTip.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        visible: false
    },

    lifetimes: {
        attached: function () {
            this.init()
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        init() {
            let isAgree = wx.getStorageSync('isAgree')
            if(isAgree){
                return
            }
            this.setData({
                visible: true
            })
        },
        onVisibleChange(e) {
          
        },
        refuse(){
            wx.exitMiniProgram()
        },
        agree(){
            wx.setStorageSync('isAgree', true)
            this.setData({
                visible: false,
            });
        }
    }
})