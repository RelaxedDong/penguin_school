const app = getApp()
Component({
  /* 组件的属性列表 */
  properties: {
    title: {			// 设置标题
      type: String,
      value: '企鹅校园'
    },
    is_home: {
      type: Boolean,
      value: false
    },
    show_bol: {			// 控制返回箭头是否显示
      type: Boolean,
      value: false
    },
    my_class: {			// 控制样式
      type: Boolean,
      value: false
    }
  },
  attached:function(){
    if(app.globalData.statusBarHeight){
      this.setData({
        bar_Height: app.globalData.statusBarHeight	// 获取手机状态栏高度
      })
    }else{
      let statusBarHeight = wx.getSystemInfoSync().statusBarHeight
      this.setData({
        bar_Height:statusBarHeight 	// 获取手机状态栏高度
      })
      app.globalData.statusBarHeight = statusBarHeight
    }
  },
  /* 组件的初始数据 */
  data: {
    bar_Height: wx.getSystemInfoSync().statusBarHeight		// 获取手机状态栏高度
  },
  /* 组件的方法列表 */
  methods: {
    toMyHome: function () {					// 返回事件
      qq.navigateTo({
        url:'/pages/my/my'
      })
    },
    SchoolChoose: function () {
      qq.navigateTo({
        url:'/pages/school/school'
      })
    }
  }
})
