import jobApi from '../../api/jobApi'
import houseApi from '../../api/houseApi'
import secHandApi from '../../api/secHandApi'
import localServiceApi from '../../api/localServiceApi'

export const getJobList = async ({
  pageNum,
  pageSize,
  keyword
}) => {
  let res = await jobApi.getList({
    pageNum: pageNum,
    pageSize: pageSize,
    status: 1,
    cityId: wx.getStorageSync('city')._id,
    keyword: keyword
  })
  for(let item of res){
    item.dataType = 'job'
  }
  return res
}

export const getHouseList = async ({
  pageNum,
  pageSize,
  keyword
}) => {
  let res = await houseApi.getList({
    pageNum: pageNum,
    pageSize: pageSize,
    status: 1,
    cityId: wx.getStorageSync('city')._id,
    keyword: keyword
  })
  for(let item of res){
    item.dataType = 'house'
  }
  return res
}

export const getSecHandList = async ({
  pageNum,
  pageSize,
  keyword
}) => {
  let res = await secHandApi.getList({
    pageNum: pageNum,
    pageSize: pageSize,
    status: 1,
    cityId: wx.getStorageSync('city')._id,
    keyword: keyword
  })
  for(let item of res){
    item.dataType = 'secHand'
  }
  return res
}

export const getLocalService = async ({
  pageNum,
  pageSize,
  keyword
}) => {
  let res = await localServiceApi.getList({
    pageNum: pageNum,
    pageSize: pageSize,
    status: 1,
    cityId: wx.getStorageSync('city')._id,
    keyword: keyword
  })
  for(let item of res){
    item.dataType = 'localService'
  }
  return res
}

export const getHomeList = async ({
  pageNum,
  pageSize,
  keyword
}) => {
  let a = getJobList({pageNum, pageSize, keyword})
  let b = getHouseList({pageNum, pageSize, keyword})
  let c = getSecHandList({pageNum, pageSize, keyword})
  let d = getLocalService({pageNum, pageSize, keyword})
  
  let resList = await Promise.all([a, b, c, d])
  
  let list = [].concat(...resList)
 
  return list
}