const app = getApp()
Page({
  data: {
    buyNumber: 1,
    buyNumMin: 0,
    buyNumMax: 999,
  },
  navBack() {
    qq.navigateBack()
  },
  tobuy() {
    app.ShowToast('研发中，敬请期待～')
  },
  onLoad: function(options){
    let id = options.id;
    let that = this;
    this.setData({
      navH: app.globalData.nav_bar_height
    });
    app.WxHttpRequestGet('products/detail', {product_id:id}, function (res) {
      let data =res.data;
      if(data.code === 200){
        that.setData({
          product:data.data
        })
      }
    })
  },
  //分享
  onShareAppMessage: function () {
    app.ShowMenue()
  },
})
