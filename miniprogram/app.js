//app.js
const req = require('./req/index')
import {
    message,
    showLoading
} from './utils/common'
App({
    globalData: {
        padding: 0
    },
    onLaunch: function () {
        // 判断当前版本是否可以使用云函数    目前没有使用  暂时关闭
        // if (!wx.cloud) {
        //     console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        // } else {
        //     wx.cloud.init({
        //         traceUser: true,
        //     })
        // }

        this.myData = {
            status: false,
            msg: ''
        }
        wx.getSystemInfo({
            success: res => {
                if (res.model.indexOf('iPhone X') > -1) {
                    this.globalData.padding = "30rpx"
                }
            }
        })
        //无网络时做提示no net
        wx.onNetworkStatusChange(function (res) {
            if (res.networkType == "none") {
                showLoading('网络异常...')
            } else {
                wx.hideLoading()
            }
        })
    },
    //验证用户是否授权
    authorize: function (selector) {
        let that = this
        return new Promise((resolve, reject) => {
            // if (wx.getStorageSync('loginData').token) {//
            //     that.myData.status = 1
            //     that.myData.msg = 'ok'
            //     resolve(that.myData)
            //     if (!wx.getStorageSync('userInfo')) {
            //         that.getUserDetail()
            //     }
            if (wx.getStorageSync('userInfo')) {
                that.myData.status = 1
                that.myData.msg = 'ok'
                resolve(that.myData)
            } else {
                wx.getStorage({
                    key: 'authorizeData',
                    success(res) {
                        showLoading('登录中...')
                        resolve(that.getlogin())
                    },
                    fail(err) {
                        showLoading('登录中...')
                        //重新获取登录状态
                        resolve(that.getlogin())
                    }
                })
            }
        })
    },
    //用户换取换取session_key和openid
    getlogin: function () {
        let that = this
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: 'https://api.1911edu.com/Miniprogram/Login/loginCode',
                            data: {
                                code: res.code
                            },
                            success: codeRes => {
                                var dataRes = codeRes.data
                                var obj = {}
                                obj.session_key = dataRes.data.session_key
                                obj.openid = dataRes.data.openid
                                if (dataRes.status == 0) {
                                    //将或得到的session_key 保存到缓存中
                                    wx.setStorage({
                                        key: "authorizeData",
                                        data: obj
                                    })
                                    //获取用户unionId
                                    resolve(that.getUserInfo(dataRes.data.session_key));
                                } else {
                                    that.myData.status = false
                                    that.myData.msg = '换取session_key和openid失败'
                                    resolve(that.myData)
                                }
                            }
                        })
                    } else {
                        that.myData.status = false
                        that.myData.msg = '登录失败！' + res.errMsg
                        resolve(that.myData)
                    }
                },
                fail(err) {
                    that.myData.status = false
                    that.myData.msg = err
                    resolve(that.myData)
                }
            })
        })

    },
    //根据session_key换取unionId
    getUserInfo: function (session_key) {
        let that = this
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                success: getUserInfoRes => {
                    //网络请求换取unionId
                    wx.request({
                        url: 'https://api.1911edu.com/Miniprogram/Login/decryptData',
                        data: {
                            encrypted_data: getUserInfoRes.encryptedData,
                            iv: getUserInfoRes.iv,
                            session_key: session_key
                        },
                        success: res => {
                            var dataRes = res.data
                            if (dataRes.status == 0) {
                                //返回数据保存到缓存中
                                wx.setStorage({
                                    key: "loginData",
                                    data: dataRes.data,
                                    success: function () {
                                        // 缓存中有没有token
                                        if (wx.getStorageSync('loginData').token) {
                                            // that.myData.status = 1
                                            // that.myData.msg = 'ok'
                                            // resolve(that.myData)
                                            resolve(that.getUserDetail());
                                        } else {
                                            that.myData.status = 2
                                            that.myData.msg = 'ok'
                                            resolve(that.myData)
                                        }
                                    }
                                })
                            } else {
                                that.myData.status = false
                                that.myData.msg = res.msg
                                resolve(that.myData)
                            }
                        }
                    })
                }
            })
        })

    },
    getUserDetail: function () {
        var that = this
        return new Promise((resolve, reject) => {
            req.profile.getUserDetail()
                .then(res => {
                    if (res.status == 0) {
                        wx.setStorage({
                            key: "userInfo",
                            data: res.data.userInfo,
                            success: () => {
                                that.myData.status = 1
                                that.myData.msg = 'ok'
                                resolve(that.myData)
                            }
                        })
                    } else {
                        res.msg ? message(res.msg) : ''
                    }
                })
        })
    },

})