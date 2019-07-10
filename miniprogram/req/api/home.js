function install(req, request) {
    req.home = {
        // 轮播图
        getBannerList(data) {
            return request({
                url: `${req.apiUrl}/index.php/Miniprogram/Index/bannerList`,
                method: 'GET',
                data,
            }, false);
        },
        // 教师列表
        getTeacherList(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Teacher/teacherList`,
                method: 'GET',
                data,
            }, false);
        },
        // 教师详情
        getTeacherDetail(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Teacher/teacherDetail`,
                method: 'GET',
                data,
            }, false);
        },
        // 获取教师可预约时间列表
        getTeacherBespokeTimeList(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Teacher/getTeacherBespokeTimeList`,
                method: 'GET',
                data,
            }, false);
        },
        // 提交预约信息（线下预约）
        addTeacherBespokeOffline(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Teacher/addTeacherBespokeOffline`,
                method: 'POST',
                data,
            }, false);
        },
        // 话题列表
        questionList(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/User/questionList`,
                method: 'GET',
                data,
            }, false);
        },
        // unionid换取token
        register(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Login/registerThirdParty`,
                method: 'GET',
                data,
            }, false);
        },
        // 发送短信验证码
        appSendSms(data) {
            return request({
                url: `${req.apiUrl}/Publics/PhoneSms/appSendSms`,
                method: 'POST',
                data,
            }, false);
        },
        // 获取购买价格及次数
        consultGoodsList(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Teacher/consultGoodsList`,
                method: 'GET',
                data,
            }, false);
        },
        // 添加收藏
        addCollection(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Collection/addCollection`,
                method: 'POST',
                data,
            }, false);
        },
        // 删除收藏
        deleteCollection(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Collection/deleteCollection`,
                method: 'POST',
                data,
            }, false);
        },
        // 活动报名
        questionnaireAdd(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Questionnaire/questionnaireAdd`,
                method: 'POST',
                data,
            }, false);
        },
        // 下单 购买
        buyChatNumber(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Order/buyChatNumber`,
                method: 'POST',
                data,
            }, false);
        },
        // 搜索词列表
        searchRecordList(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/SearchRecord/searchRecordList`,
                method: 'POST',
                data,
            }, false);
        },
        // 清空搜索词
        clearUserSearchRecord(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/SearchRecord/clearUserSearchRecord`,
                method: 'POST',
                data,
            }, false);
        },
        // 活动页问题列表
        getProblems(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Index/activity`,
                method: 'GET',
                data,
            }, false);
        },

    };
}

module.exports = {
    install,
};