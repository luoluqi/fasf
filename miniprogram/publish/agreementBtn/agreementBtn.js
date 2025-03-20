// publish/agreementBtn/agreementBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked: {
        type: Boolean,
        value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navigator: {
        url: '/publish/agreement/agreement'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e){
        console.log(e)
        this.setData({
            checked: e.detail.checked
        })
    }
  }
})
