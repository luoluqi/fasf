/**获取当前位置 */
export const getLocation = (anew) => {
    return new Promise((resolve, reject) => {

        const systemSetting = wx.getSystemSetting()
        if (!systemSetting.locationEnabled) {
            wx.showModal({
                title: '提示',
                content: '请开启手机的位置信息，以方便为您提供周边的数据。',

            })
        }

        if (!anew) {
            let longitude = wx.getStorageSync('longitude')
            if (longitude) {
                resolve()
                return
            }
        }

        wx.getFuzzyLocation({
            type: 'gcj02',
            success: (res) => {

                wx.setStorageSync('longitude', res.longitude)
                wx.setStorageSync('latitude', res.latitude)
                wx.setStorageSync('address', '当前位置')
                wx.setStorageSync('addressName', '当前位置')
                resolve()
            },
            fail: (res) => {
                wx.setStorageSync('longitude', 0)
                wx.setStorageSync('latitude', 0)
                wx.setStorageSync('address', '当前位置')
                wx.setStorageSync('addressName', '当前位置')
                resolve()
            }
        })
    })
}
/**选择位置 */
export const chooseLocation = () => {
    return new Promise((resolve, reject) => {
        wx.chooseLocation({
            success: (res) => {

                wx.setStorageSync('longitude', res.longitude)
                wx.setStorageSync('latitude', res.latitude)
                wx.setStorageSync('address', res.address)
                wx.setStorageSync('addressName', res.name)
                resolve()
            }
        })
    })
}