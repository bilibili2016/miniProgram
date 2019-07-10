// miniprogram/pages/user/setAppointment.js
const req = require('../../../req/index');
import {
    message
} from '../../../utils/common'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        year: new Date().getFullYear(),
        day: new Date().getDate() > 9 ? new Date().getDate() : `0${new Date().getDate()}`,
        month: new Date().getMonth() + 1 >= 10 ? new Date().getMonth() : `0${new Date().getMonth()+1}`,
        date: '',
        isSwitch: false,
        price: '',
        startTime: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        endTime: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        speciallist: [{
            date: '',
            background: '#FF4A3A',
            text: '',
            color: '#fff'
        }],
        startIndex: 0,
        endIndex: 0,
        selectStartTime: '',
        selectEndTime: '',
        selectDate: '',
    },
    // 点击日历中的某一天
    dayClick: function (e) {
        // 选择的时间必须比当前时间大
        if (Number(e.detail.date.split("-")[1]) == this.data.month && Number(e.detail.date.split("-")[2]) > this.data.day) {
            var obj = {
                date: e.detail.date,
                background: '#6317A5',
                text: '',
                color: '#fff'
            }
            this.data.speciallist = []
            this.data.speciallist.push(obj)
            this.setData({
                speciallist: this.data.speciallist,
                selectDate: e.detail.date
            })
        }
        if (e.detail.date.split("-")[1] > this.data.month) {
            var obj = {
                date: e.detail.date,
                background: '#6317A5',
                text: '',
                color: '#fff'
            }
            this.data.speciallist = []
            this.data.speciallist.push(obj)
            this.setData({
                speciallist: this.data.speciallist,
                selectDate: e.detail.date
            })
        }
    },
    bindPickerStart: function (e) {
        this.setData({
            startIndex: e.detail.value,
            selectStartTime: this.data.startTime[e.detail.value]
        })
    },
    bindPickerEnd: function (e) {
        this.setData({
            endIndex: e.detail.value,
            selectEndTime: this.data.endTime[e.detail.value]
        })
    },
    changeInput: function (e) {
        this.setData({
            price: e.detail.value
        })
    },
    onChange: function (e) {
        this.setData({
            isSwitch: e.detail
        })
    },
    setBespokeTime: function (param) {

        if (this.data.isSwitch && this.data.price == '' && parseInt(Number(this.data.price)) <= 0) {
            message('请输入价格！')
            return false
        }
        // if (!this.data.selectDate) {
        //     message('请选择可预约日期！')
        //     return false
        // }
        // if (!this.data.selectStartTime) {
        //     message('请选择预约开始时间！')
        //     return false
        // }
        // if (!this.data.selectEndTime) {
        //     message('请选择预约结束时间！')
        //     return false
        // }
        var st = Number(this.data.selectStartTime.split(":")[0])
        var et = Number(this.data.selectEndTime.split(":")[0])
        if (this.data.selectEndTime != 0 && this.data.selectStartTime != 0) {
            if (et - st <= 0) {
                message('结束时间不能小于开始时间！')
                return false
            }
        }
        req.profile.setBespokeTime({
                is_offline_meet: this.data.isSwitch ? 1 : 0,
                price: this.data.price,
                bespoke_date: this.data.selectDate,
                bespoke_start_time: this.data.selectStartTime,
                bespoke_end_time: this.data.selectEndTime
            })
            .then(res => {
                if (res.status == 0) {
                    message("设置预约预约时间成功！")
                    wx.reLaunch({
                        url: `/pages/user/profile/profile`
                    })
                } else {
                    message(res.msg)
                }
            })
    },
    //
    getTeacherInfoByUser: function () {
        req.profile.getTeacherInfoByUser({
                is_offline_meet: this.data.isSwitch
            })
            .then(res => {
                if (res.status == 0) {
                    if (res.data.teacherInfo.is_offline_meet == '0') {
                        this.data.isSwitch = false
                    } else {
                        this.data.isSwitch = true
                    }
                    this.setData({
                        isSwitch: this.data.isSwitch,
                        price: res.data.teacherInfo.price
                    })

                } else {
                    message(res.msg)
                }
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTeacherInfoByUser()
        this.setData({
            date: `${this.data.year}-${this.data.month}-${this.data.day}`
        })
        var obj = {
            date: this.data.date,
            background: '#fff',
            text: '',
            color: '#a1a1a1'
        }
        this.data.speciallist = []
        this.data.speciallist.push(obj)
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