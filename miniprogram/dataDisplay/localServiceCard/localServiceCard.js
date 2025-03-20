
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    localService: {
        type: Object,
        value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagList: []
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
        
    },
    moved: function () {},
    detached: function () {},
},

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
        let id = this.data.localService._id
       
        wx.navigateTo({
            url: '/info/localServiceDetail/localServiceDetail?id=' + id,
        })
    },

  }
})