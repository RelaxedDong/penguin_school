const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0, imgHeight: 0,
  },
  PublishClick(){
    qq.navigateTo({
      url: '/pages/photo-publish/publish'
    })
  },
  FavorClick(e){
    let is_auth = app.AUthCheck();
    if (!is_auth){
      return
    }
    let that = this;
    let dataset = e.currentTarget.dataset;
    const gallary_id = dataset.id;
    const count = dataset.count;
    const index = dataset.index;
    app.WxHttpRequestPOST('gallary_favor',{gallary_id:gallary_id},function (res) {
      const data =res.data;
      if(data.code == 200){
        let key = 'photoes['+index+'].favor_count';
        let status = 'photoes['+index+'].status';
        that.setData({
            [key]:data.data === 'normal'?count+1:count-1,
            [status]:data.data === 'normal'?'favor':false
          })
      }else{
        app.ShowQQmodal(data.message, "");
      }
    },app.InterError)
  },
  HandleImgClick (e) {
    let Id = e.currentTarget.dataset.id;
    qq.navigateTo({
      url: '/pages/preview/preview?imgid='+Id
    })
  },
  onShareAppMessage(res){
    app.ShowMenue()
  },
  onShow: function(){
    if(app.globalData.new_publish){
      app.globalData.new_publish = false;
      this.onLoad()
    }
  },
  onLoad: function () {
    var that = this;
    app.qqshowloading('加载中，请稍后');
    app.WxHttpRequestGet('get_all_photoes',{},function (res) {
      let data = res.data;
      if(data.code === 200){
        that.setData({
          photoes:data.data,
        })
        qq.hideLoading()
      }else{
        app.InterError()
      }
    },app.InterError)
  }
})
