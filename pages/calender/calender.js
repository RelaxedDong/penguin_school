// photo.js
const  app = getApp()
Page({
  data: {
    law_date :[
      {name:"元旦",time:'1月1日放假',manage:'无调休',rex:'共1天'},
      {name:"春节",time:'1月24日(除夕)~1月30日',manage:'1月19日(周日)、2月1日(周六)上班',rex:'共7天'},
      {name:"清明节",time:'4月4日~4月6日',manage:'无调休',rex:'共3天'},
      {name:"劳动节",time:'5月1日~5月5日',manage:'4月26日(周日)、5月9日(周六)上班',rex:'共5天'},
      {name:"端午节",time:'6月25日~6月27日',manage:'6月28日(周日)上班',rex:'共3天'},
      {name:"中秋节",time:'10月1日~10月8日',manage:'9月27日(周日)、10月10日(周六)上班',rex:'8天'},
      {name:"国庆节",time:'10月1日~10月8日',manage:'9月27日(周日)、10月10日(周六)上班',rex:'共8天'},
    ]
  },
  HandleImgClick (e) {
    app.preView(e);
  },
  onLoad: function () {
    let self = this;
    app.WxHttpRequestGet('get_school_calender',{school_id:app.globalData.school['id']},function (res) {
      self.setData({
        calenders:res.data.data
      })
    })
  }
});
