Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#3cc51f",
        list: [{
                "pagePath": "pages/home/index/index",
                "text": "首页",
                "iconPath": "images/mini-home.png",
                "selectedIconPath": "images/mini-homeChecked.png"
            },
            {
                "pagePath": "pages/consult/index/index",
                "text": "在线咨询",
                "iconPath": "images/mini-home.png",
                "selectedIconPath": "images/mini-homeChecked.png"
            },
            {
                "pagePath": "pages/user/profile/profile",
                "text": "我的",
                "iconPath": "images/mini-my.png",
                "selectedIconPath": "images/mini-myChecked.png"
            }
        ]
    },
    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })
            this.setData({
                selected: data.index
            })
        }
    }
})