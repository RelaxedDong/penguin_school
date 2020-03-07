const app = getApp()
Page({
  data: {
    active_board:"activity",
    user_items:[],
    user_info:{},
    user_id:"",
    boards:[{name:"动态",type:"activity"},{name:"相册",type:"gallary"},{name:"二手",type:"second"}]
  },
  Todetail(e){
    let id = e.currentTarget.dataset.id;
    let type = this.data.active_board;
    let url ='/pages/detail/detail?detail_id='+id;
    if(type === 'second'){
      url = '/pages/second-detail/second-detail?detail_id='+id
    }
    if(type === 'gallary'){
      url = '/pages/preview/preview?imgid='+id
    }
    qq.navigateTo({
      url:url
    })
  },
  ItemFilter(active_key){
    app.qqshowloading('');
    let that = this;
    app.WxHttpRequestPOST('get_my_publish', {filter_key:active_key,user_id:this.data.user_id},function (res) {
      let data = res.data;
      if(data.code === 200){
        that.setData({
          user_items:data.data.results,
        })
      }else{
        app.ShowQQmodal(data.message, "");
      }
      qq.hideLoading();
    }, app.InterError);
  },
  navBack() {
    qq.navigateBack()
  },
  bindaddfrienResult(res){
    let detail = res.detail;
    if(detail.errMsg === 'addFriend:fail auth deny'){
      app.AddFriendAuth()
    }
  },
  boardClick(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      active_board:type
    })
    this.ItemFilter(type)
  },
  onLoad: function(options){
    this.setData({
      navH: app.globalData.nav_bar_height,
      user_id: options.i
    });
    let i = options.i;
    let that = this;
    app.WxHttpRequestGet('user_info', {user_id:i}, function (res) {
      let result = res.data;
      if(result.code === 200){
        that.setData({
          user_info:result.data
        })
      } else {
        app.ShowQQmodal(result.message,'');
      }
    })
    this.ItemFilter(this.data.active_board);
  },
  //分享
  onShareAppMessage: function () {
  },
})
