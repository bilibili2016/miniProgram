// miniprogram/pages/user/beTeacher/index/index.js
const req = require('../../../../req/index')
import {
    message,
    showLoading
} from '../../../../utils/common'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '',
        userInfo: {},
        sexArr: ['男', '女'],
        multiIndex: [0, 0, 0],
        customItem: '全部',
        sex: '',
        index: 0,
        multiArray: [
            ['无脊柱动物', '脊柱动物'],
            ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
            ['猪肉绦虫', '吸血虫']
        ],
    },
    bindPickerChange: function (e) {
        // console.log(e);
        let val = e.detail.value //0:男 1:女

        if (val == 0) {
            this.data.userInfo.sex = 1
        } else {
            this.data.userInfo.sex = 2

        }
        this.setData({
            index: e.detail.value,
            userInfo: this.data.userInfo
        })
    },
    bindDateChange: function (e) {
        // console.log(e);
        this.data.userInfo.birthday = e.detail.value
        this.setData({
            userInfo: this.data.userInfo
        })
    },
    bindMultiPickerChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
                        data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                        break;
                    case 1:
                        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                        data.multiArray[2] = ['鲫鱼', '带鱼'];
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                break;
            case 1:
                switch (data.multiIndex[0]) {
                    case 0:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                                break;
                            case 1:
                                data.multiArray[2] = ['蛔虫'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                                break;
                            case 3:
                                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                                break;
                            case 4:
                                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                                break;
                        }
                        break;
                    case 1:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['鲫鱼', '带鱼'];
                                break;
                            case 1:
                                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                                break;
                        }
                        break;
                }
                data.multiIndex[2] = 0;
                break;
        }
        // console.log(data.multiIndex);
        this.setData(data);
    },
    handleLink: function (e) {
        // console.log(e);
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },
    uploadImg: function (e) {
        wx.chooseImage({
            count: 1, //可选图片数量
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: res => {
                showLoading('上传中...')
                this.getURl(res.tempFilePaths[0])
            }
        })
    },
    getURl: function (src) {
        var that = this
        wx.uploadFile({
            url: 'https://api.1911edu.com/Publics/Upload/dropZoneUpload',
            filePath: src,
            name: 'file',
            formData: {
                'user': 'test'
            },
            success: function (res) {
                // console.log(res);
                var sss = JSON.parse(res.data)
                var path = sss.data.full_path;
                that.data.userInfo.head_img = path
                that.setData({
                    userInfo: that.data.userInfo
                })
                wx.hideLoading()
            },
            fail: function (param) {
                message(param)
                wx.hideLoading()
            }
        });

    },
    save: function (params) {
        req.profile.perInformationAjax(this.data.userInfo)
            .then(res => {
                if (res.status == 0) {
                    // console.log(res);
                    message(res.msg)
                    setTimeout(() => {
                        wx.navigateTo({
                            url: '/pages/user/profile/profile'
                        })
                    }, 600);

                } else {
                    message(res.msg)
                }
            })

    },
    regionList: function (params) {
        req.profile.regionList()
            .then(res => {
                if (res.status == 0) {
                    // console.log(res);

                } else {
                    message(res.msg)
                }
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '个人主页设置'
        })
        let info = wx.getStorageSync('userInfo')
        if (info) {
            this.data.userInfo.head_img = info.head_img
            this.data.userInfo.student_number = info.student_number
            this.data.userInfo.nick_name = info.nick_name
            this.data.userInfo.user_name = info.user_name
            this.data.userInfo.real_name = info.real_name
            this.data.userInfo.sex = info.sex
            this.data.userInfo.birthday = info.birthday
            this.data.userInfo.position = info.position
            this.data.userInfo.position_name = info.position_name
            this.data.userInfo.email = info.email
            this.data.userInfo.company_name = info.company_name

            this.setData({
                userInfo: this.data.userInfo,
                sex: info.sex == 1 ? '男' : '女',
                index: info.sex == 1 ? 0 : 1,
            })
        }
        this.regionList()
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