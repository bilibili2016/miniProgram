// components/common/noData/noData.js
const app = getApp();
import {
    message,
    showLoading
} from "../../../utils/common";
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        url: 'pages/home/index/index',
        padding: app.globalData.padding,
        showRegister: false,
        active: 0,
        path: '/pages/home/index/index',
        index: 0,
        current: true,
        list: [{
                // "pagePath": "/pages/user/beTeacher/index/index",
                "pagePath": "/pages/home/index/index",
                "text": "首页",
                "iconPath": "../../../images/mini-home.png",
                "selectedIconPath": "../../../images/mini-homeChecked.png"
            },
            {
                "pagePath": "/pages/consult/index/index",
                "text": "在线咨询",
                "iconPath": "../../../images/mini-consult.png",
                "selectedIconPath": "../../../images/mini-consultChecked.png"
            },
            {
                "pagePath": "/pages/user/profile/profile",
                "text": "我的",
                "iconPath": "../../../images/mini-my.png",
                "selectedIconPath": "../../../images/mini-myChecked.png"
            }
        ]
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //
        handleLink(e) {
            if (e.currentTarget.dataset.url == this.data.list[this.data.active - 1].pagePath) {
                this.setData({
                    current: false
                })
            } else {
                this.setData({
                    current: true
                })
            }
            this.setData({
                path: e.currentTarget.dataset.url,
                index: e.currentTarget.dataset.index
            })
            if (this.data.index == 0 && this.data.current) {
                showLoading("加载中...")
                wx.redirectTo({
                    url: this.data.path
                })
                return false
            }
        },
        bindGetUserInfo(e) {
            // 如果点击的是当前这个页面 不进行跳转
            if (!this.data.current) {
                return false
            }
            if (wx.getStorageSync('userInfo')) {
                wx.redirectTo({
                    url: this.data.path
                })
                return false
            }
            var that = this
            //如果用户拒绝授权走此处
            if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
                console.log('用户拒绝了授权，无法访问小程序');
            }
            //如果用户接受授权走此处
            if (e.detail.errMsg == 'getUserInfo:ok') {
                // 登录获取token
                app.authorize().then(function (res) {
                    // 获取到token 绑定了微信
                    // 1有token登陆了；2 有unionid没有token，需要绑定手机号；false 错误 停止
                    if (res.status == 1) {
                        wx.redirectTo({
                            // wx.navigateTo({
                            url: that.data.path
                        })
                    } else if (res.status == 2) {
                        that.setData({
                            showRegister: true
                        })
                    } else {
                        that.setData({
                            showRegister: false
                        })
                        message(res.msg)
                    }
                    wx.hideLoading()
                })
            }
        },
        onClose() {
            this.setData({
                showRegister: false
            })
        },
        onSuccess() {
            this.setData({
                showRegister: false
            })
            wx.reLaunch({
                url: this.data.path
            })

        },
    },
    ready: function () {
        var url = getCurrentPages()[getCurrentPages().length - 1].route
        if (url == 'pages/home/index/index') {
            this.setData({
                active: 1
            })
        }
        if (url == 'pages/consult/index/index') {
            this.setData({
                active: 2
            })
        }
        if (url == 'pages/user/profile/profile') {
            this.setData({
                active: 3
            })
        }
    },
})