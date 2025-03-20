import uploadImgList from '../../utils/uploadImgList'
import imgCheck from '../../utils/imgCheck'

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
        imgList: [],
        fileList: [],
        deleteFiles: []
    },

    /**
     * 组件的方法列表
     */
    methods: {

        chooseImage: function () {
            wx.chooseMedia({
                count: 9 - this.data.imgList.length,
                mediaType: ['image'],
                success: (res) => {
                    let list = res.tempFiles.map(obj => obj.tempFilePath)

                    const tempFilePaths = this.data.imgList.concat(list)
                    this.setData({
                        imgList: tempFilePaths
                    })
                }
            })
        },

        delImg(e) {
            var index = e.currentTarget.dataset.index
            this.data.imgList.splice(index, 1)
            var fileIds = this.data.fileList.splice(index, 1)
            if (fileIds[0]) {
                this.data.deleteFiles.push(fileIds[0])
            }
            this.setData({
                imgList: this.data.imgList
            })
        },

        previewImage(e) {
            var url = e.currentTarget.dataset.url
            wx.previewImage({
                urls: this.data.imgList,
                current: url
            })
        },

        async imgCheck() {
            let pass = await imgCheck(this.data.imgList)
            return pass
        },

        async upload() {
            wx.cloud.deleteFile({
                fileList: this.data.deleteFiles
            })
            var res = await uploadImgList(this.data.imgList, this.data.fileList)
            return res
        }
    }
})