const req = require('../../../../req/index');
import {
    message
} from '../../../../utils/common'
Page({
    data: {
        year: new Date().getFullYear(), // 年份
        month: new Date().getMonth() + 1, // 月份
        day: new Date().getDate(),
        teacherInfo: {},
        indexArr: [],
        teacherId: "",
        selectDate: "",
        active: false,
        disableList: [],
        checkTimeIdList: [], //时间段id集合
        checkDateList: [], // 日期多选集合
        city: "北京",
        topic: "",
        length: 0,
        showTips: false,
        timePeriod: true,
        canSelect: false,
        speciallist: [],
        steps: ['免费预约', '专家确认', '付款', '咨询'],
        timeList: [{
                id: "0",
                between_time: '9:00-10:00',
                select: false,
            },
            {
                id: "0",
                between_time: '10:00-11:00',
                select: false,
            },
            {
                id: "0",
                between_time: '11:00-12:00',
                select: false,
            },
            {
                id: "0",
                between_time: '13:00-14:00',
                select: false,
            },
            {
                id: "0",
                between_time: '14:00-15:00',
                select: false,
            },
            {
                id: "0",
                between_time: '15:00-16:00',
                select: false,
            },
            {
                id: "0",
                between_time: '16:00-17:00',
                select: false,
            }
        ]
    },
    clearData: function (param) {
        this.setData({
            checkTimeIdList: [],
            indexArr: []
        });
    },
    // 选择时间段
    bindCheck: function (e) {
        if (this.data.canSelect) {
            // 选中的index
            var index = e.currentTarget.dataset.index;
            // 选中的index是不是在序号数组中
            var n = this.data.indexArr.indexOf(index)
            this.data.timeList[index].select = !this.data.timeList[index].select
            n > -1 ? this.data.indexArr.splice(n, 1) : this.data.indexArr.push(index)
            this.setData({
                checkTimeIdList: [],
            });
            this.validateData(this.data.indexArr.sort(this.sortNumber))
            this.data.indexArr.forEach((v, i) => {
                this.data.checkTimeIdList.push(this.data.timeList[v].id)
            });
            this.setData({
                timeList: this.data.timeList,
                checkTimeIdList: this.data.checkTimeIdList,
                indexArr: this.data.indexArr
            });
        }
    },
    // sort排序需要用到
    sortNumber: function (a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    },
    // 验证索引是不是连续
    validateData: function (arr) {
        var length = arr.length
        if (length <= 1) {
            this.setData({
                timePeriod: true
            });
            return false
        }
        for (let i = 0; i < length; i++) {
            if (arr[i + 1] != undefined) {
                if (arr[i] + 1 == arr[i + 1]) {
                    this.setData({
                        timePeriod: true
                    });
                } else {
                    this.setData({
                        timePeriod: false
                    });
                    return
                }
            }
        }
    },
    changeCity: function (e) {
        // this.setData({
        //     city: e.detail.value
        // })
    },
    // 输入框输入改变长度
    changeTopic: function (e) {
        this.setData({
            topic: e.detail.value,
            length: e.detail.value.length
        })
    },
    // 点击日历中的某一天
    dayClick: function (e) {
        for (let i = 0; i < this.data.speciallist.length; i++) {
            // 日期是不是可点击选中的日期
            if (this.data.canSelect && this.data.speciallist[i].date == e.detail.date) {
                // 设置选中样式
                this.defaultClass()
                this.data.speciallist[i].background = '#6317A5'
                this.data.speciallist[i].color = '#fff'
                // 把选中的日期放进数组中保存  多选日期
                // var n = this.data.checkDateList.indexOf(this.data.speciallist[i].date)
                // n > -1 ? this.data.checkDateList.splice(n, 1) : this.data.checkDateList.push(this.data.speciallist[i].date)
                // this.setData({
                //     checkDateList: this.data.checkDateList
                // });
                // 把选中的日期保存  单选日期
                var time = this.data.speciallist[i].date.split("-").join("")

                this.setData({
                    speciallist: this.data.speciallist,
                    selectDate: time
                })
                this.clearData()
                // 获取时间段列表
                this.getTeacherBespokeTimeList(true)
            }
        }

    },
    defaultClass: function () {
        for (let i = 0; i < this.data.speciallist.length; i++) {
            this.data.speciallist[i].background = '#FBF6FF'
            this.data.speciallist[i].color = '#6317A5'
            this.setData({
                speciallist: this.data.speciallist
            });
        }
    },
    // 展示 线下邀约规则
    bindShowTips: function () {
        this.setData({
            showTips: true
        })
    },
    // 收起 线下邀约规则
    closeTips: function () {
        this.setData({
            showTips: false
        })
    },
    // 获取老师详情接口
    getTeacherDetail() {
        req.home.getTeacherDetail({
                teacher_id: this.data.teacherId
            })
            .then(res => {
                if (res.status == 0) {
                    this.setData({
                        teacherInfo: res.data.teacherInfo
                    })
                } else {
                    message(res.msg)
                }
            })
    },
    // 获取教师预约时间列表接口
    getTeacherBespokeTimeList(flag) {
        let that = this
        req.home.getTeacherBespokeTimeList({
                teacher_id: this.data.teacherId,
                date_time: this.data.selectDate
            })
            .then(res => {
                if (res.status == 0) {
                    if (flag) {
                        for (let i = 0; i < res.data.teacherBespokeTimeList.length; i++) {
                            res.data.teacherBespokeTimeList[i].select = false
                        }
                        this.setData({
                            timeList: res.data.teacherBespokeTimeList
                        })
                        this.clearData()
                    } else {
                        var arr = res.data.teacherBespokeTimeList
                        for (var i = 0; i < arr.length; i++) {
                            (function (i) {
                                var obj = {
                                    date: '',
                                    background: '#FBF6FF',
                                    text: '',
                                    color: '#6317A5'
                                }
                                obj.date = arr[i].date_time_a
                                that.data.speciallist.push(obj)
                            })(i);
                        }
                        this.setData({
                            speciallist: this.data.speciallist
                        })
                    }
                    if (res.data.teacherBespokeTimeList.length < 1) {
                        this.setData({
                            canSelect: false
                        })
                        message("该教师暂未设置预约时间，不可预约！")
                    } else {
                        this.setData({
                            canSelect: true
                        })
                    }


                } else {
                    message(res.msg)
                    this.setData({
                        canSelect: false
                    })

                }
            })
    },
    // 提交预约信息
    orderTeacher: function () {
        if (!this.data.canSelect) {
            message("该教师暂未设置预约时间，不可预约！")
            return false
        }
        if (this.data.selectDate == '') {
            message('请选择日期！')
            return false
        }
        if (!this.data.checkTimeIdList.length > 0) {
            message('请选择预约时间段！')
            return false
        }
        if (!this.data.timePeriod) {
            message('请选择连续的预约时间段！')
            return false
        }
        if (this.data.city == '') {
            message('请输入您想约谈的城市！')
            return false
        }
        if (this.data.topic == '') {
            message('请输入咨询的具体内容！')
            return false
        }
        req.home.addTeacherBespokeOffline({
                teacher_id: this.data.teacherId,
                bespoke_time_id: this.data.checkTimeIdList,
                city: this.data.city,
                remark: this.data.topic,
            })
            .then(res => {
                if (res.status == 0) {
                    wx.navigateTo({
                        url: `/pages/home/appointment/success/success`
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
        if (options.teacherId) {
            this.setData({
                teacherId: options.teacherId
            })
            this.getTeacherDetail()
            this.getTeacherBespokeTimeList()
            wx.setNavigationBarTitle({
                title: '预约'
            })
        }
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
});