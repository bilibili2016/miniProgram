// pages/user/user.js
const app = getApp()
const req = require('../../../req/index')
import {
    message,
    showLoading
} from '../../../utils/common'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowBuy: false,
        isTeacher: true,
        courseid: 109,
        catalogList: '',
        userInfo: {},
        isLogin: false,
        activityList: [{
                cover: '/images/qwe.png',
                number: 333
            },
            {
                cover: '/images/qwe.png',
                number: 333
            },
            {
                cover: '/images/qwe.png',
                number: 333
            }
        ],
        itemList: [{
                title: '账户设置',
                url: "/pages/user/setUser/index/index",
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon10.png"
            },
            {
                title: '我的收藏',
                url: "/pages/user/myCollection/myCollection",
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon7.png"
            },
            {
                title: '我的预约',
                url: "/pages/user/myAppointment/myAppointment",
                isMargin: true,
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon5.png"
            },
            // {
            //     title: '常见问题',
            //     url: "",
            //     iconUrl: "https://h5-image.1911edu.com/mini-myIcon8.png"
            // },
            {
                title: '在线客服',
                url: "010-62701911",
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon9.png"
            }
        ],
        teacherList: [{
                title: '主页设置',
                url: "/pages/user/beTeacher/index/index",
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon12.png"
            },
            {
                title: '我的钱包',
                url: "",
                isMargin: true,
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon11.png"
            },

            {
                title: '预约设置',
                url: "/pages/user/setAppointment/setAppointment",
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon4.png"
            },
            {
                title: '我的预约',
                url: "/pages/user/myAppointment/myAppointment",
                alertNum: 1,
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon5.png"
            },
            {
                title: '我的邀请码',
                url: "/pages/user/myCode/myCode",
                iconUrl: "https://h5-image.1911edu.com/mini-myIcon6.png"
            }
        ],
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    closeBuy: function (param) {
        this.setData({
            isShowBuy: false
        })
    },
    toggleUser: function (e) {
        if (this.data.isLogin) {
            let status = e.currentTarget.dataset.id
            req.profile.switchUserStatus({
                    user_status: status
                })
                .then(res => {
                    if (res.status == 0) {
                        this.getUserInfo()
                    }
                })
        } else {
            message('您未登录，请先登录！')
        }
    },
    getUserInfo: function (params) {
        var that = this
        req.profile.getUserDetail()
            .then(res => {
                if (res.status == 0) {
                    wx.setStorage({
                        key: "userInfo",
                        data: res.data.userInfo,
                        success(res) {
                            that.setData({
                                userInfo: wx.getStorageSync('userInfo'),
                                isLogin: wx.getStorageSync('userInfo') ? true : false
                            })
                            wx.hideLoading()
                        }
                    })
                } else {
                    that.setData({
                        isLogin: false
                    })
                    message(res.msg)
                    wx.clearStorage()
                    wx.hideLoading()
                }
            })

    },
    bindGetUserInfo(e) {
        let that = this
        //如果用户拒绝授权走此处
        if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
            // console.log('用户拒绝了授权，无法访问小程序');
        }
        //如果用户接受授权走此处
        if (e.detail.errMsg == 'getUserInfo:ok') {
            app.authorize().then(function (res) {
                // 获取token
                // 1有token登陆了；2 有unionid没有token，需要绑定手机号；false 错误 停止
                if (res.status == 1) {
                    that.setData({
                        userInfo: wx.getStorageSync('userInfo'),
                        isLogin: true
                    })
                } else {
                    message(res.msg)
                    wx.navigateTo({
                        url: '/pages/home/index/index'
                    })
                }
                wx.hideLoading()
            })
        }
    },
    beTeacher: function () {
        wx.navigateTo({
            url: '/pages/user/beTeacher/index/index'
        })
    },
    handleLink: function (e) {
        if (this.data.isLogin) {
            if (e.currentTarget.dataset.title == '在线客服') {
                wx.makePhoneCall({
                    phoneNumber: e.currentTarget.dataset.url
                })
                return false
            }
            wx.navigateTo({
                url: e.currentTarget.dataset.url
            })
        } else {
            message('您未登录，请先登录！')
        }
    },
    buy: function (params) {
        this.setData({
            isShowBuy: true
        })
    },
    // 小程序支付
    payment: function (param) {
        var that = this
        this.closeBuy()
        wx.requestPayment({
            timeStamp: param.detail.timeStamp,
            nonceStr: param.detail.nonceStr,
            package: param.detail.package,
            signType: 'MD5',
            paySign: param.detail.paySign,
            success(res) {
                // 更新缓存中的咨询次数
                that.getUserInfo()
            },
            fail(res) {
                message('购买已取消，请重新点击购买按钮！')
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        showLoading('加载中...')
        if (wx.getStorageSync('userInfo')) {
            this.setData({
                userInfo: wx.getStorageSync('userInfo'),
                isLogin: true
            })
        }
        this.getUserInfo()
        // wx.hideTabBar()
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