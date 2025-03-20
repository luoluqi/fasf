// publish/houseTag/houseTag.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Array,
      value: []
    }
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
    toTagList(){
      let self = this
      wx.navigateTo({
        url: '/publish/tagList/tagList',
        events: {
          confirm(data){
            
            // self.setData({
            //   value: data
            // })

            self.triggerEvent('change', data)
          }
        },
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('select', this.data.value)
        }
      })
    },
  }
})