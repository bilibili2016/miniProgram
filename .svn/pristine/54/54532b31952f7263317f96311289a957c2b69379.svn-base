// miniprogram/pages/user/setUser/common/common.js
import {
    message
} from '../../../../utils/common'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        whichPage: "",
        holderText: "",
        submitVal: "",
        inputCon: '',
        pageName: ''
    },
    changeIndexInE: function () {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];

        let page = this.data.whichPage
        if (page == 'nickname') {
            prevPage.setData({
                "userInfo.nick_name": this.data.submitVal
            })
        } else if (page == 'name') {
            prevPage.setData({
                "userInfo.real_name": this.data.submitVal
            })
        } else if (page == 'email') {
            prevPage.setData({
                "userInfo.email": this.data.submitVal
            })
        } else if (page == 'company') {
            prevPage.setData({
                "userInfo.company_name": this.data.submitVal
            })
        }
        wx.navigateBack({
            delta: 1
        })

    },
    inputBindblur: function (e) {
        let val = e.detail.value
        this.setData({
            submitVal: val
        })
    },
    bindinput: function (e) {
        let val = e.detail.value
        this.setData({
            submitVal: val
        })
    },
    // 键盘点击完成
    bindconfirm: function (e) {
        let val = e.detail.value
        this.setData({
            submitVal: val
        })
    },
    save: function (params) {
        if (this.data.pageName == 'nickname') {
            if (!/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(this.data.submitVal)) {
                message("请输入至少2位最多18位，可包含汉字，英文字母，数字，下划线")
                return false
            }
        }
        if (this.data.pageName == 'name') {
            if (!/^[\u4e00-\u9fa5]+$/.test(this.data.submitVal) || this.data.submitVal.length > 20) {
                message("请输入小于20位汉字")
                return false
            }
        }

        this.changeIndexInE()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            pageName: options.page
        })
        let page = options.page
        let text, title
        if (page == 'nickname') {
            text = '请输入昵称'
            title = '昵称'
        } else if (page == 'name') {
            text = '请输入真实姓名'
            title = '真实姓名'
        } else if (page == 'email') {
            text = '请输入邮箱'
            title = '邮箱'
        } else if (page == 'company') {
            text = '请输入单位名称'
            title = '单位名称'
        }

        this.setData({
            whichPage: options.page,
            holderText: text,
            inputCon: options.con
        })
        wx.setNavigationBarTitle({
            title: title
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