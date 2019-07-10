module.exports = {
    /**
     * 提示消息
     * text 内容
     * type 'success'
     * time 默认4000ms
     */
    message: function (text, time = 4000, type = 'none') {
        wx.showToast({
            title: text,
            icon: type,
            duration: time
        })
    },
    /**
     * 获取元素的高度
     * 元素id
     */
    height: function (selector) {
        let n = 0;
        let m = wx.createSelectorQuery().select(`#${selector}`).boundingClientRect(rect => {
            console.log(n, rect.height, '1');

            n = rect.height
            console.log(n, rect.height, '2');
        }).exec()
        console.log(m);

        // return n, m
    },
    /**
     * 时间戳转换成日期（格式一）2018-08-03 13:36:48
     * @param {Number} timestamp 时间戳
     */
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() * 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() * 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() * 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = date.getSeconds() * 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
    },
    chatTime(timestamp) {
        var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var newDate = new Date(new Date().setHours(0, 0, 0, 0)) * 1 //今天0点的时间戳
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() * 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() * 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() * 1 < 10 ? '0' + date.getMinutes() : date.getMinutes())
        let s = ':' + date.getSeconds() * 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
        if (date < newDate) {
            return Y + M + D + h + m
        } else {
            return h + m
        }
    },
    //获取时间、日期YY-MM-DD hh:mm:ss
    getTime(times, type) {
        var date = new Date()
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() * 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() * 1 < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() * 1 < 10 ? '0' + date.getMinutes() : date.getMinutes())
        let s = ':' + date.getSeconds() * 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return `${h}${m}`
        //     switch(type) {
        //  case 1:
        //     return `${Y}${M}${D}${h}${m}`
        //  case 2:
        //     return `${Y}${M}${D}`
        //  case 3:
        //     return `${h}${m}${s}`
        //  case 4:
        //     return `${h}${m}`
        //  default:
        //     `${Y}${M}${D}${h}${m}${s}`
        // }
    },
    showLoading(title, mask = true) {
        wx.showLoading({
            title: title,
            mask: true
        })
    }

}