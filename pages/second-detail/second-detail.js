// index/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  bindaddfrienResult(res){
    let detail = res.detail;
    if(detail.errMsg === 'addFriend:fail auth deny'){
      app.AddFriendAuth()
    }
  },
  previewImage: function (e) {
    app.preView(e);
  },
  ShareClick(){
    app.ShowMenue()
  },
  onShareAppMessage(res){
    app.ShowMenue()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const detail_id = options.detail_id;
    console.log(detail_id)
    app.WxHttpRequestGet('get_second_detail',{second_id:detail_id},function (res) {
      let data =res.data;
      if(data.code === 200){
        that.setData({
          second:data.data
        })
      }else{
        app.ShowQQmodal(data.message, "");
      }
    },app.InterError)
  },
})

