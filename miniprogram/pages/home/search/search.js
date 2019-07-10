// miniprogram/pages/home/search/search.js
const req = require('../../../req/index')
import {
    message
} from '../../../utils/common'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teacherIcon: 'https://h5-image.1911edu.com/miniProgram-icon1.png',
        isHistory: true,
        teacherParams: {
            page: 1,
            limit: 10,
            total: "",
            search_word: ""
        },
        historyList: [],
        hotList: [],
        teacherList: [],
        isSearch: false
    },
    exit: function (param) {
        this.data.teacherParams.search_word = ''
        this.setData({
            isSearch: false,
            teacherParams: this.data.teacherParams
        })
        this.searchRecordList()
    },
    shangeString: function (string) {
        var str = string.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig, "");
        return str
    },
    bindinput: function (e) {
        let val = this.shangeString(e.detail.value)
        this.data.teacherParams.search_word = val
        this.setData({
            teacherParams: this.data.teacherParams
        })
    },
    bindconfirm: function (e) {
        let val = e.detail.value.replace(/\s+/g, '')
        this.data.teacherParams.search_word = val
        this.setData({
            teacherParams: this.data.teacherParams
        })
        this.getTeacherList()
    },
    clearUserSearchRecord: function (param) {
        req.home.clearUserSearchRecord()
            .then(res => {
                if (res.status == 0) {
                    this.searchRecordList()
                }
            })
    },
    searchRecordList: function (param) {
        req.home.searchRecordList()
            .then(res => {
                if (res.status == 0) {
                    this.setData({
                        hotList: res.data.hotSearchRecord,
                        historyList: res.data.userSearchRecord,
                    })
                }
            })
    },
    //教师列表
    getTeacherList: function (flag) {
        this.data.teacherParams.total = ''
        if (flag != 1) {
            this.data.teacherParams.limit = 10
            this.data.teacherParams.page = 1
        }
        this.setData({
            teacherParams: this.data.teacherParams
        })
        req.home.getTeacherList(this.data.teacherParams)
            .then(res => {
                if (res.status == 0) {
                    let list
                    //flag 2:搜索
                    if (flag == 1) {
                        list = this.data.teacherList.concat(res.data.teacherList)
                    } else {
                        list = res.data.teacherList
                        this.setData({
                            isSearch: true
                        })
                    }
                    this.data.teacherParams.total = res.data.pageCount
                    this.setData({
                        teacherList: list,
                        teacherParams: this.data.teacherParams,
                    })
                }
            })
    },
    handleLink: function (e) {
        let id = e.currentTarget.dataset.id
        let url = e.currentTarget.dataset.url
        wx.navigateTo({
            url: `${url}?id=${id}`
        })
    },
    onclick: function (e) {
        let val = e.currentTarget.dataset.value.replace(/\s+/g, '')
        this.data.teacherParams.search_word = val
        this.setData({
            teacherParams: this.data.teacherParams
        })
        this.getTeacherList()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.searchRecordList()
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
        if (this.data.teacherParams.total > this.data.teacherList.length) {
            this.setData({
                "teacherParams.page": ++this.data.teacherParams.page,
            })
            this.getTeacherList(1)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})