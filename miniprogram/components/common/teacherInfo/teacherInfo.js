// components/common/teacherInfo/teacherInfo.js
const req = require('../../../req/index')
import {
    message,
    showLoading
} from '../../../utils/common'
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        teacherId: '',
        detail: '',
        isShowBTn: false,
        showDown: true,
        isAuto: false,
    },
    ready: function () {
        showLoading("加载中...")
        this.getTeacherInfoByUser()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 展开全部
        handleDown() {
            this.setData({
                showDown: false,
                isAuto: true
            })
        },
        // 收起全部
        handlePull() {
            this.setData({
                showDown: true,
                isAuto: false
            })
        },
        getTeacherInfoByUser: function () {
            req.profile.getTeacherInfoByUser()
                .then(res => {
                    if (res.status == 0) {
                        this.getTeacherDetail(res.data.teacherInfo.id)
                    } else {
                        message(res.msg)
                    }
                })
        },
        getTeacherDetail: function (id) {
            req.home.getTeacherDetail({
                    teacher_id: id
                })
                .then(res => {
                    if (res.status == 0) {
                        this.setData({
                            detail: res.data.teacherInfo
                        })
                        wx.createSelectorQuery().select('#aboutInnerWord').boundingClientRect(rect => {
                            if (rect) {
                                if (rect.height > 150) {
                                    this.setData({
                                        isShowBTn: true,
                                    })
                                }
                            } else {
                                this.setData({
                                    showDown: false,
                                    isShowBTn: true,
                                    isAuto: true
                                })
                            }

                        }).exec()
                        wx.hideLoading()
                    } else {
                        wx.hideLoading()
                        res.msg ? message(res.msg) : ''
                    }
                })
        },
    }
})