// pages/publish/publish.js
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发布作品', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.nav_bar_height,
    imgAniData_1:{},
    imgAniData_2: {},
    system: app.globalData.system
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  go_upload: function(e){
    let self = this;
    let mode = e.currentTarget.dataset.mode;
    console.log(mode)
    self.startAni(mode)
    let timeout = setTimeout(()=>{
      clearTimeout(timeout)
      app.AuthNavigateToCheck('/pages/publish/publish?type=img&limitImg=' + mode)
    },500)
  },

  onReady(){
    const imgAni_1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    const imgAni_2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.imgAni_1 = imgAni_1
    this.imgAni_2 = imgAni_2
  },

  startAni(mode){
    // 旋转同时放大
    if(mode == '1'){
      this.imgAni_1.rotate(180).scale(1.3, 1.3).step()
      this.imgAni_1.rotate(0).scale(1).step()
      this.setData({
        imgAniData_1: this.imgAni_1.export()
      })
    }else{
      this.imgAni_2.rotate(180).scale(1.3, 1.3).step()
      this.imgAni_2.rotate(0).scale(1).step()
      this.setData({
        imgAniData_2: this.imgAni_2.export()
      })
    }
  }
})
