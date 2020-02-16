// pages/signIn/score.js
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    xueqi: [
      { name: '第一学期', value: '第一学期', checked: true },
      { name: '第二学期', value: '第二学期' }
    ],
    student_no:"",
    password:"",
    catptcha:"",
    xueqi_choose:"第一学期",
    xuenian_choose:"",
    cookie:"",
    array:[],
    captcha_stream:""
  },
  xueqiChange (e) {
    let value = e.detail.value;
    this.setData({
      xueqi_choose:value,
      xueqi: [
        { name: '第一学期', value: '第一学期', checked: value === '第二学期' },
        { name: '第二学期', value: '第二学期', checked: value==='第二学期'}
      ],
    })
  },
  resetCaptcha() {
    app.qqshowloading('');
    this.ChangeCaptcha();
    qq.hideLoading()
  },
  ChangeCaptcha () {
    let self = this;
    app.WxHttpRequestGet('user_student',{},function (res) {
      let result = res.data;
      if(result.code === 200){
        self.setData({
          captcha_stream:result.data.captcha_stream,
          cookie:result.data.cookie,
        });
      } else {
        self.setData({
          student_no:'未认证'
        });
        app.ShowQQmodal(result.message,'');
      }
    })
  },
  onLoad: function () {

  },
  onShow: function (options) {
    if(!app.globalData.user_id){
      app.ShowQQmodal('请先完成校园认证！', '');
      this.setData({
        student_no:'未认证'
      });
      return
    }else{
    app.qqshowloading('');
    let self = this;
      app.WxHttpRequestGet('user_student',{},function (res) {
        let result = res.data;
        if(result.code === 200){
          self.setData({
            student_no:result.data.xue_hao,
            array:result.data.xue_nian,
            captcha_stream:result.data.captcha_stream,
            cookie:result.data.cookie,
          });
        } else {
          self.setData({
            student_no:'未认证'
          });
          app.ShowQQmodal(result.message,'');
        }
        qq.hideLoading()
      })
    }
  },
  InputValue (e) {
    this.setData({
      password:e.detail.value
    })
  },
  InputCatptcha (e) {
    this.setData({
      captcha:e.detail.value
  })
  },
  ScoreSearch () {
    if(!app.globalData.user_id){
      app.ShowQQmodal('请先完成校园认证', '');
      return
    }
    if(!this.data.password){
      app.ShowToast('请输入密码');
      return
    }
    if(!this.data.captcha){
      app.ShowToast('请输入验证码');
      return
    }
    if(!this.data.xueqi_choose){
      app.ShowToast('请选择学期');
      return
    }
    if(!this.data.xuenian_choose){
      app.ShowToast('请选择学年');
      return
    }
    let params = {
      'stu_no': this.data.student_no,
      'stu_password': this.data.password,
      'captcha': this.data.captcha,
      'xq': this.data.xueqi_choose,
      'year': this.data.xuenian_choose,
      'cookievalue': this.data.cookie,
    };
    let self = this;
    app.qqshowloading('查询中...');
    app.WxHttpRequestPOST('score_search', params, function (res) {
      var result = res.data;
      if(result.code === 200) {
        let data = {
          score_stream:'data:image/png;base64,' + result.data.score_stream,
          contents:result.data.contents
        }
        qq.navigateTo({
          url: "/score_package/pages/scoreDetail/score?data="+encodeURIComponent(JSON.stringify(data))
        })
      }else{
        app.ShowQQmodal(result.message, "");
      }
      self.ChangeCaptcha();
      qq.hideLoading()
    }, app.InterError);
  },
  bindPickerChange(e) {
    this.setData({
      xuenian_choose:this.data.array[e.detail.value],
      index: e.detail.value
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
