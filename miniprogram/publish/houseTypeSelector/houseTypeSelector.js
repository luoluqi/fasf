Component({

  /**
   * 组件的属性列表
   */
  properties: {
    roomNum: {
      type: Number,
      value: 0
    },
    hallNum: {
      type: Number,
      value: 0
    },
    toiletNum: {
      type: Number,
      value: 0
    },
    dir: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    headType: 1,
    roomData: [],
    hallData: [],
    wcData: [],
    dirData: [{
        label: '东',
        value: '东'
      },
      {
        label: '南',
        value: '南'
      },
      {
        label: '西',
        value: '西'
      },
      {
        label: '北',
        value: '北'
      },
      {
        label: '东南',
        value: '东南'
      },
      {
        label: '东北',
        value: '东北'
      },
      {
        label: '西南',
        value: '西南'
      },
      {
        label: '西北',
        value: '西北'
      },
      {
        label: '南北',
        value: '南北'
      },
      {
        label: '东西',
        value: '东西'
      },
    ],

    showRoomNum: 0,
    showHallNum: 0,
    showToiletNum: 0,
    showDir: ''
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
        headType: 1,
        showRoomNum: this.data.roomNum,
        showHallNum: this.data.hallNum,
        showToiletNum: this.toiletNum,
      })
    },

    cancel() {
      this.setData({
        visible: false,

      })
    },

    selectHead(e) {
      this.setData({
        headType: e.currentTarget.dataset.type
      })
    },

    onPickerChange(e) {
      console.log('onPickerChange:')
      console.log(e)

      if (this.data.headType == 1) {
        this.setData({
          showRoomNum: e.detail.value[0],
          showHallNum: e.detail.value[1],
          showToiletNum: e.detail.value[2],
        })
        this.setData({
          headType: 2
        })
        return
      }

      if (this.data.headType == 2) {
        this.setData({
          showDir: e.detail.value[0]
        })
      }


      this.setData({
        roomNum: this.data.showRoomNum,
        hallNum: this.data.showHallNum,
        toiletNum: this.data.showToiletNum,
        dir: this.data.showDir
      })

      this.cancel()
    },
    onColumnChange(e) {
      console.log('onColumnChange:')
      console.log(e)
      if (this.data.headType == 1) {
        this.setData({
          showRoomNum: e.detail.value[0],
          showHallNum: e.detail.value[1],
          showToiletNum: e.detail.value[2],
        })
      } else {
        this.setData({
          showDir: e.detail.value[0]
        })
      }

    },
    init() {
      this.data.roomData = []
      this.data.hallData = []
      this.data.wcData = []

      for (let i = 1; i < 21; i++) {
        this.data.roomData.push({
          label: `${i}室`,
          value: i
        })
      }
      for (let i = 0; i < 10; i++) {
        this.data.hallData.push({
          label: `${i}厅`,
          value: i
        })
      }
      for (let i = 0; i < 10; i++) {
        this.data.wcData.push({
          label: `${i}卫`,
          value: i
        })
      }

      this.setData({
        roomData: this.data.roomData,
        hallData: this.data.hallData,
        wcData: this.data.wcData
      })
    },

  }
})