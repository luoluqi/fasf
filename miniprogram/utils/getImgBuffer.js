  
export default async function getImgBuffer(imgUrl) {
      let imgInfo = await new Promise((resolve) => {
          wx.getImageInfo({
              src: imgUrl,
              success (res) {
                  resolve(res)
             
              }
            })
      })
     
      let p = 1
      if(imgInfo.width > imgInfo.height){
          p = imgInfo.width / 150
          if(p < 1){
              p = 1
          }
      } else {
        p = imgInfo.height / 150
        if(p < 1){
            p = 1
        }
      }

      let width = imgInfo.width / p
      let height = imgInfo.height / p
      console.log(width, height)


      let tempFilePath = await new Promise((resolve, reject) => {
        wx.compressImage({
            src: imgInfo.path, // 图片路径
            quality: 80,
            compressedWidth: width,
            compressHeight	: height,
            success: (res) => {
                resolve(res.tempFilePath)
            }
          })
    })

      

      const fs = wx.getFileSystemManager()
      const res = fs.readFileSync(tempFilePath)

      return res
  }
