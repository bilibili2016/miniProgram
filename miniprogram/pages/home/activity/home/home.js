// pages/home/activity/home/home.js
import {
    message
} from "../../../../utils/common.js";
const req = require('../../../../req/index');
const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeId: 5,
        courseid: 0,
        courseDetail: '',
        applyPopShow: false,
        showRegister: false,
        isScroll: true,
        form: {
            name: '',
            phone: '',
            code: '',
            radio: 0,
        },
        countDown: 61,
        problemList: [],
        isGetCode: true,
    },
    // 判断登录
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
                // 获取token
                // 1有token登陆了；2 有unionid没有token，需要绑定手机号；false 错误 停止
                if (res.status == 1) {
                    that.setData({
                        applyPopShow: true,
                        isScroll: false
                    })
                } else if (res.status == 2) {
                    that.setData({
                        showRegister: true,
                        isScroll: false
                    })
                } else {
                    that.setData({
                        applyPopShow: false,
                        isScroll: true
                    })
                    message(res.msg)
                }
                wx.hideLoading()
            })
        }
    },
    // 关闭form
    onClose() {
        this.setData({
            applyPopShow: false,
            showRegister: false,
            isScroll: true
        });
    },
    //报名身份切换
    radioChange: function (e) {
        this.data.form.radio = e.detail.value
        this.setData({
            form: this.data.form
        })
    },
    inputName: function (e) {
        this.data.form.name = e.detail.value
        this.setData({
            form: this.data.form
        })
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
    // 提交表单
    formSubmit: function (e) {
        this.setData({
            form: e.detail.value
        })
        if (this.data.form.radio == 0) {
            message('请选择您的身份！')
            return false
        }
        if (!this.data.form.name) {
            message('姓名不能为空！')
            return false
        }
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
        req.home.questionnaireAdd({
                activity_id: this.data.activeId,
                user_name: this.data.form.name,
                phone: this.data.form.phone,
                user_type: this.data.form.radio
            })
            .then(res => {
                if (res.status == 0) {
                    wx.navigateTo({
                        url: '/pages/home/activity/success/success'
                    })
                }
            })
    },
    onSuccessRegister: function () {
        this.setData({
            showRegister: false,
            // applyPopShow: true,
            isScroll: true
        });
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
    //验证码倒计时
    getCode() {
        if (this.data.isGetCode && this.verifyPhone()) {
            this.setData({
                isGetCode: false
            })
            req.home.appSendSms({
                    phone: this.data.form.phone,
                    type: 1
                })
                .then(res => {
                    if (res.status == 0) {
                        this.appSendSms()
                    } else {
                        this.setData({
                            isGetCode: true
                        })
                        message(res.msg)
                    }
                })
        }
    },
    getProblems: function (param) {
        req.home.getProblems()
            .then(res => {
                if (res.status == 0) {
                    this.setData({
                        problemList: res.data
                    })
                }
            })
    },
    goDetail: function (param) {
        wx.navigateTo({
            url: `/pages/other/userProtocol/userProtocol`
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //     activeId: options.id
        // })
        this.getProblems()
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
        // wx.switchTab({
        //     url: '/pages/home/index/index',
        //     success: function (e) {
        //         console.log(e);

        //     }
        // })
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

    },

})