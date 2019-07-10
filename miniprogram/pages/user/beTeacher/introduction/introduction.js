// miniprogram/pages/user/beTeacher/introduction/introduction.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        remark: "",
        inputLen: 0
    },
    bindinput: function (e) {
        this.setData({
            inputLen: e.detail.value.length,
            remark: e.detail.value
        })
    },
    bindconfirm: function (e) {
        this.setData({
            remark: e.detail.value
        })
    },
    submit: function (params) {
        var that = this
        wx.showModal({
            title: '提示',
            content: '请确保提交的信息为真实有效的，否则将会受到相应的惩罚！',
            success(res) {
                if (res.confirm) {
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2];
                    prevPage.data.teacherInfo.remark = that.data.remark
                    prevPage.setData({
                        teacherInfo: prevPage.data.teacherInfo
                    })
                    prevPage.editTeacherInfo()
                    wx.navigateBack({
                        delta: 1
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        setTimeout(() => {
            this.setData({
                remark: options.remark,
                inputLen: options.remark.length
            })
        }, 500);

        wx.setNavigationBarTitle({
            title: '个人介绍'
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