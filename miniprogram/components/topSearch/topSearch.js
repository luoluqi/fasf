// components/topSearch/topSearch.js
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
    keyword: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBack(){
      wx.navigateBack()
    },
    toSearchPage(){
      let self = this
      wx.navigateTo({
        url: '/pages/search/search',
        events: {
          confirm: function(data){
            self.setData({
              keyword: data
            })
    
            self.triggerEvent('confirm', data)
          }
        }
      })
    },
    closeTag(){
      this.setData({
        keyword: ''
      })
      this.triggerEvent('confirm', '')
    },
    stop(){
      
    }
  }
})