// components/dateTimePicker/dateTimePicker.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '选择日期'
    },
    mode: {
      type: String,
      value: 'date'
    },
    format: {
      type: String,
      value: 'YYYY-MM-DD'
    },
    value: {
      type: String,
      value: ''
    },
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
    onConfirm(e){
      console.log('onConfirm')
      console.log(e)
      this.setData({
        value: e.detail.value
      })

      this.cancel()
    },
    onColumnChange(e){
      console.log('onColumnChange')
      console.log(e)
    },
   
  }
})