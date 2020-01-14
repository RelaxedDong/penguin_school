//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    second_goods: [],
    goods:null,
    num:5, //默认首页初始化五条商品信息
    isList:"new",
    order_key: 'create_time',
    classId:{
      'phone': 1,
      'book':2,
      'computer':3,
    },
  },
  onShareAppMessage(res){
    app.ShowMenue()
  },
  SecondDetail(e){
    let second_id = e.currentTarget.dataset.id;
    qq.navigateTo({
      url:"/pages/second-detail/second-detail?detail_id="+second_id
    })
  },
  SelectClickOrder(e){
    this.setData({
      order_key:e.currentTarget.dataset.key
    });
    this.pageFilter()
  },
  PublishClick(){
    app.AuthNavigateToCheck('/pages/second-publish/second-publish')
  },
  pageFilter(category_id=""){
    var that = this;
    let data = {'order_key':this.data.order_key};
    if(category_id){
      data['category_id'] = category_id
    }else{
      delete data['category_id']
    }
    data['school_id'] = app.globalData.school['id'];
    app.qqshowloading('商品加载中，请稍后');
    app.WxHttpRequestGet('get_second_list',data,function (res) {
      let data = res.data;
      if(data.code === 200){
        that.setData({
          second_goods:data.data,
        })
        qq.hideLoading()
      }else{
        app.InterError()
      }
    },app.InterError)
  },
  SelectClick(e){
    app.globalData.category_id = e.currentTarget.dataset.id;
    this.pageFilter(app.globalData.category_id)
  },
  onShow: function(){
    let category_id = app.globalData.category_id;
    if(category_id){
      app.globalData.category_id = false;
      this.pageFilter(category_id)
      return
    }
    if(app.globalData.new_goods){
        this.pageFilter();
        app.globalData.new_goods = false;
    }
  },
  onLoad:function(){
    this.setData({
      imgUrls: app.globalData.second_banner,
    })
    this.pageFilter()
  },
  onReachBottom:function(){
  },
})


