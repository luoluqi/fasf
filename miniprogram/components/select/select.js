// components/select/select.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '请选择'
    },
    options: {
      type: Array,
      value: []
    },
    value: {
      type: String,
      value: ''
    }
  },

  observers: {
    "value": function(){
      this.init()
    }
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
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    _value: [],
    _label: ''
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
    onPickerChange(e) {
      console.log('onPickerChange:')
      console.log(e)
      this.setData({
        value: e.detail.value[0],
        _value: e.detail.value,
        _label: e.detail.label
      })
 
      this.cancel()
    },
    onColumnChange(e) {
      console.log('onColumnChange:')
      console.log(e)
     
    },
    init() {
     
      for(let item of this.data.options){
        if(item.value == this.data.value){
          this.setData({
            _label: item.label
          })
        }
      }
      this.setData({
        _value: [this.data.value]
      })
    }
  }
})