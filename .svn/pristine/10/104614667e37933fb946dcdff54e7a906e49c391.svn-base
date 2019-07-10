// miniprogram/pages/professor/detail/detail.js
const req = require('../../../../req/index')
const app = getApp();
import {
    message,
    showLoading
} from '../../../../utils/common'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        padding: app.globalData.padding,
        isLogin: false,
        showDown: true,
        showRegister: false,
        showPlayBtn: true,
        videoContext: '',
        isScroll: true,
        teacherID: '',
        detail: "",
        isShowBTn: false,
        isAuto: false,
        consultTime: 0,
        isShowBuy: false,
        isCollect: false,
        path: '',
        loginId: '',
        userInfo: ''
    },
    collection: function (param) {

    },
    // 约Ta见面 向Ta咨询 收藏
    bindGetUserInfo(e) {
        var that = this
        that.setData({
            loginId: e.currentTarget.dataset.id
        })
        //如果用户拒绝授权走此处
        if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
            console.log('用户拒绝了授权，无法访问小程序');
        }
        //如果用户接受授权走此处
        if (e.detail.errMsg == 'getUserInfo:ok') {
            // 登录获取token
            app.authorize().then(function (res) {
                // 获取token
                // 1有token登陆了；2 有unionid没有token，需要绑定手机号；false 错误 停止
                if (res.status == 1) {
                    that.onSuccess()
                } else if (res.status == 2) {
                    that.setData({
                        showRegister: true,
                        isScroll: false
                    })
                } else {
                    that.setData({
                        showRegister: false,
                        isScroll: true
                    })
                    message(res.msg)
                }
                wx.hideLoading()
            })
        }
    },
    // 关闭登录绑定手机号
    onClose() {
        this.setData({
            showRegister: false,
            isScroll: true
        })
    },
    onSuccess() {
        this.setData({
            showRegister: false,
            isScroll: true,
            isLogin: wx.getStorageSync('userInfo') ? true : false,
            userInfo: wx.getStorageSync('userInfo')
        })
        if (this.data.loginId == 1) {
            // 约TA见面
            this.getTeacherDetail().then(res => {
                if (res.bespoke_offline_time) {
                    wx.navigateTo({
                        url: `/pages/home/appointment/index/index?teacherId=${this.data.detail.id}`
                    })
                    return false
                } else {
                    message('该老师暂时不可以预约线下咨询，您可点击右侧向Ta咨询！', 6000)
                }
            })
        }
        if (this.data.loginId == 2) {
            // 向TA咨询
            if (Number(this.data.userInfo.consult_time) > 0) {
                wx.navigateTo({
                    url: `/pages/consult/chat/chat?receiveId=${this.data.detail.user_id}`
                })
            } else {
                this.setData({
                    isShowBuy: true
                })
            }
            return false
        }
        if (this.data.loginId == 3) {
            this.getTeacherDetail().then(res => {
                if (this.data.userInfo.id != this.data.detail.user_id) {
                    if (res.is_collection) {
                        this.deleteCollection()
                    } else {
                        this.addCollection()
                    }
                } else {
                    message('您不可以收藏自己！', 2000)
                }
            })
        }
    },
    // 关闭支付
    closeBuy: function (param) {
        this.setData({
            isShowBuy: false
        })
    },
    // 播放视频
    palyVideo: function () {
        this.setData({
            showPlayBtn: false
        })
        this.videoContext.play()
    },
    // 展开全部
    handleDown() {
        this.setData({
            showDown: false,
            isAuto: true
        })
    },
    // 收起全部
    handlePull() {
        this.setData({
            showDown: true,
            isAuto: false
        })
    },
    // 小程序支付
    payment: function (param) {
        this.closeBuy()
        var that = this
        wx.requestPayment({
            timeStamp: param.detail.timeStamp,
            nonceStr: param.detail.nonceStr,
            package: param.detail.package,
            signType: 'MD5',
            paySign: param.detail.paySign,
            success(res) {
                // 更新缓存中的咨询次数
                app.getUserDetail().then(res => {
                    if (res.status == 1) {
                        that.setData({
                            userInfo: wx.getStorageSync('userInfo')
                        })
                    }
                })
            },
            fail(res) {
                message("支付已关闭！")
            }
        })
    },
    // 获取教师详情
    getTeacherDetail: function (flag) {
        return new Promise((resolve, reject) => {
            req.home.getTeacherDetail({
                    teacher_id: this.data.teacherID
                })
                .then(res => {
                    if (res.status == 0) {
                        this.setData({
                            detail: res.data.teacherInfo
                        })
                        // 把是否收藏字段放到callback里返回
                        wx.createSelectorQuery().select('#aboutInner').boundingClientRect(rect => {
                            if (rect.height > 150) {
                                this.setData({
                                    isShowBTn: true,
                                })
                            }
                        }).exec()
                        resolve(res.data.teacherInfo)
                        wx.hideLoading()
                    } else {
                        wx.hideLoading()
                        res.msg ? message(res.msg) : ''
                    }
                })
        })
    },
    // 添加收藏
    addCollection: function () {
        req.home.addCollection({
                teacher_id: this.data.teacherID
            })
            .then(res => {
                if (res.status == 0) {
                    message('收藏成功!', 2000)
                    this.getTeacherDetail()
                } else {
                    message(res.msg)
                }
            })
    },
    // 删除收藏
    deleteCollection: function (param) {
        req.home.deleteCollection({
                teacher_id: this.data.teacherID
            })
            .then(res => {
                if (res.status == 0) {
                    message('已取消收藏!', 2000)
                    this.getTeacherDetail()
                } else {
                    message(res.msg)
                }
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.id) {
            this.setData({
                teacherID: options.id
            })
            //发起网络请求
            wx.request({
                url: 'https://api.1911edu.com/Wapi/Test/saveScene',
                data: {
                    scene: options.id
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: res => {
                    if (res.data.status == 0) {

                    } else {

                    }
                }
            })
        }
        if (options.scene) {
            this.setData({
                teacherID: decodeURIComponent(options.scene)
            })
            //发起网络请求
            wx.request({
                url: 'https://api.1911edu.com/Wapi/Test/saveScene',
                data: {
                    scene: decodeURIComponent(options.scene)
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: res => {
                    if (res.data.status == 0) {

                    } else {

                    }
                }
            })
        }
        this.setData({
            isLogin: wx.getStorageSync('userInfo') ? true : false,
            userInfo: wx.getStorageSync('userInfo')
        })
        wx.setNavigationBarTitle({
            title: '个人主页'
        })
        showLoading('加载中...')
        this.getTeacherDetail()
        // console.log(app.globalData.padding, 'app.padding');
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady(res) {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})