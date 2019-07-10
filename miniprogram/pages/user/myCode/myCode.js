// miniprogram/pages/user/myCode/myCode.js
import {
    message,
    showLoading
} from "../../../utils/common";
const req = require('../../../req/index');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: '',
        imgArr: [],
        isSetting: false,
        loading: false
    },
    getwxacodeunlimit: function (params) {
        req.profile.getwxacodeunlimit()
            .then(res => {
                if (res.status == 0) {
                    this.data.imgArr.push(res.data.base64_url)
                    this.setData({
                        imgUrl: res.data.base64_url,
                        imgArr: this.data.imgArr
                    })
                } else {
                    message(res.msg)
                }
            })
    },
    bindload: function (param) {
        console.log(123);

        wx.hideLoading()
        this.setData({
            loading: true
        })
    },
    getSetting(event) {
        let that = this
        // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
        that.isShowToast = false
        if (event.detail.authSetting['scope.writePhotosAlbum']) {
            that.setData({
                isSetting: false
            })
        }
    },
    //保存图片
    saveImg: function (params) {
        var that = this
        var switchCode = wx.getFileSystemManager();
        switchCode.writeFile({
            filePath: wx.env.USER_DATA_PATH + '/test.png',
            data: this.data.imgUrl.slice(22),
            encoding: 'base64',
            success: res => {
                wx.saveImageToPhotosAlbum({
                    filePath: wx.env.USER_DATA_PATH + '/test.png',
                    success: function (res) {
                        that.setData({
                            isSetting: false
                        })
                        wx.showToast({
                            title: '保存成功',
                        })
                    },
                    fail: function (err) {
                        wx.getSetting({
                            success: (res) => {
                                if (res.authSetting['scope.writePhotosAlbum']) {
                                    that.setData({
                                        isSetting: false
                                    })
                                } else {
                                    that.setData({
                                        isSetting: true
                                    })
                                }
                            }
                        })


                    }
                })
            },
            fail: err => {
                console.log(err)
            }
        })

        // wx.downloadFile({
        //   url: this.data.imgUrl,
        //   success: function (res) {
        //     // console.log(res, 'success');
        //     //图片保存到本地
        //     wx.saveImageToPhotosAlbum({
        //       filePath: res.tempFilePath,
        //       success: function (data) {
        //         wx.showToast({
        //           title: '保存成功',
        //           icon: 'success',
        //           duration: 2000
        //         })
        //       },
        //       fail: function (err) {
        //         // console.log(err, 'err');
        //         if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
        //           // console.log("当初用户拒绝，再次发起授权")
        //           wx.showModal({
        //             title: '提示',
        //             content: '若不微信授权，则无法使用保存图片或视频到您的相册',
        //             success(res) {
        //               if (res.confirm) {
        //                 // console.log('用户点击确定')
        //                 wx.openSetting({
        //                   success(settingdata) {
        //                     console.log(settingdata, 'settingdata')
        //                     if (settingdata.authSetting['scope.writePhotosAlbum']) {
        //                       console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
        //                     } else {
        //                       console.log('获取权限失败，给出不给权限就无法正常使用的提示')
        //                     }
        //                   },
        //                   fail(res) {
        //                     console.log(res, 'fail');

        //                   }
        //                 })
        //               } else if (res.cancel) {
        //                 console.log('用户点击取消')
        //               }
        //             }
        //           })


        //         }
        //       },
        //       complete(res) {
        //         console.log('complete');
        //       }
        //     })
        //   }
        // })
    },
    //发送图片
    sendImg: function (params) {
        wx.previewImage({
            urls: this.data.imgArr,
            success(res) {
                // console.log('res');
            }
        })
    },
    onShareAppMessage: function (ops) {
        if (ops.from === 'button') {
            // 来自页面内转发按钮
            // console.log(ops.target)
        }
        var that = this
        return {
            title: '分享给好友',
            path: 'pages/index/index?scene=' + that.data.openid, //点击分享消息是打开的页面
            imageUrl: that.data.imgUrl,
            success: function (res) {
                // 转发成功
                // console.log("转发成功:" + JSON.stringify(res));
                var shareTickets = res.shareTickets;

            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        showLoading("加载中...")
        wx.setNavigationBarTitle({
            title: '我的邀请码'
        })
        this.getwxacodeunlimit()
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