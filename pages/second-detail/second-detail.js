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
  onShow: function(){
    var animation = wx.createAnimation({
      duration: 1050,
      timingFunction: 'ease',
    })
    var next = true;
    //连续动画关键步骤
    setInterval(function () {
      //2: 调用动画实例方法来描述动画
      if (next) {
        animation.rotate(3).step()
        next = !next;
      } else {
        animation.rotate(-3).step()
        next = !next;
      }
      //3: 将动画export导出，把动画数据传递组件animation的属性
      this.setData({
        animation: animation.export()
      })
    }.bind(this), 1050)
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

