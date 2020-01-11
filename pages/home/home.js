// photo.js
const  app = getApp()
Page({
  data: {
      swiperOptions: {
        autoplay: true,
        circular: true,
        interval: 5000,
        duration: 1000,
        previousMargin: 60,
        nextMargin: 0,
        displayMultipleItems: 3,
        currentSwiper: ''
      },
  },
  ChildClick(e){
    let url = e.detail;
    console.log(url)
    qq.navigateTo({
      url: url
    })
  },
  bindPickerChange(e){
    let item = this.data.schools[e.detail.value];
    this.setData({
      schoolId:item.id,
      choose_value:item.name,
    });
    app.globalData.school = item;
    app.ShowQQmodal('切换成功', item.name);
    this.GetSchoolHome(item.id)
  },
  HandleClick: function(e){
    let url = e.currentTarget.dataset.url;
    let school = JSON.stringify(app.globalData.school);
    if(url.indexOf('?') > -1){
      url = url + '&school='+school
    }else{
      url = url + '?school='+school
    }
    try {
      qq.navigateTo({
        url: url,
      })
    } catch (e) {
      app.ShowToast('研发中，敬请期待～')
    }
  },
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
  onShow: function() {
    // 1: 创建动画实例animation:
    this.slideupshow(this, 'slide_up1', 15, 1)
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })
    this.animation = animation
    //连续动画关键步骤
      //3: 将动画export导出，把动画数据传递组件animation的属性
      this.setData({
        animation: animation.export()
      })
  },
  GetSchoolHome(id){
    let params = {};
    if (id) {
      params['school_id'] = id
    }
    let that = this;
    app.WxHttpRequestGet('home_config', params, function (res) {
      console.log(res)
      let data = res.data;
      if(data.code === 200){
        that.setData({
          icons: data.data.icons,
          choose_value: data.data.choose_name,
          banners: data.data.banners,
          temp: data.data.weather,
          schools: data.data.schools,
        });
        app.globalData.school = data.data.active_school;
        app.globalData.school['weather'] = data.data.weather
      }else{
        app.InterError()
      }
      qq.hideLoading()
    },app.InterError)
  },
  onLoad: function () {
    //判断是用户是否绑定了
    app.qqshowloading('');
    let that = this;
    //判断onLaunch是否执行完毕
    if (app.globalData.checkLogin) {
      that.GetSchoolHome(app.globalData.school_id)
    } else {
      app.checkLoginReadyCallback = res => {
        that.GetSchoolHome(res)
      };
    }
  }
});

