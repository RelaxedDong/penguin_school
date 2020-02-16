// index/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    detail_load: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  Toindex(e){
    qq.switchTab({
      url:'/pages/home/home'
    })
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
  onShareAppMessage(res){
    let second = this.data.second
    return {
      title: second.title,
      imageUrl:"", // 图片 URL
      path:"pages/second-detail/second-detail?second_id="+second.id, // 图片 URL
      query:'second_id='+second.id,
      success: function () {
        app.ShowToast('恭喜，转发成功！')
      },
      fail() {
        app.ShowToast('网络错误，转发失败！')
      }
    }
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
    let detail_id = options.detail_id;
    if(!detail_id){
      var obj = qq.getLaunchOptionsSync();
      detail_id = obj.query.second_id;
      this.setData({
        detail_load:true
      })
    }
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

