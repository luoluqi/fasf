import cityApi from "../../api/cityApi"

// admin/city/city.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        right: [{
                text: '编辑',
                className: 'btn edit-btn',
            },
            {
                text: '删除',
                className: 'btn delete-btn',
            },
        ],
        countryId: '',
        countryName: '',
        addVisible: false,
        submitType: 'add',
        list: [],
        pageNum: 0,
        pageSize: 10,
        isMore: true,
        name: '',
        english:'',
        sort: 1,
        longitude: 0,
        latitude: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            countryId: options.countryId,
            countryName: options.countryName,
        })
        this.getList()
    },

    async getList() {
        wx.showLoading({
            mask: true
        })
        let res = await cityApi.getList({
            pageNum: 1,
            pageSize: 100,
            countryId: this.data.countryId
        })
        this.setData({
            list: res
        })
        wx.hideLoading()
    },

    async onActionClick(e) {
        console.log(e)
        let item = e.currentTarget.dataset.item
        let text = e.detail.text
        this.setData({
            item
        })
        if (text == '编辑') {
            // 编辑
            this.setData({
                addVisible: true,
                submitType: 'update',
                name: item.name,
                english: item.english,
                sort: item.sort,
                longitude: item.longitude,
                latitude: item.latitude
            })
        } else {
            // 删除
            this.deleteCity()

        }
    },

    async deleteCity() {
        let self = this
        wx.showModal({
            title: '提示',
            content: '确定删除吗？',
            async success(res) {
                if (res.confirm) {
                    await cityApi.delete(self.data.item._id)
                    self.getList()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    async submit() {

        wx.showLoading({
            mask: true
        })
        if (this.data.submitType == 'add') {
            await cityApi.add({
                name: this.data.name,
                english: this.data.english,
                sort: parseInt(this.data.sort + ''),
                longitude: this.data.longitude,
                latitude: this.data.latitude,
                countryId: this.data.countryId,
                countryName: this.data.countryName,
            })
        } else {
            await cityApi.update({
                _id: this.data.item._id,
                name: this.data.name,
                english: this.data.english,
                sort: parseInt(this.data.sort + ''),
                longitude: this.data.longitude,
                latitude: this.data.latitude,
                countryId: this.data.countryId,
                countryName: this.data.countryName,
            })
        }

        wx.hideLoading()
        this.setData({
            addVisible: false
        })
        this.getList()
    },

    toAdd() {
        this.setData({
            addVisible: true,
            submitType: 'add',
            name: '',
            english: '',
            sort: 1,
            longitude: 116,
            latitude: 30
        })
    },

    onAddVisibleChange(e) {
        this.setData({
            addVisible: e.detail.visible
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})