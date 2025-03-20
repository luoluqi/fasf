import cityApi from '../api/cityApi'
export default {
    async test() {
        let res = await cityApi.getList({
            pageSize: 1,
            pageNum: 1,
            keyword: '奇奇奇奇'
        })

        if (res.length > 0) {
            wx.reLaunch({
                url: '/pages/home/home'
            })
        }
    }
}