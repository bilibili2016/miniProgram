// components/common/buyPop/buyPop.js
const req = require('../../../req/index')
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
        buyData: {
            consult_time: "000",
            content: "咨询次数000次",
            create_time: "1561601190",
            id: "1",
            original_price: "0.00",
            picture: "https://image.1911edu.com/1537853887",
            present_price: "0.00",
            sort: "0",
            status: "1",
            title: "咨询次数-000次",
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 获取购买价格及次数
        consultGoodsList: function (param) {
            req.home.consultGoodsList()
                .then(res => {
                    if (res.status == 0) {
                        this.setData({
                            buyData: res.data.consultGoodsList[0]
                        })
                    }
                })
        },
        // 点击开通购买
        goBuy: function () {
            req.home.buyChatNumber({
                    id: this.data.buyData.id,
                    openid: wx.getStorageSync('loginData').openId
                })
                .then(res => {
                    if (res.status == 0) {
                        this.triggerEvent('paySuccess', res.data)
                    }
                })
        },
        close: function () {
            // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
            this.triggerEvent('close')
        }
    },
    /**
     * 在组件布局完成后执行
     */
    ready: function (param) {
        this.consultGoodsList()
    }
})