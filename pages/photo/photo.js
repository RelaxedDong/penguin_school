const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0, imgHeight: 0,
    Arr1:[],Arr2:[]
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
    const colum = dataset.colum;
    app.WxHttpRequestPOST('gallary_favor',{gallary_id:gallary_id},function (res) {
      const data =res.data;
      if(data.code == 200){
        let key = 'Arr1['+index+'].favor_count';
        let status = 'Arr1['+index+'].status';
        if(colum === 'arr2'){
          key = 'Arr2['+index+'].favor_count';
          status = 'Arr2['+index+'].status';
        }
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
    app.WxHttpRequestGet('get_all_photoes',{school_id:app.globalData.school['id']},function (res) {
      let data = res.data;
      if(data.code === 200){
          let Arr1 = [];
          let Arr2 = [];
          for (let i = 0; i < data.data.length; i++) {//在这里获取后台的数组
            if (data.data[i].id % 2 == 1) {//这里进行获取的 奇数偶数来进行数据分开
              Arr1.push(data.data[i]);//数组添加数据
            } else {
              Arr2.push(data.data[i]);//数组添加数据
            }
          }
        that.setData({
            Arr1,//这里在进行数据赋值
            Arr2//这里在进行数据赋值
          });
        // that.setData({
        //   photoes:data.data,
        // })
        qq.hideLoading()
      }else{
        app.InterError()
      }
    },app.InterError)
  },
  onPullDownRefresh: function() {
    this.onLoad()
  },
})
