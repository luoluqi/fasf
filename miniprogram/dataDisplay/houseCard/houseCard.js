import houseTagList from '../../utils/houseTagList'
import unitBehavior from '../../behaviors/unit'
Component({
  behaviors: [unitBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    house: {
        type: Object,
        value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagList: []
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
        this.setTagList()
    },
    moved: function () {},
    detached: function () {},
},

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
        let id = this.data.house._id
       
        wx.navigateTo({
            url: '/info/houseDetail/houseDetail?id=' + id,
        })
    },
    setTagList() {

        let list = []
        for (let item of houseTagList) {
            if (item.title == '装修情况' || item.title == '房屋亮点' || item.title == '是否有电梯') {
                list = list.concat(item.tagList)
            }
        }
        let arr = []
        for (let item of this.data.house.tagList) {
            if (list.includes(item)) {
                arr.push(item)
            }
        }
        this.setData({
            tagList: arr
        })
    },
  }
})