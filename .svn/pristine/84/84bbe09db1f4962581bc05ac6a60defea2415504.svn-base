import WeCropper from '../../../../we-cropper/dist/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  //这个是保存上传裁剪后的图片的方法
  getCropperImage() {
    var that = this
    console.log(this.wecropper, 'this.wecroppers');

    this.wecropper.getCropperImage((avatar) => {
      console.log(avatar, '21312');

      if (avatar) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        console.log(pages);
        console.log(avatar, 'kkkkk');
        pages.getURl(avatar)
        // uploadImage(avatar, function (res) {})

        // function uploadImage(filePath, cb) { //个人封装的简单的上传单张图片上传的方法
        //   wx.uploadFile({
        //     url: "xxx / xx / xx",
        //     filePath: filePath,
        //     name: 'file',
        //     header: {
        //       "Content-Type": "multipart/form-data"
        //     },
        //     formData: {
        //       token: getApp().globalData.userData.token,
        //       userName: "",
        //       portrait: filePath
        //     },
        //     success: function (res) {
        //       // 获取到裁剪后的图片
        //       wx.switchTab({
        //         url: `../A/A?avatar=${avatar}`
        //         // 如果需要这图片地址就传过去， 因为我上传后跳转页面后会自己获取服务器的是地址了。 这里仅提供思路参考。
        //       })
        //       console.log('上传图片成功')
        //       console.log(res);
        //       wx.showToast({
        //         title: '上传成功',
        //       })
        //       cb(res);
        //     },
        //     fail: function (res) {
        //       console.log('上传图片失败!')
        //       console.log(res)
        //       wx.showToast({
        //         title: '上传失败',
        //       })
        //     },
        //   })
        // }

      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        // 获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    const {
      cropperOpt
    } = this.data

    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})