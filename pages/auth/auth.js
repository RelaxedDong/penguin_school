const app = getApp()
Page({
  data: {
    animation: {},
    departments: [],
    name: '',
    studentId:"",
    department: ""
  },
  nameInput:function(e)
  {
    this.setData({
      name: e.detail.value
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
  submitBtn () {
    // if(!this.data.name || !this.data.studentId ||!this.data.department){
    //   app.ShowToast('请输入完整信息');
    //   return
    // }
    // if(!this.NameCheck(this.data.name)){
    //   app.ShowToast('姓名错误');
    //   return
    // }
    // if(!this.IdCardCheck(this.data.studentId)){
    //   app.ShowToast('学号错误');
    //   return
    // }
    // console.log({name:this.data.name,studentId:this.data.studentId,department:this.data.department})
    qq.redirectTo({
      url:"/pages/activity/activity"
    })
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
    var myreg = /^1[3456789]\d{8}$/;
    if (IdCard.length === 0) {
      return false;
    } else if (IdCard.length !== 10) {
      return false;
    } else return myreg.test(IdCard);
  },
  onLoad: function () {
    let that = this;
    app.WxHttpRequestGet('get_departments', {}, function (res) {
      that.setData({
        departments:res.data.data
      })
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
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })
    this.animation = animation
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
})
