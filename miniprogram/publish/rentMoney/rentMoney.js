
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    money: {
      type: String,
      value: ''
    },
    payType: {
      type: String,
      value: ''
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
  
    payList: [
      '押1付1', '押1付3', '半年付', '一年付'
    ],
   
  },

  lifetimes: {
    attached: function () {
     
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    open() {
      this.setData({
        visible: true,
       
      })
    },

    cancel() {
      this.setData({
        visible: false,

      })
    },
    onPay(e){
      this.setData({
        payType: e.currentTarget.dataset.item
      })
    },
    confirm(){
      this.setData({
        money: this.data.money,
        payType: this.data.payType
      })
      this.cancel()
    }
  }
})