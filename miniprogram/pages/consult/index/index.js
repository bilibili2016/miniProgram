// 接口
const req = require('../../../req/index')
import {
    message,
    chatTime,
    showLoading
} from '../../../utils/common'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teacherIcon: 'https://h5-image.1911edu.com/miniProgram-icon1.png',
        identity: '1', //用户访问类型 1 学生 2 老师
        pull: false,
        page: 1,
        limit: 20,
        noData: {
            isShowTitle: false,
            title: '专家咨询',
            imgUrl: 'https://h5-image.1911edu.com/mini-noActivity.png',
            dataDesc: '您还没有咨询记录~',
            btnText: '去首页看看',
            btnUrl: '/pages/home/index/index',
            width: '410rpx'
        },
        isTeacher: true, //1是老师 2是学生
        teacherList: [],
        loading: true,
    },
    goInfo: function (e) {
        e.currentTarget.dataset.id
        wx.navigateTo({
            url: `/pages/consult/chat/chat?receiveId=${e.currentTarget.dataset.id}`
        })
        // 判断当前用户是否是教师
        // if (this.data.isTeacher) {
        //     e.currentTarget.dataset.id
        //     wx.navigateTo({
        //         url: `/pages/consult/chat/chat?receiveId=${e.currentTarget.dataset.id}`
        //     })
        // } else {
        //     // 用户身份 是否还有咨询次数
        //     if (this.data.isChat > 0) {
        //         e.currentTarget.dataset.id
        //         wx.navigateTo({
        //             url: `/pages/consult/chat/chat?receiveId=${e.currentTarget.dataset.id}`
        //         })
        //     } else {
        //         message('咨询次数已用尽，请先去购买吧！')
        //     }
        // }
    },
    getConsultationList: function () {
        req.consult.getConsultationList({
                page: this.data.page,
                limit: this.data.limit,
                type: this.data.identity
            })
            .then(res => {
                if (res.status == 0) {
                    for (let i = 0; i < res.data.teacherList.length; i++) {
                        res.data.teacherList[i].send_time = chatTime(res.data.teacherList[i].send_time)
                    }
                    if (this.data.pull) {
                        this.setData({
                            teacherList: res.data.teacherList,
                            pull: false,
                            loading: false
                        })
                    } else {
                        this.setData({
                            teacherList: this.data.teacherList.concat(res.data.teacherList),
                            loading: false
                        })
                    }
                } else {
                    this.setData({
                        loading: false
                    })
                    message(res.msg)
                }
                wx.hideLoading()
            })
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
                                isChat: Number(wx.getStorageSync('userInfo').consult_time)
                            })
                        }
                    })
                    this.setData({
                        isTeacher: res.data.userInfo.user_status == '2' ? true : false,
                        isChat: Number(res.data.userInfo.consult_time),
                        identity: res.data.userInfo.user_status == '2' ? 2 : 1
                    })
                    this.getConsultationList()
                    if (this.data.isTeacher) {
                        var title = '在线咨询'
                    } else {
                        var title = '专家咨询'
                    }
                    wx.setNavigationBarTitle({
                        title: title
                    })
                } else {
                    message(res.msg)
                    wx.clearStorage()
                    wx.hideLoading()
                }
                wx.stopPullDownRefresh()
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        showLoading('加载中...')
        let title
        if (this.data.isTeacher) {
            title = '在线咨询'
        } else {
            title = '专家咨询'
        }
        wx.setNavigationBarTitle({
            title: title
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
        this.setData({
            pull: true
        })
        this.getUserInfo()
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
        this.setData({
            pull: true
        })
        this.getUserInfo()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        })
        this.getConsultationList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})