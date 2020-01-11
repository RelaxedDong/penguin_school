const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activekey: 'activity',
        admin_openid: app.globalData.admin_openid,
        last_active_key: 'activity',
        grid_list: [
            {name: '学生认证',url:"/imgs/source/icon/renzheng.png",route:'auth/auth',key:"auth"},
            {name: '我发表的',url:"/imgs/source/icon/edit.png",route:'mycollect/mycollect',key:"publish"},
            {name: '我喜欢的', url:"/imgs/source/icon/love.png",route:'mycollect/mycollect',key:"collect"},
            {name: '意见反馈', url:"/imgs/source/icon/setting.png",route:'',key:"sugesstion"},
        ]
    },
    onShow: function () {
        // 1: 创建动画实例animation:
        var animation = wx.createAnimation({
            duration: 2000,
            timingFunction: 'ease',
        })
        var next = true;
        //连续动画关键步骤
        setInterval(function () {
            //2: 调用动画实例方法来描述动画
            if (next) {
                animation.rotate(15).step()
                next = !next;
            } else {
                animation.rotate(-15).step()
                next = !next;
            }
            //3: 将动画export导出，把动画数据传递组件animation的属性
            this.setData({
                animation: animation.export()
            })
        }.bind(this), 2000)
    },
    itemClick(e){
        let url = e.currentTarget.dataset.url;
        let key = e.currentTarget.dataset.key;
        if(url !== 'auth/auth') {
            if(!app.globalData.user_id){
                app.ShowQQmodal('请先完成校园认证', '');
                return
            }

            if(key === 'sugesstion'){
                app.ShowQQmodal('我们的发展，离不开你的建议～', '');
                return
            }
        }
        qq.navigateTo({
            url:"/pages/"+url +'?key='+key
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */

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
