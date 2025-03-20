import localServiceApi from './../../api/localServiceApi'
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
        pageNum: 1,
        pageSize: 10,
        list: [],
        isMore: true
    },

    lifetimes: {
        attached: function() {
          // 在组件实例进入页面节点树时执行
          console.log('attached...')
          this.getList(1)
        },
        detached: function() {
          // 在组件实例被从页面节点树移除时执行
        },
      },
  
    /**
     * 组件的方法列表
     */
    methods: {
        async getList(num){
            if(!this.data.isMore){
                return
            }
            this.data.pageNum = num
            wx.showLoading({
                mask: true
            })
            let res = await localServiceApi.getList({
                pageNum: num,
                pageSize: this.data.pageSize,
                openid: wx.getStorageSync('openid')
            })
            wx.hideLoading()

            this.setData({
                list: this.data.list.concat(res)
            })

            if(res.length < this.data.pageSize){
                this.setData({
                    isMore: false
                })
            }
        },
        async onDelete(e){
            
            let id = e.detail
            for(let i = 0; i < this.data.list.length; i++){
                if(this.data.list[i]._id == id){
                    this.data.list.splice(i, 1)
                }
            }
            let res = await localServiceApi.getList({
                pageNum: this.data.pageNum,
                pageSize: this.data.pageSize,
                openid: wx.getStorageSync('openid')
            })
            if(res.length > 0){
                let localService = res[0]
                let have = false
                for(let item of this.data.list){
                    if(item._id == localService._id){
                        have = true
                    }
                }
                if(!have){
                    this.data.list.push(localService)
                    
                }
            }
            this.setData({
                list: this.data.list
            })
        }
    }
  })