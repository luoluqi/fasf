// components/selectCity/selectCity.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cityId: String,
        cityName: String,
        longitude: Number,
        latitude: Number
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    lifetimes: {
        attached: function () {
            let city = wx.getStorageSync('city')
            this.setData({
                cityId: city._id,
                cityName: city.name,
                longitude: city.longitude,
                latitude: city.latitude
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        toSelectCity() {
            wx.navigateTo({
                url: '/pages/selectCity/selectCity',
                events: {
                    selectCity: (data) => {
                        this.setData({
                            cityId: data._id,
                            cityName: data.name,
                            longitude: data.longitude,
                            latitude: data.latitude
                        })
                    }
                }
            })
        },
    }
})