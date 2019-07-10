function install(req, request) {
    req.consult = {
        // 标签列表
        consultationList(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Consultation/consultationList`,
                method: 'GET',
                data,
            }, false);
        },
        // 标签列表
        getConsultationList(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/Consultation/getConsultationList`,
                method: 'GET',
                data,
            }, false);
        },
        // 选择标签
        setTags(data) {
            return request({
                url: `${req.apiUrl}/Miniprogram/User/setTags`,
                method: 'POST',
                data,
            }, false);
        }
    };
}

module.exports = {
    install,
};