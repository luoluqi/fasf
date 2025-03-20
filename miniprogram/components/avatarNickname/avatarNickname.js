// components/avatarNickname/avatarNickname.js
import formatDateTime from '../../util/formatDateTime'
const defaultAvatarUrl = 'https://6161-aaa-0g95yu8l18c1a200-1331416746.tcb.qcloud.la/2024/0.png'
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
    avatarUrl: '',
    nickname: '',
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onChooseAvatar(e) {
      const {
        avatarUrl
      } = e.detail
      wx.showLoading({
        mask:true
      })
      var suffix = avatarUrl.substring(avatarUrl.lastIndexOf('.'));
      var path = formatDateTime(new Date(), 'yyyy') + '/' + formatDateTime(new Date(), 'MM') + '/' + formatDateTime(new Date(), 'yyyy-MM-dd') + '/' + Math.random() + suffix
      let res = await wx.cloud.uploadFile({
        cloudPath: path,
        filePath: avatarUrl, // 文件路径
      })
      
      var a = await wx.cloud.getTempFileURL({
        fileList: [res.fileID]
      })
      
      this.setData({
        avatarUrl: a.fileList[0].tempFileURL,
      })
      wx.hideLoading( )
    },
    nicknameInput(e) {

      console.log(e)
      this.setData({
        nickname: e.detail.value
      })
    },

    cancel() {
      console.log('cancel')
      this.close()
    },
    confirm() {
      console.log('confirm')
      console.log({
        avatarUrl: this.data.avatarUrl,
        nickname: this.data.nickname
      })
      if (!this.data.avatarUrl) {
        wx.showToast({
          title: '请选择头像',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.data.nickname) {
        wx.showToast({
          title: '请选择昵称',
          icon: 'none',
          duration: 2000
        })
        return
      }

      wx.setStorageSync('avatarUrl', this.data.avatarUrl)
      wx.setStorageSync('nickname', this.data.nickname)

      this.triggerEvent('confirm', {
        avatarUrl: this.data.avatarUrl,
        nickname: this.data.nickname
      })

      this.close()
    },

    open() {
      let a = wx.getStorageSync('avatarUrl')
      let n = wx.getStorageSync('nickname')
      this.setData({
        isShow: true,
        avatarUrl: a ? a : defaultAvatarUrl,
        nickname: n ? n : ''
      })
    },
    close() {
      this.setData({
        isShow: false
      })
    }
  }
})