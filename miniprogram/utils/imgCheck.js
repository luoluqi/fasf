import getImgBuffer from './getImgBuffer'
export default async function (imgList){
    // return true
    if(imgList.length == 0){
      return true
    }
    wx.showLoading({
      title: '正在审核图片',
      mask: true
    })
    let proList = []
    for(let i = 0; i < imgList.length; i++){
        let pro = new Promise(async (resolve, reject) => {
         
          let buffer = await getImgBuffer(imgList[i])
          console.log(buffer)
          let res = await wx.cloud.callFunction({
            name: 'imgSecCheck',
            data: {
              value: buffer
            }
          })

          console.log(res)
          
          if(res.result.errCode == 0){
            resolve()
          } else {
            reject()
          }
         
        })
      

        proList.push(pro)
    }
    try {
      
      await Promise.all(proList)
   
      wx.hideLoading()
      return true
    } catch (error) {
      
      wx.hideLoading()
    
     

      wx.showModal({
        title: '提示',
        content: '您上传的图片存在违规',
        showCancel: false,
        success (res) {
        //   wx.navigateBack()
        }
      })
      return false
    }
   

  
  }