// pages/preview/preview.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    height: app.globalData.nav_bar_height,
    system: app.globalData.system,
    is_hide: !1,
    animationData: {},
    topAniData: {},
    imgAniData: {},
    comAniData: {},
    actionSheetHidden: true,
  },
  back_page: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function(options){
    let Id = options.imgid;
    let that = this;
    app.WxHttpRequestGet('gallary_detail',{gallaryId:Id},function (res) {
        let data = res.data;
        if(data.code === 200){
          that.setData({
            gallary:data.data
          })
        }else{
          app.ShowQQmodal(data.message, "");
        }
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
    app.WxHttpRequestPOST('gallary_favor',{gallary_id:gallary_id},function (res) {
      const data =res.data;
      if(data.code == 200){
        let key = 'gallary.favor_count';
        let status = 'gallary.status';
        that.setData({
          [key]:data.data === 'normal'?count+1:count-1,
          [status]:data.data === 'normal'?'favor':false
        })
      }else{
        app.ShowQQmodal(data.message, "");
      }
    },app.InterError)
  },
  onReady(){
    const animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    const topAni = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    const imgAni = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    const comAni = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    this.topAni = topAni
    this.animation = animation
    this.imgAni = imgAni
    this.comAni = comAni
  },
  HandleImgClick: function(e){
    app.preView(e);
  },
  show_all: function(){
    let self = this, d = self.data;
    if (!d.info_show){
      this.animation.backgroundColor('#000')
      this.animation.opacity(1)
      this.animation.translateY(-150).step()
      this.imgAni.translateY(-200)
      this.imgAni.scale(1.5, 1.5).step()
      this.topAni.rotate(180).step()

      this.setData({
        animationData: this.animation.export(),
        topAniData: this.topAni.export(),
        imgAniData: this.imgAni.export(),
        info_show: !d.info_show
      })
    }else{
      this.animation.translateY(0).step()
      this.imgAni.translateY(0)
      this.imgAni.scale(1, 1).step()
      this.animation.opacity(0.8).step()
      this.topAni.rotate(0).step()

      this.setData({
        animationData: this.animation.export(),
        topAniData: this.topAni.export(),
        imgAniData: this.imgAni.export(),
        info_show: !d.info_show
      })
    }
  },
  save: function (e) {
    var that = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {//这里是用户同意授权后的回调
              app.ShowQQmodal('即将开放～', "");
            },
            fail() {//这里是用户拒绝授权后的回调
              wx.showModal({
                title: '警告',
                content: '您拒绝了授权，无法下载图片，点击确定重新授权',
                success: function (res) {
                  if (res.confirm){
                    wx.openSetting({
                      success(res){
                        if (res.authSetting["scope.writePhotosAlbum"]) {
                          app.ShowQQmodal('即将开放～', "");
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        } else {//用户已经授权过了
          app.ShowQQmodal('即将开放～', "");
        }
      }
    })
  },
  action_sheet(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
})
