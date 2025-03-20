import dayjs from 'dayjs'
export default async function (imgList, fileList){
   
    if(imgList.length == 0){
    
      return []
    }
    
    var proArr = []
    for(let i = 0;i < imgList.length; i++){
        let promise = new Promise((resolve, reject) => {
          let img = imgList[i]
          const objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
          if (objExp.test(img)) {
          
            resolve(fileList[i])
          }else{
            let dayObj = dayjs()
            var suffix = img.substring(img.lastIndexOf('.'));
            var path = dayObj.format('YYYY') + '/' + dayObj.format('MM') + '/' + dayObj.format('YYYY-MM-DD') + '/' + Math.random() + suffix
            wx.cloud.uploadFile({
              cloudPath: path,
              filePath: img, // 文件路径
            }).then(res => {
              resolve(res.fileID)
            })
            
            
          }
        })
        proArr.push(promise)
    }

    let resList = await Promise.all(proArr)
    
    var res = await wx.cloud.getTempFileURL({
      fileList: resList
    })
    
    var fileList = res.fileList;
    for(var i = 0;i<fileList.length;i++){
      var file = fileList[i];
      if(!file.fileID){
        file.tempFileURL = imgList[i]
      }
    }
    
    return fileList
}