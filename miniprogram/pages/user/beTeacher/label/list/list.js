// miniprogram/pages/user/beTeacher/label/list/list.js
import Toast from '../../../../../miniprogram_npm/vant-weapp/toast/toast';

const req = require('../../../../../req/index')
//
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tagList: [],
    checkedList: []
  },
  tagList: function (params) {
    req.profile.tagList()
      .then(res => {
        if (res.status == 0) {
          var list = res.data.tagList
          for (var i in list) {
            for (var j in list[i].children) {
              if (list[i].children[j].is_sel == 1) {
                this.data.checkedList.push(list[i].children[j].id)
              }
            }
          }

          this.setData({
            tagList: res.data.tagList,
            checkedList: this.data.checkedList
          })

        }
      })
  },

  handleTagClick: function (e) {
    let id = e.currentTarget.dataset.id
    let isSel = e.currentTarget.dataset.issel
    if (isSel == 0) {
      //添加
      this.data.checkedList.push(id)
      this.setData({
        checkedList: this.data.checkedList,
      })
      this.setChecked(1, id)
      if (this.data.checkedList.length > 3) {
        let firstId = this.data.checkedList[0]
        this.data.checkedList.splice(0, 1)
        this.setData({
          checkedList: this.data.checkedList,
        })
        this.setChecked(2, firstId)
      }
    } else if (isSel == 1) {
      //删除
      var arrIndex = this.data.checkedList.indexOf(id)
      this.data.checkedList.splice(arrIndex, 1)
      this.setData({
        checkedList: this.data.checkedList,
      })
      this.setChecked(2, id)
    }
  },
  /**
   * 计算列表选中样式
   * type: 1 添加 / 2 删除
   */
  setChecked: function (type, id) {
    for (var j in this.data.tagList) {
      for (var k in this.data.tagList[j].children) {
        if (id == this.data.tagList[j].children[k].id) {
          if (type == 2) {
            this.data.tagList[j].children[k].is_sel = 0
          } else {
            this.data.tagList[j].children[k].is_sel = 1
          }
        }
      }
    }
    this.setData({
      tagList: this.data.tagList,
    })
    // console.log(this.data.checkedList);

  },
  //重置
  handleReset: function (params) {
    for (var j in this.data.tagList) {
      for (var k in this.data.tagList[j].children) {
        this.data.tagList[j].children[k].is_sel = 0
      }
    }
    this.data.checkedList = []
    this.setData({
      tagList: this.data.tagList,
      checkedList: this.data.checkedList
    })
  },
  //完成
  handleFinish: function (params) {
    if (this.data.checkedList.length == 0) {
      Toast('至少选择一个标签');
    } else {
      req.profile.setTags({
          tag_id: JSON.stringify(this.data.checkedList)
        })
        .then(res => {
          if (res.status == 0) {
            wx.navigateTo({
              url: '/pages/user/beTeacher/label/index/index'
            })
          }
        })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tagList()
    wx.setNavigationBarTitle({
      title: '标签'
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