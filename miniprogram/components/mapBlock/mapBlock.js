// components/mapBlock/mapBlock.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        longitude: Number,
        latitude: Number,
        width: Number,
        height: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        markers: []
    },
    observers: {
        'longitude': function () {
            this.addMarker()
        }
    },

    lifetimes: {
        attached: function () {
            this.addMarker()

        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addMarker() {
            this.setData({
                markers: [{
                    id: Math.random(),
                    latitude: this.data.latitude,
                    longitude: this.data.longitude,

                    iconPath: '/images/location.png',
                    width: 23,
                    height: 31,
                    // callout: {
                    //   content: data[0].isPlace ? '钓鱼场' : '钓点',
                    //   display: "ALWAYS",
                    //   padding: 5,
                    //   bgColor: '#6495ed',
                    //   color: '#fff',
                    //   fontSize: 20
                    // }
                }]
            })
        },
        onTap() {
            this.triggerEvent('mtap')
        }
    }
})