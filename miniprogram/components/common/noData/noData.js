// components/common/noData/noData.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        noData: Object,
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleLink(e) {
            if (e.currentTarget.dataset.url == '/pages/home/index/index') {
                wx.redirectTo({
                    url: e.currentTarget.dataset.url
                })
            } else {
                wx.navigateTo({
                    url: e.currentTarget.dataset.url
                })
            }

        }

    }
})