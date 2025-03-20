
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Array,
      value: []
    },
    /**当前楼层 */
    curFloor: {
      type: Number,
      value: 0
    },
    /**总楼层 */
    totalFloor: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    floorList: [
      // { label: '2021年', value: '2021' },
    ],
    totalList: [
      // { label: '春', value: '春' },
    ],

    showCurFloor: 1,
    showTotalFloor: 1
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
        showCurFloor: this.data.curFloor,
        showTotalFloor: this.data.totalFloor,
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
        curFloor: e.detail.value[0],
        totalFloor: e.detail.value[1]
      })
      this.cancel()
    },
    onColumnChange(e) {
      console.log('onColumnChange:')
      console.log(e)
      this.setData({
        showCurFloor: e.detail.value[0],
        showTotalFloor: e.detail.value[1]
      })
    },
    init() {
      this.data.floorList = []
      this.data.totalList = []

      for (let i = -2; i < 100; i++) {
        if (i == 0) {
          continue
        }
        this.data.floorList.push({
          label: `${i}层`,
          value: i
        })
      }
      for (let i = 1; i < 100; i++) {
        this.data.totalList.push({
          label: `共${i}层`,
          value: i
        })
      }
      this.setData({
        floorList: this.data.floorList,
        totalList: this.data.totalList
      })

   
    },

  }
})