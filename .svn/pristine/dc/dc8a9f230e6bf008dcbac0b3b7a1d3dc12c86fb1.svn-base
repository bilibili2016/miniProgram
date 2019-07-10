// miniprogram/pages/user/beTeacher/label/label.js
const req = require('../../../../../req/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [{
        title: '小学高中',
        url: ""
      },
      {
        title: '职业生涯规划',
        url: ""
      },
      {
        title: '学习方法',
        url: ""
      }
    ],
  },
  returnPage: function (params) {
    wx.navigateTo({
      url: '/pages/user/beTeacher/index/index'
    })

  },
  tagSelect: function (params) {
    req.profile.tagSelect()
      .then(res => {
        if (res.status == 0) {
          this.setData({
            itemList: res.data.tagSelect,
          })
        }
      })
  },
  handleLink: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '标签设置'
    })
    this.tagSelect()
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