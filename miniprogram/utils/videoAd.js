export default function(){
    // 在页面中定义激励视频广告
    let videoAd = null

    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
    videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-76037cbe6580b233', // 开始
        // adUnitId: 'adunit-6bfd11fa1b7f6b90' // test
    })
    videoAd.onLoad(() => {})
    videoAd.onError((err) => {})
    videoAd.onClose((res) => {})
    }

    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
    videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
        .then(() => videoAd.show())
        .catch(err => {
            console.log('激励视频 广告显示失败')
        })
    })
    }
}