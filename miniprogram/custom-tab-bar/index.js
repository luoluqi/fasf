Component({
  data: {
    value: 'label_1',
    list: [
      { value: 'label_1', label: '首页', icon: 'home' },
      { value: 'label_2', label: '应用', icon: 'app' },
      { value: 'label_3', label: '聊天', icon: 'chat' },
      { value: 'label_4', label: '我的', icon: 'user' },
    ],

    selected: 0,
    color: "#72777d",
    selectedColor: "#268EFF",
    // list: [{
    //   pagePath: "pages/activeList/activeList",
    //   iconPath: "/images/22.png",
    //   selectedIconPath: "/images/21.png",
    //   text: "钓鱼点"
    // }, {
    //   pagePath: "/index/index2",
    //   iconPath: "/image/icon_API.png",
    //   selectedIconPath: "/image/icon_API_HL.png",
    //   text: "接口"
    // }]
  },
  attached() {
  },
  methods: {
    onChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
    },
    toAdd(){
      wx.navigateTo({
        url: '/publish/publishType/publishType'
      })
    }
  }
})