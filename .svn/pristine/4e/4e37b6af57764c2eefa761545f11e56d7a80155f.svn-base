// pages/home/index/index.js
const req = require('../../../req/index')
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        teacherIcon: 'https://h5-image.1911edu.com/miniProgram-icon1.png',
        socketUrl: 'wss://ceshiapi.1911edu.com:2120',
        bannerList: [],
        teacherList: [],
        isUser: true,
        teacherParams: {
            page: 1,
            limit: 10,
            total: "",
            search_word: ""
        },
        push: false,
        inputValue: '',
        showSkeleton: false,
        showRegister: false
    },
    bindGetUserInfo(e) {
        var that = this
        //如果用户拒绝授权走此处
        if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
            console.log('用户拒绝了授权，无法访问小程序');
        }
        //如果用户接受授权走此处
        if (e.detail.errMsg == 'getUserInfo:ok') {
            // 登录获取token
            app.authorize().then(function (res) {
                // 获取token : 1有token登陆了；2 有unionid没有token，需要绑定手机号；false 错误 停止
                if (res.status == 1) {
                    wx.redirectTo({
                        url: `/pages/user/profile/profile`
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
    success: function () {},
    onClose: function (param) {
        this.setData({
            showRegister: false
        })
    },
    handleSearch: function () {
        wx.navigateTo({
            url: `/pages/home/search/search`
        })
    },
    //轮播图
    getBannerList: function () {
        req.home.getBannerList({
                type: '1'
            })
            .then(res => {
                if (res.status == 0) {
                    this.setData({
                        bannerList: res.data.bannerList
                    })
                }
            })
    },
    //教师列表
    getTeacherList: function (flag) {
        this.data.teacherParams.total = ''
        this.setData({
            teacherParams: this.data.teacherParams
        })
        req.home.getTeacherList(this.data.teacherParams)
            .then(res => {
                if (res.status == 0) {
                    if (this.data.push) {
                        var list
                        list = this.data.teacherList.concat(res.data.teacherList)
                        this.data.teacherParams.total = res.data.pageCount
                    } else {
                        var list
                        list = res.data.teacherList
                        this.data.teacherParams.total = res.data.pageCount
                    }
                    this.setData({
                        teacherList: list,
                        teacherParams: this.data.teacherParams,
                        push: false
                    })
                }
            })
    },
    // 挑战活动页
    handleActive: function (e) {
        let id = e.currentTarget.dataset.id
        let type = e.currentTarget.dataset.type
        if (type == 6) {
            wx.navigateTo({
                url: `/pages/home/activity/home/home?id=${id}`
            })
        }
    },
    handleLink: function (e) {
        let id = e.currentTarget.dataset.id
        let url = e.currentTarget.dataset.url
        wx.navigateTo({
            url: `${url}?id=${id}`
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            push: true
        })
        if (this.data.teacherParams.total > this.data.teacherList.length) {
            this.setData({
                "teacherParams.page": ++this.data.teacherParams.page,
            })
            this.getTeacherList()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            teacherList: []
        })
        if (wx.getStorageSync('userInfo')) {
            if (wx.getStorageSync('userInfo').user_status == "2") {
                this.setData({
                    isUser: false
                })
            } else {
                this.setData({
                    isUser: true
                })
                this.getBannerList()
                this.getTeacherList()
            }
        } else {
            this.setData({
                isUser: true
            })
            this.getBannerList()
            this.getTeacherList()
        }
        // setTimeout(() => {
        //     this.setData({
        //         showSkeleton: false
        //     })
        // }, 10000)
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})