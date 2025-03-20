// components/selectPoint/selectPoint.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        longitude: {
            type: Number,
            value: 0
        },
        latitude: {
            type: Number,
            value: 0
        },
        width: {
            type: Number,
            value: 750
        },
        height: {
            type: Number,
            value: 300
        },
    },

    observers: {
        "longitude, latitude": function () {
            this.setMarker({
                longitude: this.data.longitude,
                latitude: this.data.latitude,
            })

        }
    },

    lifetimes: {
        attached: function () {
            this.mapCtx = wx.createMapContext('myMap', this)
            this.setMarker({
                longitude: this.data.longitude,
                latitude: this.data.latitude,
            })



        },
        detached: function () {}
    },

    /**
     * 组件的初始数据
     */
    data: {
        markers: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTab(e) {
            console.log(e)
            this.setData({
                longitude: e.detail.longitude,
                latitude: e.detail.latitude,
            })
            this.setMarker({
                longitude: this.data.longitude,
                latitude: this.data.latitude,
            })
        },
        setMarker({
            latitude,
            longitude
        }) {
            this.setData({
                markers: [{
                    id: Math.random(),
                    latitude: latitude,
                    longitude: longitude,

                    iconPath: '/images/51.png',
                    width: 30,
                    height: 30,
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

            // this.mapCtx.moveToLocation({
            //     latitude: latitude,
            //     longitude: longitude,
            // })




        },

        test() {

        }
    },

})