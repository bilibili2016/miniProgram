// components/common/register/register.js
import {
    message
} from "../../../utils/common";
const req = require('../../../req/index')
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        countDown: 61,
        isGetCode: true,
        form: {
            phone: '',
            code: '',
        },
        forget: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goDetail: function (param) {
            wx.navigateTo({
                url: `/pages/other/userProtocol/userProtocol`
            })
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
                this.setData({
                    isGetCode: false
                })
                req.home.appSendSms({
                        phone: this.data.form.phone,
                        type: 1
                    })
                    .then(res => {
                        if (res.status == 0) {
                            that.appSendSms()
                        } else {
                            this.setData({
                                isGetCode: true
                            })
                            message(res.msg)
                        }
                    })
            }
        },
        getThirdPartUser: function (param) {
            if (this.data.forget == this.data.form.phone) {
                message(res.msg)
            } else {
                req.profile.getThirdPartUser({
                        phone: this.data.form.phone
                    })
                    .then(res => {
                        if (res.status == 0) {
                            this.getCode()
                        } else {
                            this.setData({
                                forget: this.data.form.phone
                            })
                            message(res.msg)
                        }
                    })
            }

        },
        onClose: function (e) {
            this.triggerEvent('close')
        },
        onSuccess: function (e) {
            this.triggerEvent('success')
        },
        inputPhone: function (e) {
            this.data.form.phone = e.detail.value
            this.setData({
                form: this.data.form
            })
        },
        getPhone: function (e) {
            console.log(e);

            // this.data.form.phone = e.detail.value
            // this.setData({
            //     form: this.data.form
            // })
        },
        inputCode: function (e) {
            this.data.form.code = e.detail.value
            this.setData({
                form: this.data.form
            })
        },

    }
})