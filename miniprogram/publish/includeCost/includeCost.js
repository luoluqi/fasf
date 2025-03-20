// publish/includeCost/includeCost.js
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
    visible: false,
    current: [],

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
        current: this.data.value
      })
    },

    cancel() {
      this.setData({
        visible: false,

      })
    },
    handleGroupChange(e){
      console.log(e)
      this.setData({
        current: e.detail.value
      })
    },
    confirm(){
      this.triggerEvent("change", this.data.current)
      this.cancel()
    }
  }
})