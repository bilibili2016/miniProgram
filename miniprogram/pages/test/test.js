// pages/test/test.js
// socket 连接插件
const io = require('../../utils/weapp.socket.io')
// socket 连接地址
var socketUrl = 'wss://ceshiapi.1911edu.com:2120'
// 上下文对象
var that
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        socket: '',
        socketData: [],
        images: []
    },
    /**
     * 启动socket
     */
    socketStart: function () {
        // 设置socket连接地址 socketUrl
        this.socket = (this.socket = io(
            socketUrl,
        ))

        this.socket.on('connect', () => {
            //用户进行登录
            this.socket.emit('login', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMjA2NyJ9.OJNsFwGPnSUlvNZ94xIIWwwKMBNSXyTWaUzk8ROF_y8kfnm', 'ordinaryUser');
            //为用户进行分组
            this.socket.emit('userGroup', 'ordinaryUser');
        })
        //就收后台websocket推送的消息
        this.socket.on('new_msg', msg => {
            var obj = new Object;
            var newArr = [];
            obj.name = '他说->';
            obj.word = msg.content;
            obj.contentType = msg.contentType;
            newArr.push(obj)
            this.setData({
                socketData: this.data.socketData.concat(newArr)
            })
        })
    },

    bindFormSubmit: function (e) {
        //console.log(this.data.socketData);
        var textarea = e.detail.value.textarea
        var obj = new Object;
        var newArr = [];
        obj.name = '我说->';
        obj.word = textarea;
        obj.contentType = '1';
        newArr.push(obj)
        this.setData({
            socketData: this.data.socketData.concat(newArr)
        })
        this.socket.emit('consultation', 2051, textarea, 1, 'ordinaryUser');
    },
    chooseImage: function () {
        var that = this;
        wx.chooseImage({
            count: 1, //可选图片数量
            success: function (res) {
                //缓存下 
                wx.showToast({
                    title: '正在发送...',
                    icon: 'loading',
                    mask: true,
                    duration: 2000,
                    success: function (ress) {
                        //console.log('成功加载动画'); 
                    }
                })
                //获取第一张图片地址 
                var filep = res.tempFilePaths[0]
                //console.log(filep); 
                var obj = new Object;
                var newArr = [];
                obj.name = '我说->';
                obj.word = filep;
                obj.contentType = '2';
                newArr.push(obj)
                that.setData({
                    socketData: that.data.socketData.concat(newArr)
                })


                //向服务器端上传图片 
                // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址 
                wx.uploadFile({
                    url: 'https://api.1911edu.com/Publics/Upload/dropZoneUpload',
                    filePath: filep,
                    name: 'file',
                    formData: {
                        'user': 'test'
                    },
                    success: function (res) {
                        //console.log(res.data) 
                        var sss = JSON.parse(res.data)
                        var dizhi = sss.data.full_path;

                        that.socket.emit('consultation', 2051, dizhi, 2, 'ordinaryUser');

                        //do something  
                    },
                    fail: function (err) {
                        //console.log(err) 
                    }
                });
            }
        })
    },
    bindGetUserInfo: function () {
        app.authorize();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.socketStart();
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