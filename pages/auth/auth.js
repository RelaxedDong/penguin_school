const app = getApp()
Page({
  data: {
    animation: {},
    departments: [],
    name: '',
    is_auth: false,
    studentId:"",
    qq:"",
    department: ""
  },
  nameInput:function(e)
  {
    this.setData({
      name: e.detail.value
    })
  },
  qqInput:function(e)
  {
    this.setData({
      qq: e.detail.value
    })
  },
  studentIdInput:function(e)
  {
    this.setData({
      studentId: e.detail.value
    })
  },
  //滑动渐入渐出
  slideupshow:function(that,param,px,opacity){
    var animation = wx.createAnimation({
      duration: 1800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
  QQCheck (qq) {
    return(/^[1-9]\d{4,9}$/.test(String(qq))) ? true : false;
  },
  submitBtn (e) {
    let taht  = this;
    if(!app.globalData.user_id){
      app.ShowToast('请先完成授权绑定');
      return
    }
    if(this.data.is_auth){
      if(!this.data.name || !this.data.qq || !this.data.studentId) {
        app.ShowToast('请输入完整信息');
        return
      }
      if(!this.NameCheck(this.data.name)){
        app.ShowToast('姓名错误');
        return
      }
      if(!this.QQCheck(this.data.qq)){
        app.ShowToast('QQ号码错误');
        return
      }
      if(!this.IdCardCheck(this.data.studentId)){
        app.ShowToast('学号错误');
        return
      }
      app.WxHttpRequestPOST('update_qq_name', {qq:this.data.qq,username:this.data.name,
      student_id:this.data.studentId}, function (res) {
        if(res.data.code === 200) {
          app.ShowQQmodal('恭喜','更新完成～');
          setTimeout(function () {
            qq.navigateBack({
              delta: 1
            })
          }, 1500)
        }else{
          app.InterError()
        }
      }, app.InterError);
    } else {
      if(!this.data.name || !this.data.studentId ||!this.data.department||!this.data.qq){
        app.ShowToast('请输入完整信息');
        return
      }
      if(!this.QQCheck(this.data.qq)){
        app.ShowToast('QQ号码错误');
        return
      }
      if(!this.IdCardCheck(this.data.studentId)){
        app.ShowToast('学号错误');
        return
      }
      let params = {
        username:this.data.name,
        school_id:this.data.school['id'],
        department:this.data.department,
        student_id:this.data.studentId,
        qq:this.data.qq,
        formId: e.detail.formId
      }
      app.WxHttpRequestPOST('school_auth', params, function (res) {
        if(res.data.code === 200) {
          app.globalData.school_id = taht.data.school['id'];
          app.ShowQQmodal('恭喜','信息绑定完成');
          setTimeout(function () {
            qq.navigateBack({
              delta: 1
            })
          }, 1500)

        }else{
          app.InterError()
        }
      }, app.InterError);
    }
  },
  login: function (e) {
    var that = this;
    var userinfo =  e.detail.userInfo;
    if (!userinfo) {
      app.ShowQQmodal('绑定失败，请重新点击','');
      return
    }
    userinfo['formId'] = e.detail.formId;
    app.globalData.userInfo = userinfo;
    app.WxHttpRequestPOST('user_info', userinfo, function (res) {
      var data = res.data;
      if(data.code === 200) {
        app.globalData.user_id = data.data.user_id;
        that.setData({
          ['school.logo']:app.globalData.userInfo['avatarUrl'],
          user_id:true
      })
      }else{
        app.InterError()
      }
    }, app.InterError);
  },
  /**
   * @return {boolean}
   */
  NameCheck:function(name){
    var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
    return nameReg.test(name);
  },
  /**
   * @return {boolean}
   */
  IdCardCheck: function (IdCard) {
    var myreg = new RegExp(this.data.auth_re);
    if (IdCard.length === 0) {
      return false;
    } else return myreg.test(IdCard);
  },
  onLoad: function () {
    let that = this;
    let school =  app.globalData.school;
    let params = {school_id:app.globalData.school_id?app.globalData.school_id:school['id']};
    let user_id = app.globalData.user_id;
    if(user_id){
      params['user_id'] = user_id
    }
    app.WxHttpRequestGet('get_departments', params, function (res) {
      let data = res.data;
      if(data.code === 200){
        let raw_info = data.data.user_info;
        if(raw_info){
          school['username'] = raw_info.username;
          school['school_id'] = raw_info.student_id;
          school['qq'] = raw_info.qq;
          school['name'] = data.data.name;
          school['logo'] = data.data.logo;
          that.setData({
            user_id:user_id,
            auth_re:data.data.auth_re,
            studentId:raw_info.student_id,
            name:raw_info.username,
            qq:raw_info.qq,
            department:raw_info.department,
            is_auth:data.data.is_auth,
            school:school,
          })
        }else{
          school['username'] = "姓名";
          school['school_id'] = "学号";
          that.setData({
            user_id:user_id,
            departments:data.data.department,
            auth_re:data.data.auth_re,
            is_auth:data.data.is_auth,
            school:school
          })
        }
      }else {
        app.InterError()
      }
    },app.InterError)
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      department:this.data.departments[e.detail.value],
    })
  },
  onShow: function () {
    // 1: 创建动画实例animation:
    this.slideupshow(this, 'slide_up1', 50, 1)
  },
})
