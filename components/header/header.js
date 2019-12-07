const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  attached: function(){
    if(app.globalData.statusBarHeight&&app.globalData.screenHeight){
      console.log('计算一次')
      this.setData({
        bar_Height: app.globalData.statusBarHeight,
        widnowH : app.globalData.screenHeight
      })
    }else{
      let getSystemInfoSync = wx.getSystemInfoSync();
      this.setData({
        bar_Height: getSystemInfoSync.statusBarHeight,
        widnowH : getSystemInfoSync.screenHeight
      })
      app.globalData.statusBarHeight =  getSystemInfoSync.statusBarHeight
      app.globalData.screenHeight =  getSystemInfoSync.screenHeight
    }
  },
  properties: {
    "activekey":{
      type:String,
      value: 'activity'
    },
    "showModalStatus":{
      type:Boolean,
      value:false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeTabs(e){
      var activekey = e.currentTarget.dataset.activekey;
      qq.switchTab({
        url: '/pages/'+activekey+'/'+activekey
      })
    }
    },
});
