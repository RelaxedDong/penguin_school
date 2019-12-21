//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    conditionCode: {
      100: "./image/100.svg",
      101: "./image/101.svg",
      102: "./image/104.svg",
      103: "./image/103.svg",
      104: "./image/104.svg",
      200: "./image/200.svg",
      201: "./image/200.svg",
      202: "./image/200.svg",
      203: "./image/200.svg",
      204: "./image/200.svg",
      205: "./image/201.svg",
      206: "./image/201.svg",
      207: "./image/201.svg",
      208: "./image/201.svg",
      209: "./image/201.svg",
      210: "./image/201.svg",
      211: "./image/201.svg",
      212: "./image/201.svg",
      213: "./image/201.svg",
      300: "./image/300.svg",
      301: "./image/301.svg",
      302: "./image/302.svg",
      303: "./image/302.svg",
      304: "./image/304.svg",
      305: "./image/305.svg",
      306: "./image/306.svg",
      307: "./image/301.svg",
      308: "./image/308.svg",
      309: "./image/305.svg",
      310: "./image/310.svg",
      311: "./image/310.svg",
      312: "./image/308.svg",
      313: "./image/304.svg",
      400: "./image/400.svg",
      401: "./image/401.svg",
      402: "./image/402.svg",
      403: "./image/402.svg",
      404: "./image/304.svg",
      405: "./image/304.svg",
      406: "./image/306.svg",
      407: "./image/402.svg",
      500: "./image/500.svg",
      501: "./image/501.svg",
      502: "./image/502.svg",
      503: "./image/503.svg",
      504: "./image/503.svg",
      507: "./image/503.svg",
      508: "./image/503.svg",
      900: "./image/900.svg",
      901: "./image/900.svg",
      999: "./image/900.svg",
    },
    is_subscribe: false,
    days: [],
    suggestion: [],
    suggestionIcon: {
      air: "./image/life/air.svg",
      cw: "./image/life/cw.svg",
      sport: "./image/life/sport.svg",
      drsg: "./image/life/drsg.svg",
      flu: "./image/life/flu.svg",
      uv: "./image/life/uv.svg",
      trav: "./image/life/trav.svg",
      comf: "./image/life/comf.svg",
    },
    detail: {},
    detailIcon: {
      windy: "./image/detail/windy.svg",
      barometer: "./image/detail/barometer.svg",
      temperature: "./image/detail/temperature.svg",
      humidity: "./image/detail/humidity.svg",
    },
    show: true,
    prompt: "Loading ...", // 页面的初始数据
    lodingsrc: "./image/location/umbrella.svg",
    air: {
      aqi: 'AQI',
      co: '一氧化碳',
      no2: '二氧化氮',
      o3: '臭氧',
      pm10: 'PM10',
      pm25: 'PM2.5',
      qlty: '空气质量',
      so2: '二氧化硫',
    },
    hourly: []
  },
  UserSubscribe(status){
    app.qqshowloading('');
    app.WxHttpRequestPOST('user_subscribe',{is_subscribe:status},function (res) {
      let data = res.data;
      if(data.code === 200){
        app.ShowToast("订阅成功")
      }else {
        app.ShowQQmodal(data.message, "");
      }
      qq.hideLoading()
    })
  },
  SubScribe(e){
    let that = this;
    if(e.detail.value) {
      qq.getSetting({
        success(res) {
          if (!res.authSetting['scope.appMsgSubscribed']) {
            qq.showModal({
              title: '订阅确认',
              content: '订阅成功后开启天气推送～',
              success: function (tip) {
                if (tip.confirm) {
                  qq.openSetting({
                    success: function (data) {
                      let is_subscribe = true;
                      if (data.authSetting['scope.appMsgSubscribed']) {
                        that.UserSubscribe(1)
                      } else {
                        is_subscribe=false;
                        app.ShowToast("订阅失败，请重新点击")
                      }
                      that.setData({
                        is_subscribe:is_subscribe
                      })
                    }
                  })
                }else{app.ShowToast("订阅失败，请重新点击");
                  that.setData({
                    is_subscribe:false
                  })}
              },
            })
          }else{
            that.setData({
              is_subscribe:true
            })
            that.UserSubscribe(1)
          }
        }
      })
    } else {
      that.setData({
        is_subscribe:false
      })
      that.UserSubscribe(0)
    }
  },
  getHourly() { // 实况天气
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/hourly',
      data: {
        location: this.data.location,
        key: 'e4f463c603ec41628d4d497b5eccbe6a'
      },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        let { hourly } = res.data.HeWeather6[0]
        let hourlyArray = hourly.map(it => {
          return {
            time: it.time.slice(11),
            condCode: this.data.conditionCode[it.cond_code],
            tmp: it.tmp
          }
        })
        this.setData({
          hourly: hourlyArray
        })
      },
      fail: () => {
        this.add()
      }
    })
  },
  getNowWeather() { // 实况天气
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      data: {
        location: this.data.location,
        key: 'e4f463c603ec41628d4d497b5eccbe6a'
      },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        let { basic, now } = res.data.HeWeather6[0]
        this.setData({
          city: basic.parent_city,
          detail: now
        })
      },
      fail: () => {
        this.add()
      }
    })
  },
  getLifestyle() { // 生活指数
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/lifestyle',
      data: {
        location: this.data.location,
        key: 'e4f463c603ec41628d4d497b5eccbe6a'
      },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        let suggestion = res.data.HeWeather6[0].lifestyle
        this.setData({
          suggestion
        })
      },
      fail: () => {
        this.add()
      }
    })
  },
  getWeather: function () { // 3-10天天气预报
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast',
      data: {
        location: this.data.location,
        key: 'e4f463c603ec41628d4d497b5eccbe6a'
      },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        let arrayWeather = res.data.HeWeather6[0].daily_forecast.slice(1, 6)
        let weekDaysMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        let list = arrayWeather.map(it => ({
          time: weekDaysMap[new Date(it.date.split("-").join("/")).getDay()],
          icon: this.data.conditionCode[it.cond_code_d],
          detail: it.cond_txt_d,
          minTemperature: it.tmp_min,
          maxTemperature: it.tmp_max
        }))
        this.setData({
          days: list,
          show: false,
        })
      },
      fail: () => {
        this.add()
      }
    })
  },
  onLoad: function (options) { // 生命周期函数--监听页面加载
    let school = JSON.parse(options.school);
    let weather = school['weather'];
    let that = this;
    this.setData({
      location: school['city'],
      school: school,
      summary: weather['day_op'],
      localTemperature:weather['tem']
    });
    qq.getSetting({
      success(res) {
        let is_subscribe = false;
        if (res.authSetting['scope.appMsgSubscribed']) {
          is_subscribe = true;
        }
        that.setData({
          is_subscribe
        })
      }
    })
    this.getWeather();
    this.getNowWeather();
    this.getLifestyle();
    this.getHourly();
    qq.showShareMenu({ // 转发
      withShareTicket: true
    })
  },
  onShow: function () { // 生命周期函数--监听页面显示
  }
});
