// pages/mycollect/mycollect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active_key: 'collect',
    filter_key: 'activity'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  HandleDelete(e){
    let that = this;
    let dataset = e.currentTarget.dataset;
    qq.showModal({
      title: '确认提示',
      content: '确认删除此发布？',
      success(res) {
        if (res.confirm) {
          app.WxHttpRequestPOST('delete_publish', {id:dataset.id,operation_type:dataset.type}, function (response) {
            let data = response.data;
            if(data.code === 200){
              var user_items = that.data.user_items;
              user_items.splice(dataset.index,1);
              that.setData({
                user_items:user_items
              })
            }else{
              app.InterError()
            }
          })
        }
        }
      })
    },
  BoardClick(e){
    let key = e.currentTarget.dataset.key;
    this.setData({
      active_key:key
    })
    this.ItemFilter(key,this.data.filter_key)
  },
  Todetail(e){
    let id = e.currentTarget.dataset.id;
    let type = this.data.filter_key;
    let url ='/pages/detail/detail?detail_id='+id;
    if(type === 'second'){
      url = '/pages/second/second'
    }
    if(type === 'gallary'){
        url = '/pages/preview/preview?imgid='+id
    }
    qq.navigateTo({
      url:url
    })

  },
  FilterClick(e){
    let key = e.currentTarget.dataset.key;
    this.setData({
      filter_key:key
    });
    this.ItemFilter(this.data.active_key,key)
  },
  ItemFilter(active_key,filter_key){
    let that = this;
    let url = 'get_my_favors';
    if(active_key === 'publish'){
      url = 'get_my_publish'
    }
    app.WxHttpRequestPOST(url, {filter_key:filter_key,active_key:active_key},function (res) {
      let data = res.data;
      if(data.code === 200){
        that.setData({
          user_items:data.data.results,
          type:data.data.type,
        })
      }else{
        app.ShowQQmodal(data.message, "");
      }
    }, app.InterError);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active_key:options.key
    })
    this.ItemFilter(options.key,this.data.filter_key)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  HandleOperationDone(res){
    var data = res.data;
    if(data.code == 200){
      app.ShowToast('取消收藏成功');
      this.onLoad()
    }else{
      app.ShowToast('网络错误，请稍后再试～');
    }
  },
  CollectClick(e){
    var that = this;
    qq.showModal({
      title: '确认提示',
      content: '取消收藏吗？',
      success: function(res) {
        if (res.confirm) {
            var houseid = e.currentTarget.dataset.houseId;
            var request_data = {houseId:parseInt(houseid),operation_type:'collect'};
            app.WxHttpRequestPOST('account/operation',request_data,that.HandleOperationDone,app.InterError)
        }
      }
    })
  },
  HandleClick(res){
    var houseid = res.currentTarget.dataset.houseId;
    qq.navigateTo({
      url: "/pages/detail/detail?house="+houseid
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
