const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activekey: 'activity',
        last_active_key: 'activity',
        grid_list: [
            {name: '学生认证',url:"/imgs/source/icon/renzheng.png",route:'auth/auth',key:"auth"},
            {name: '我的发布',url:"/imgs/source/icon/edit.png",route:'mycollect/mycollect',key:"publish"},
            {name: '我的收藏', url:"/imgs/source/icon/collct.png",route:'mycollect/mycollect',key:"collect"},
            {name: '意见反馈', url:"/imgs/source/icon/setting.png",route:'',key:"sugesstion"},
        ]
    },
    itemClick(e){
        if(!app.globalData.user_id){
            app.ShowQQmodal('请先登陆～', '');
            return
        }
        let url = e.currentTarget.dataset.url;
        let key = e.currentTarget.dataset.key;
        if(key === 'sugesstion'){
            app.ShowQQmodal('研发小哥哥努力研发中，敬请期待～', '');
            return
        }
        qq.navigateTo({
            url:"/pages/"+url +'?key='+key
        })
    },
    login: function (e) {
        if(e.detail.formId){
            this.setData({
                formId:e.detail.formId
            });
            return
        }
        var that = this;
        var userinfo =  e.detail.userInfo;
        if (!userinfo) {
            app.ShowToast('信息获取失败，请重新点击');
            return
        }
        userinfo['formId'] = that.data.formId;
        app.globalData.userInfo = userinfo;
        app.WxHttpRequestPOST('user_info', userinfo, function (res) {
            var data = res.data;
            app.globalData.user_id = data.data.user_id;
            if(data.code == 200) {
                app.globalData.is_auth = true;
                that.setData({
                    is_auth: true
                })
                app.ShowToast('登陆成功')
            }else{
                app.ShowQQmodal('网络错误','绑定注册用户失败，请检查网络后再试~');
            }
        }, app.InterError);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
            this.setData({
                admin_openid: app.globalData.admin_openid,
                temp: app.globalData.temp,
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
