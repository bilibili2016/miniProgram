// miniprogram/pages/user/beTeacher/index/index.js
import {
    message,
    showLoading
} from '../../../../utils/common'
const req = require('../../../../req/index')
var windowWRPX = 750
// 拖动时候的 pageX
var pageX = 0
// 拖动时候的 pageY
var pageY = 0

var pixelRatio = wx.getSystemInfoSync().pixelRatio

// 调整大小时候的 pageX
var sizeConfPageX = 0
// 调整大小时候的 pageY
var sizeConfPageY = 0

var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0

// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cutSrc: '',
        isShowCut: false,
        editObj: {},
        inputLen: 0,
        userInfo: {},
        isTeacher: false,
        fileForm: {
            FILESS: [],
            fileName: ""
        },
        uploadInfo: {
            head_img: "",
            student_card: "",
            teacher_name: "",
            remark: ""
        },
        teacherInfo: {},
        itemList: [{
                title: '个人介绍',
                url: "/pages/user/beTeacher/introduction/introduction"
            },
            // {
            //     title: '标签设置',
            //     url: "/pages/user/beTeacher/label/index/index"
            // },
            {
                title: '话题设置',
                url: "/pages/user/beTeacher/topic/topic"
            }
        ],
        imageNum: '', //上传的图片id
        headImg: '', //头像上传
        ewmImg: '', //二维码上传
        imageFixed: false, //裁剪浮层
        // imageSrc: 'http://topmdrt-static.oss-cn-shenzhen.aliyuncs.com/images/testimg2.jpeg',
        imageSrc: '', //要裁剪的图片
        returnImage: '',
        isShowImg: false,
        // 初始化的宽高
        cropperInitW: windowWRPX,
        cropperInitH: windowWRPX,
        // 动态的宽高
        cropperW: windowWRPX,
        cropperH: windowWRPX,
        // 动态的left top值
        cropperL: 0,
        cropperT: 0,

        // 图片缩放值
        scaleP: 0,
        imageW: 0,
        imageH: 0,

        // 裁剪框 宽高
        cutW: 100,
        cutH: 100,
        cutL: 0,
        cutT: 0,
    },
    handleLink: function (e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },
    bindInput: function (e) {
        this.data.uploadInfo.teacher_name = e.detail.value
        this.setData({
            uploadInfo: this.data.uploadInfo
        })
    },
    bindTextInput: function (e) {
        this.data.uploadInfo.remark = e.detail.value
        this.setData({
            inputLen: e.detail.value.length,
            uploadInfo: this.data.uploadInfo
        })
    },
    submit: function (params) {
        // console.log(this.data.uploadInfo);
        try {
            if (!this.data.uploadInfo.head_img) throw '请上传头像'
            if (!this.data.uploadInfo.student_card) throw '请上传学生证照片'
            if (!this.data.uploadInfo.teacher_name) throw '请填写真实姓名'
            if (!this.data.uploadInfo.remark) throw '请填写个人介绍'
        } catch (error) {
            message(error)
            return false
        }

        req.profile.teacherApply(this.data.uploadInfo)
            .then(res => {
                if (res.status == 0) {
                    wx.showModal({
                        title: '提示',
                        content: '提交成功，我们2~3个工作日完成审核，请勿重复提交。',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/home/index/index'
                                })
                            }
                        }
                    })
                } else {
                    message(res.msg)
                }
            })


    },
    save: function (params) {
        wx.showModal({
            title: '提示',
            content: '请确保提交的信息为真实有效的，否则将会受到相应的惩罚！',
            success(res) {
                if (res.confirm) {
                    wx.navigateBack({
                        delta: 1
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    uploadImg: function (e) {
        this.data.editObj.flag = e.currentTarget.dataset.id
        this.data.editObj.type = e.currentTarget.dataset.type
        this.setData({
            editObj: this.data.editObj
        })
        let that = this
        wx.chooseImage({
            count: 1, //可选图片数量
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: res => {
                let src = res.tempFilePaths[0]
                // that.setData({
                //   isShowCut: !that.data.isShowCut,
                //   cutSrc: src
                // })
                showLoading('上传中...')
                that.getURl(src)
                // wx.navigateTo({
                //   url: `/pages/user/beTeacher/cutFace/cutFace?src=${src}`,
                //   success(res) {
                //     console.log(res, 'res22');
                //     // that.getURl(src, obj)
                //   }
                // })
            }
        })
    },
    getURl: function (src) {
        var that = this
        wx.uploadFile({
            url: 'https://api.1911edu.com/Publics/Upload/dropZoneUpload',
            filePath: src,
            name: 'file',
            formData: {
                'user': 'test'
            },
            success: function (res) {
                // console.log(res);
                var sss = JSON.parse(res.data)
                var path = sss.data.full_path;

                //type 1:填写老师信息 2:修改老师信息
                //flag  1:头像  2:形象照  3:学生证照
                let obj = that.data.editObj
                if (obj.type == 1) {
                    if (obj.flag == 1) {
                        that.data.uploadInfo.head_img = path
                    } else if (obj.flag == 3) {
                        that.data.uploadInfo.student_card = path
                    }
                    that.setData({
                        uploadInfo: that.data.uploadInfo
                    })
                } else if (obj.type == 2) {
                    if (obj.flag == 1) {
                        that.data.teacherInfo.head_img = path
                    } else if (obj.flag == 2) {
                        that.data.teacherInfo.picture = path
                    }
                    that.setData({
                        teacherInfo: that.data.teacherInfo
                    })
                    that.editTeacherInfo()
                }
            },
            fail: function (param) {
                wx.hideLoading()
            }
        });

    },
    getTeacherApplyInfo: function (params) {
        req.profile.getTeacherApplyInfo()
            .then(res => {
                if (res.status == 0) {
                    // console.log(res, 'test');
                    this.data.itemList[0].url = `/pages/user/beTeacher/introduction/introduction?remark=${res.data.remark}`
                    this.setData({
                        itemList: this.data.itemList,
                        teacherInfo: res.data,
                        uploadInfo: res.data
                    })
                } else {
                    message(res.msg)
                }
            })
    },
    //修改导师信息
    editTeacherInfo: function (params) {
        let obj = {
            head_img: this.data.teacherInfo.head_img,
            remark: this.data.teacherInfo.remark,
            picture: this.data.teacherInfo.picture
        }
        req.profile.editTeacherInfo(obj)
            .then(res => {
                if (res.status == 0) {
                    // console.log(res);
                    wx.hideLoading()
                } else {
                    message(res.msg)
                    wx.hideLoading()
                }
            })
    },

    // 拖动时候触发的touchStart事件
    contentStartMove(e) {
        pageX = e.touches[0].pageX
        pageY = e.touches[0].pageY
    },

    // 拖动时候触发的touchMove事件
    contentMoveing(e) {
        var _this = this
        // _this.data.cutL + (e.touches[0].pageX - pageX)
        // console.log(e.touches[0].pageX)
        // console.log(e.touches[0].pageX - pageX)
        var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
        var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
        var minX = Math.max(_this.data.cutL - (dragLengthX), 0)
        var minY = Math.max(_this.data.cutT - (dragLengthY), 0)
        var maxX = _this.data.cropperW - _this.data.cutW
        var maxY = _this.data.cropperH - _this.data.cutH
        this.setData({
            cutL: Math.min(maxX, minX),
            cutT: Math.min(maxY, minY),
        })
        // console.log(`${maxX} ----- ${minX}`)
        pageX = e.touches[0].pageX
        pageY = e.touches[0].pageY
    },

    // 获取图片
    getImageInfo() {
        var _this = this
        console.log('shengcheng:' + _this.data.imageSrc)
        wx.showLoading({
            title: '图片生成中...',
        })
        // wx.downloadFile({
        //   url:_this.data.imageSrc, //仅为示例，并非真实的资源     
        //   success: function (res) {
        // 将图片写入画布             
        const ctx = wx.createCanvasContext('myCanvas')
        // ctx.drawImage(res.tempFilePath)
        ctx.drawImage(_this.data.imageSrc)

        ctx.draw(true, () => {
            // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题
            var canvasW = (_this.data.cutW / _this.data.cropperW) * (_this.data.imageW / pixelRatio)
            var canvasH = (_this.data.cutH / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
            var canvasL = (_this.data.cutL / _this.data.cropperW) * (_this.data.imageW / pixelRatio)
            var canvasT = (_this.data.cutT / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
            console.log(`canvasW:${canvasW} --- canvasH: ${canvasH} --- canvasL: ${canvasL} --- canvasT: ${canvasT} -------- _this.data.imageW: ${_this.data.imageW}  ------- _this.data.imageH: ${_this.data.imageH} ---- pixelRatio ${pixelRatio}`)
            wx.canvasToTempFilePath({
                x: canvasL,
                y: canvasT,
                width: canvasW,
                height: canvasH,
                destWidth: canvasW,
                destHeight: canvasH,
                canvasId: 'myCanvas',
                success: function (res) {
                    wx.hideLoading()
                    showLoading('图片上传中...')
                    // 成功获得地址的地方
                    console.log('end:' + res.tempFilePath)
                    _this.getURl(res.tempFilePath)
                    // 判断时上传头像还是二维码
                    _this.setData({
                        imageFixed: false,
                    })
                    if (_this.data.imageNum == '1') {
                        _this.setData({
                            headImg: res.tempFilePath
                        })
                    } else if (_this.data.imageNum == '2') {
                        _this.setData({
                            ewmImg: res.tempFilePath
                        })
                    }

                }
            })
        })
    },

    // 设置大小的时候触发的touchStart事件
    dragStart(e) {
        var _this = this
        sizeConfPageX = e.touches[0].pageX
        sizeConfPageY = e.touches[0].pageY
        initDragCutW = _this.data.cutW
        initDragCutL = _this.data.cutL
        initDragCutT = _this.data.cutT
        initDragCutH = _this.data.cutH
    },

    // 设置大小的时候触发的touchMove事件
    dragMove(e) {
        var _this = this
        var dragType = e.target.dataset.drag
        switch (dragType) {
            case 'right':
                var dragLength = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
                if (initDragCutW >= dragLength) {
                    // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
                    if (dragLength < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) {
                        this.setData({
                            cutW: initDragCutW - dragLength
                        })
                    }
                    // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
                    if (dragLength > 0) {
                        this.setData({
                            cutW: initDragCutW - dragLength
                        })
                    } else {
                        return
                    }
                } else {
                    return
                }
                break;
            case 'left':
                var dragLength = (dragLength = sizeConfPageX - e.touches[0].pageX) * dragScaleP
                console.log(dragLength)
                if (initDragCutW >= dragLength && initDragCutL > dragLength) {
                    if (dragLength < 0 && Math.abs(dragLength) >= initDragCutW) return
                    this.setData({
                        cutL: initDragCutL - dragLength,
                        cutW: initDragCutW + dragLength
                    })
                } else {
                    return;
                }
                break;
            case 'top':
                var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
                if (initDragCutH >= dragLength && initDragCutT > dragLength) {
                    if (dragLength < 0 && Math.abs(dragLength) >= initDragCutH) return
                    this.setData({
                        cutT: initDragCutT - dragLength,
                        cutH: initDragCutH + dragLength
                    })
                } else {
                    return;
                }
                break;
            case 'bottom':
                var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
                // console.log(_this.data.cropperH > _this.data.cutT + _this.data.cutH)
                console.log(dragLength)
                console.log(initDragCutH >= dragLength)
                console.log(_this.data.cropperH > initDragCutT + _this.data.cutH)
                // 必须是 dragLength 向上缩小的时候必须小于原本的高度
                if (initDragCutH >= dragLength) {
                    // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
                    if (dragLength < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) {
                        this.setData({
                            cutH: initDragCutH - dragLength
                        })
                    }
                    // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
                    if (dragLength > 0) {
                        this.setData({
                            cutH: initDragCutH - dragLength
                        })
                    } else {
                        return
                    }
                } else {
                    return
                }
                break;
            case 'rightBottom':
                var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
                var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
                if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
                    // bottom 方向的变化
                    if ((dragLengthY < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) || (dragLengthY > 0)) {
                        this.setData({
                            cutH: initDragCutH - dragLengthY
                        })
                    }

                    // right 方向的变化
                    if ((dragLengthX < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) || (dragLengthX > 0)) {
                        this.setData({
                            cutW: initDragCutW - dragLengthX
                        })
                    } else {
                        return
                    }
                } else {
                    return
                }
                break;
            default:
                break;
        }
    },
    upEwm: function (e) {
        var _this = this
        this.data.editObj.flag = e.currentTarget.dataset.id
        this.data.editObj.type = e.currentTarget.dataset.type
        this.setData({
            editObj: this.data.editObj
        })
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                // var mode = parseFloat(e.currentTarget.dataset.current);
                console.log('上传:' + tempFilePaths)
                var arr = e.currentTarget.dataset.size.split("*")
                _this.setData({
                    cutW: arr[0],
                    cutH: arr[1],
                    imageFixed: true,
                    imageSrc: tempFilePaths.join(),
                    imageNum: e.currentTarget.dataset.which
                })
                // start
                wx.getImageInfo({
                    src: _this.data.imageSrc,
                    success: function success(res) {
                        var innerAspectRadio = res.width / res.height;
                        console.log('bili' + innerAspectRadio)
                        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
                        if (innerAspectRadio >= 1) {
                            _this.setData({
                                cropperW: windowWRPX,
                                cropperH: windowWRPX / innerAspectRadio,
                                // 初始化left right
                                cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
                                cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
                                // 裁剪框  宽高 
                                // cutW: windowWRPX - 200,
                                // cutH: windowWRPX / innerAspectRadio - 200,
                                cutL: 0,
                                cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 20)) / 2),
                                // 图片缩放值
                                scaleP: res.width * pixelRatio / windowWRPX,
                                // 图片原始宽度 rpx
                                imageW: res.width * pixelRatio,
                                imageH: res.height * pixelRatio
                            })
                        } else {
                            let size = _this.data.cutW / _this.data.cutH
                            _this.setData({
                                cropperW: windowWRPX * innerAspectRadio,
                                cropperH: windowWRPX,
                                // 初始化left right
                                cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
                                cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
                                // 裁剪框的宽高
                                cutW: windowWRPX * innerAspectRadio,
                                cutH: windowWRPX * innerAspectRadio / size,
                                // cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 20)) / 2),
                                cutL: 0,
                                cutT: Math.ceil((windowWRPX - 340) / 2),
                                // 图片缩放值
                                scaleP: res.width * pixelRatio / windowWRPX,
                                // 图片原始宽度 rpx
                                imageW: res.width * pixelRatio,
                                imageH: res.height * pixelRatio
                            })
                        }
                        _this.setData({
                            isShowImg: true
                        })
                        wx.hideLoading()
                    }
                })

                // end
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '个人主页设置'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (wx.getStorageSync('userInfo')) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            })
            this.getTeacherApplyInfo()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})