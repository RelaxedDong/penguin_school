//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    scrollTop: "0",
    searchInput:""
  },
  toDetailsTap: function (e) {
    //跳转商品详情页
    qq.navigateTo({
      url: "/Subpackges/pages/storeDetail/detail?id="+e.currentTarget.dataset.id
    })
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "../storeDetail/detail?id=" + e.currentTarget.dataset.id
      })
    }
  },
  navBack() {
    qq.navigateBack()
  },
  onLoad: function () {
    var that = this;
    //获取banner
    this.setData({
      navH: app.globalData.nav_bar_height
    })
    app.WxHttpRequestGet('products', {}, function (res) {
        that.setData({
            products:res.data.data
        })
    })
  },
  onShow: function () {
    var that = this;
    that.setData({
      credits: wx.getStorageSync("empirical")
    })
  },
  listenerSearchInput: function (e) {
    this.setData({
      searchInput: e.detail.value
    })

  },
  toSearch: function () {
    let that = this;
    app.WxHttpRequestGet('products', {title:this.data.searchInput}, function (res) {
      that.setData({
        products:res.data.data
      })
    })
  }
})
