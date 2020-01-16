// pages/signIn/signIn.js
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //img_url: config.imgUrl, //图片地址
    //签到模块
    signNum: 0,  //签到数
    point: 0,  //签到数
    min:0,
    max:7,
    be: 0    //默认倍数
  },
  GoPointCenter () {
    qq.navigateTo({
      url: '/products_package/pages/products/products'
    })
  },
  //签到
  bindSignIn(e) {
    var that = this;
    app.WxHttpRequestPOST('user_sign', {},function (res) {
      let data = res.data;
      if(data.code === 200){
        let num = data.data.sum_count;
        let sign_time = data.data.sign_time;
        let be = Math.floor(num / 7);
        let point = that.data.point;
        that.setData({
          signNum: num,
          point: point+3,
          sign_time: sign_time,
        })
          that.setData({
            min: 7 * be + 1,
            max: 7 * be + 7
          })
        app.ShowQQmodal('签到成功', "+3 积分");
      }else{
        app.ShowQQmodal(data.message, "");
      }
    }, app.InterError)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let check = app.AUthCheck();
    let that = this;
    if(check){
      app.qqshowloading()
      let user_id = app.globalData.user_id;
      app.WxHttpRequestGet('user_sign', {user_id:user_id}, function (res) {
        let data = res.data;
        if(data.code === 200){
          let num = data.data.sum_count;
          let sign_time = data.data.sign_time;
          let point = data.data.point;
          let be = Math.floor(num / 7);
          that.setData({
            signNum: num,
            point: point,
            sign_time: sign_time,
          });
          that.setData({
            min: 7 * be + 1,
            max: 7 * be + 7
          })
        }else{
          app.ShowQQmodal(data.message, "");
        }
        qq.hideLoading()
      }, app.InterError)
    }
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
