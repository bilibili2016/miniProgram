// miniprogram/pages/user/setUser/bindTel/bindTel.js
import {
  message
} from "../../../../utils/common";
const req = require('../../../../req/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDown: 61,
    isGetCode: true,
    form: {
      phone: '',
      code: '',
    },
  },
  formSubmit: function (e) {
    var that = this
    this.setData({
      form: e.detail.value
    })
    if (!this.data.form.phone) {
      message('手机号不能为空！')
      return false
    }
    if (this.data.form.phone) {
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.form.phone)) {
        message('手机号格式有误！')
        return false
      }
    }
    if (!this.data.form.code) {
      message('验证码不能为空！')
      return false
    }
    req.home.register({
        phone: this.data.form.phone,
        phoneSmsCode: this.data.form.code,
        unionid: wx.getStorageSync('loginData').unionId
      })
      .then(res => {
        if (res.status == 0) {
          message(res.msg)
          wx.getStorage({
            key: 'loginData',
            success(storage) {
              storage.data.token = res.data.token
              wx.setStorage({
                key: "loginData",
                data: storage.data,
                success: function (param) {
                  app.getUserDetail()
                  that.onSuccess()
                }
              })
            }
          })
        } else {
          message(res.msg)
        }
      })
  },
  verifyPhone() {
    if (this.data.form.phone) {
      if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.form.phone)) {
        return true
      } else {
        message('手机号格式有误！')
        return false
      }
    } else {
      message('手机号不能为空！')
      return false
    }
  },
  appSendSms: function (param) {
    message('验证码发送成功！')
    this.setData({
      isGetCode: false
    })
    var countDown = this.data.countDown;
    let clock = setInterval(() => {
      countDown--
      if (countDown >= 0) {
        this.setData({
          countDown: countDown
        })
      } else {
        clearInterval(clock)
        this.setData({
          countDown: 61,
          isGetCode: true,
          btnTxt: '重新获取'
        })
      }
    }, 1000)
  },
  getCode() { //验证码倒计时
    var that = this
    if (this.data.isGetCode && this.verifyPhone()) {
      req.home.appSendSms({
          phone: this.data.form.phone,
          type: 1
        })
        .then(res => {
          if (res.status == 0) {
            that.appSendSms()
          } else {
            message(res.msg)
          }
        })
    }
  },
  inputPhone: function (e) {
    this.data.form.phone = e.detail.value
    this.setData({
      form: this.data.form
    })
  },
  inputCode: function (e) {
    this.data.form.code = e.detail.value
    this.setData({
      form: this.data.form
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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