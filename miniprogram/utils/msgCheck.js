export default async function msgCheck(content){
  // return true
  
  // var n = new Date().getTime()
  // var a = new Date('2021/09/24 12:00').getTime()
  
  // if(n > a){
    
  //   return true
  // }
 
  if(!content){
    return true
  }

    wx.showLoading({
      title: '正在审核文字',
      mask:true
    })
    let res = await wx.cloud.callFunction({
      name: 'msgSecCheck',
      data: {
        content: content,
    
      }
    })
    wx.hideLoading()

    console.log('check content....', res)
    if(res.result.result.label == 100){
      return true
    } else {
      wx.showToast({
        title: '内容违规',
        icon: 'none'
      })
      return false
    }
  }