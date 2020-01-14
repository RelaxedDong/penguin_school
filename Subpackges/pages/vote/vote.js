const app = getApp()
Page({
  data: {
    votes:[],
    votedColor: ['#9dc8c8', '#58c9b9', '#519d9e', '#d1b6e1'],
  },
  navBack() {
    qq.navigateBack()
  },
  tobuy() {
  },
  onLoad: function(options){
    let self = this;
    app.WxHttpRequestGet('vote_list', {}, function (res) {
      let data = res.data;
      if (data.code === 200) {
        self.setData({
          votes:data.data
        })
      }
    })
  },
  //分享
  onShareAppMessage: function () {
    app.ShowMenue()
  },
})
