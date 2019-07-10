// 接口
const req = require('../../../req/index')
// socket 连接插件
const io = require('../../../utils/weapp.socket.io')
import {
    message,
    chatTime,
    getTime
} from '../../../utils/common'
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        padding: app.globalData.padding,
        isChat: false,
        showTool: false,
        userId: '',
        headImg: '',
        socketUrl: 'wss://api.1911edu.com:2120',
        page: 1,
        limit: 5,
        showPdb: false,
        windowHeight: 0,
        inputValue: '',
        toolLoading: true,
        focusInput: false,
        chatList: [],
        isScroll: true,
        isTeacher: false,
        receiveId: '' //接收者用户ID
    },
    bindload: function (e) {
        if (this.data.isScroll) {
            this.pageScrollToBottom()
        }
    },
    bindShowTool: function () {
        if (this.data.isTeacher) {
            this.setData({
                showTool: !this.data.showTool
            })
            this.pageScrollToBottom(this.data.showTool)
        } else {
            if (this.data.number > 0) {
                this.setData({
                    showTool: !this.data.showTool
                })
                this.pageScrollToBottom(this.data.showTool)
            } else {
                message('您的咨询服务已终止,请进行购买咨询服务！')
            }
        }

    },
    notClick: function (param) {
        if (!this.data.isTeacher && this.data.number < 1) {
            message('您的咨询服务已终止,请进行购买咨询服务！')
        }
    },
    bindReplaceInput: function () {
        this.setData({
            showTool: false
        })
    },
    bindFocusInput: function () {
        if (this.data.isTeacher) {
            this.setData({
                focusInput: true
            })
        } else {
            if (!this.data.isTeacher && this.data.number > 0) {
                this.setData({
                    focusInput: true
                })
            } else {
                message('您的咨询服务已终止,请进行购买咨询服务！')
            }
        }

    },
    bindblur: function () {
        this.setData({
            // showTool: false,
            focusInput: false
        })
    },
    bindkeyboardheightchange: function () {
        console.log('bindkeyboardheightchange');
    },
    /**
     * 启动socket
     */
    socketStart: function () {
        // 设置socket连接地址 socketUrl
        this.socket = (this.socket = io(
            this.data.socketUrl,
        ))
        this.socket.on('connect', () => {
            //用户进行登录
            this.socket.emit('login', wx.getStorageSync('loginData').token, 'ordinaryUser');
            //为用户进行分组
            this.socket.emit('userGroup', 'ordinaryUser');
            this.socket.emit('updateChatRecordReadState', this.data.receiveId, 'ordinaryUser');
        })
        //就收后台websocket推送的消息
        this.socket.on('new_msg', msg => {
            if (wx.getStorageSync('userInfo').user_status == '1' && msg.content == '<-您的咨询服务已终止,请进行购买咨询服务->') {
                let userInfo = wx.getStorageSync('userInfo')
                userInfo.consult_time = '0'
                wx.setStorage({
                    key: "userInfo",
                    data: userInfo
                })
                this.setData({
                    isChat: false
                })
                message('聊天次数用尽，请先去购买吧！')
                return false
            }
            if (this.data.receiveId == msg.send_user_id) {
                this.dataBinding(msg.send_user_id, msg.contentType, msg.headImg, msg.content, chatTime(msg.send_time))
                this.pageScrollToBottom()
            }
        })
    },
    bindconfirm: function (e) {
        this.dataBinding(this.data.userId, 1, this.data.headImg, e.detail.value)
        if (!this.data.isTeacher) {
            this.data.number--
        }
        this.pageScrollToBottom()
        var content = e.detail.value
        this.socket.emit('consultation', this.data.receiveId, content, 1, 'ordinaryUser');
        this.setData({
            inputValue: ''
        })
    },
    pageScrollToBottom: function (e = false) {
        if (e) {
            this.setData({
                showPdb: true
            })
        } else {
            this.setData({
                showPdb: false
            })
        }
        wx.createSelectorQuery().select('#chatInfo').boundingClientRect(rect => {
            if (rect) {
                // 使页面滚动到底部
                wx.pageScrollTo({
                    scrollTop: rect.height
                })
            }
        }).exec()
    },
    chooseImage: function (e) {
        wx.chooseImage({
            count: 1, //可选图片数量
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: res => {
                this.uploadImages(res.tempFilePaths[0])
            }
        })
    },
    camera: function () {
        wx.chooseImage({
            count: 1, //可选图片数量
            sourceType: ['camera'],
            success: res => {
                this.uploadImages(res.tempFilePaths[0])
            }
        })
    },
    uploadImages: function (src) {
        var that = this
        wx.showToast({
            title: '正在发送...',
            icon: 'loading',
            mask: true,
            duration: 2000
        })
        this.setData({
            isScroll: true
        })
        //向服务器端上传图片
        // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址
        wx.uploadFile({
            url: 'https://api.1911edu.com/Publics/Upload/dropZoneUpload',
            filePath: src,
            name: 'file',
            formData: {
                'user': 'test'
            },
            success: function (res) {
                var sss = JSON.parse(res.data)
                var dizhi = sss.data.full_path;
                that.socket.emit('consultation', that.data.receiveId, dizhi, 2, 'ordinaryUser');
                that.setData({
                    showTool: false
                })
                if (!that.data.isTeacher) {
                    that.data.number--
                }
                that.dataBinding(that.data.userId, 2, that.data.headImg, dizhi)
                that.pageScrollToBottom()
            }
        });

    },
    /**
     * 聊天列表中增加数据
     *  contentType 消息类型 ：1文字 2图片
     *  headImg 头像
     *  content 消息内容
     */
    dataBinding: function (id, contentType = 1, headImg, content, time) {
        var obj = new Object;
        var newArr = [];
        time = time ? time : getTime();
        obj.send_user_id = id;
        obj.content_type = contentType;
        obj.headImg = headImg;
        obj.content = content;
        obj.send_time = time;
        newArr.push(obj)
        this.setData({
            chatList: this.data.chatList.concat(newArr)
        })
    },
    lookBigIMG: function (e) {
        let arr = []
        arr.push(e.currentTarget.dataset.src)
        //图片预览
        wx.previewImage({
            current: e.currentTarget.dataset.src, // 当前显示图片的http链接
            urls: arr // 需要预览的图片http链接列表
        })
    },
    consultationList: function (e) {
        req.consult.consultationList({
                page: this.data.page,
                limit: this.data.limit,
                user_type: 'ordinaryUser',
                receive_user_id: this.data.receiveId
            })
            .then(res => {
                wx.stopPullDownRefresh()
                if (res.status == 0) {
                    for (let i = 0; i < res.data.consultationList.length; i++) {
                        res.data.consultationList[i].create_time = chatTime(res.data.consultationList[i].create_time)
                        res.data.consultationList[i].send_time = chatTime(res.data.consultationList[i].send_time)
                    }
                    this.setData({
                        chatList: res.data.consultationList.concat(this.data.chatList)
                    })
                    if (e) {
                        this.pageScrollToBottom()
                    }
                } else {
                    message(res.msg)
                }
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight,
            receiveId: options.receiveId,
            headImg: wx.getStorageSync('userInfo').head_img,
            userId: wx.getStorageSync('userInfo').id,
            isTeacher: wx.getStorageSync('userInfo').user_status == '2' ? true : false,
        })
        if (wx.getStorageSync('userInfo').user_status == '1') {
            this.setData({
                isChat: Number(wx.getStorageSync('userInfo').consult_time) > 0 ? true : false,
                number: wx.getStorageSync('userInfo').consult_time
            })
        } else {
            this.setData({
                isChat: true
            })
        }
        this.socketStart();
        this.consultationList(true)
        wx.setNavigationBarTitle({
            title: '专家咨询'
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.setData({
            toolLoading: false
        })
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
        this.socket.close()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page: this.data.page + 1,
            isScroll: false
        })
        this.consultationList(false)
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