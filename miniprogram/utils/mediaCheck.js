export default async function ({id,fileList,imgList, type}){
    // return true
  for(let i = 0; i < imgList.length; i++){
    let params = {
      mediaUrl: imgList[i],
      fileId: fileList[i],
    }

    if(!type){
      params.activeId = id
    }

    if(type == 'prize'){
      params.prizeId = id
    }

    wx.cloud.callFunction({
      name: 'mediaCheck',
      data: params
    })
  }

  
  }