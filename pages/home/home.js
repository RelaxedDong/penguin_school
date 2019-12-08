// photo.js
const  app = getApp()
Page({
  data: {
      choose_value: '南阳理工学院',
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
  bindPickerChange(e){
    let item = this.data.schools[e.detail.value];
    this.setData({
      schoolId:item.id,
      choose_value:item.name,
    });
    app.globalData.school = item;
    this.GetSchoolHome(item.city)
  },
  HandleClick: function(e){
    let url = e.currentTarget.dataset.url;
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
  GetSchoolHome(city){
    let params = {};
    if (city) {
      params['city'] = city
    }
    let that = this;
    app.WxHttpRequestGet('home_config', params, function (res) {
      let data = res.data;
      if(data.code === 200){
        that.setData({
          icons: data.data.icons,
          banners: data.data.banners,
          temp: data.data.weather,
          schools: data.data.schools,
        });
        if(!app.globalData.school){
          app.globalData.school = data.data.schools[0];
        }
      }else{
        app.InterError()
      }
    })
  },
  onLoad: function () {
    this.GetSchoolHome()
  }
});

