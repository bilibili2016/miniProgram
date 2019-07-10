// miniprogram/pages/user/beTeacher/topic/topic.js
const req = require('../../../../req/index')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        questionList: [],
        emptyList: [{
                title: "",
                content: ''
            },
            {
                title: "",
                content: ''
            },
            {
                title: "",
                content: ''
            }
        ]
    },
    questionList: function (params) {
        var that = this
        req.profile.questionList()
            .then(res => {
                if (res.status == 0) {
                    this.data.questionList = res.data.questionList
                    var len = 3 - res.data.questionList.length;
                    for (var i = 0; i < len; i++) {
                        (function (i) {
                            var obj = {
                                title: "",
                                content: ''
                            }
                            that.data.questionList.push(obj)
                        })(i);
                    }

                    this.setData({
                        questionList: this.data.questionList,
                    })
                }
            })
    },
    bindinput: function (e) {
        let index = e.currentTarget.dataset.index
        let val = e.detail.value
        this.data.questionList[index].content = val
        this.setData({
            questionList: this.data.questionList
        })
    },
    inputBindblur: function (e) {
        let index = e.currentTarget.dataset.index
        let val = e.detail.value
        this.data.questionList[index].title = val
        this.setData({
            questionList: this.data.questionList
        })
    },
    textBindblur: function (e) {
        // console.log(e);
        let index = e.currentTarget.dataset.index
        let val = e.detail.value
        this.data.questionList[index].content = val
        this.setData({
            questionList: this.data.questionList
        })
    },
    save: function (params) {
        // console.log(this.data.questionList);
        req.profile.setQuestion({
                params_json: JSON.stringify(this.data.questionList)
            })
            .then(res => {
                if (res.status == 0) {
                    wx.showModal({
                        title: '提示',
                        content: '请确保提交的信息为真实有效的，否则将会受到相应的惩罚！',
                        success(res) {
                            if (res.confirm) {
                                // wx.navigateTo({
                                //     url: '/pages/user/beTeacher/index/index'
                                // })
                                wx.navigateBack({
                                    delta: 1
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })

                }
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '话题设置'
        })
        this.questionList()
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