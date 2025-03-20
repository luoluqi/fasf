// components/topSpace/topSpace.js
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
    height: 0
  },

  lifetimes: {
    attached: function () {
      this.init()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { }, 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      let res = wx.getMenuButtonBoundingClientRect()
      this.setData({
        height: res.height
      })
    }
  }
})