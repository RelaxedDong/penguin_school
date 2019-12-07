// photo.js
const  app = getApp()
Page({
  data: {
  },
  SelectClick(e){
    app.globalData.category_id = e.currentTarget.dataset.id;
    qq.navigateBack();
  },
  onLoad: function () {
    let that = this;
    app.WxHttpRequestGet('get_categories',{},function (res) {
      let data = res.data;
      if(data.code === 200){
        that.setData({
          categories:data.data
        })
        qq.hideLoading()
      }else{
        app.InterError()
      }
    },app.InterError)
  }
});
