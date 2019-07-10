// miniprogram/pages/user/myCollection/myCollection.js
const req = require('../../../req/index')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teacherList: [],
        noData: {
            isShowTitle: false,
            title: '',
            imgUrl: 'https://h5-image.1911edu.com/mini-noActivity.png',
            dataDesc: '您还没有任何收藏~',
            btnText: '',
            btnUrl: '',
            width: '410rpx'
        },
        teacherIcon: 'https://h5-image.1911edu.com/miniProgram-icon1.png',
        minHeight: '500rpx'
    },
    handleLink: function (e) {
        wx.navigateTo({
            url: `/pages/home/professor/detail/detail?id=${e.currentTarget.dataset.id}`
        })
    },
    collectionTeacherList: function (param) {
        req.profile.collectionTeacherList()
            .then(res => {
                if (res.status == 0) {
                    this.setData({
                        teacherList: res.data.teacherList
                    })
                }
            })
    },
    setHeight: function (param) {
        this.setData({
            minHeight: `${wx.getSystemInfoSync().windowHeight}rpx`
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.collectionTeacherList()
        this.setHeight()
        wx.setNavigationBarTitle({
            title: '我的收藏'
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