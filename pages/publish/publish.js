//publish.js
//获取应用实例
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
Page({
  data: {
    form: {
      title: "",
      desc: "",
    },
    activekey: 'pic',
    last_active_key: 'pic',
    inputVal: 'pic',
    can_add_friend: 0,
    imglist: [],
    active_address:false,
    min:5,//最少字数
    max: 2000, //最多字数 (根据自己需求改变)
    anonymous: false,
    onload_with_tag: false,
    is_img_upload: false,
      timer: null,
      input:false,
    limit_pic: 9
  },
  inputs: function (e) {
    var type = e.currentTarget.dataset.type;
    var value = e.detail.value;
    if( type == 'title'){
      this.setData({
        ['form.title']: e.detail.value
      })
    }else{
      // 获取输入框的内容
      // 获取输入框内容的长度
      var len = parseInt(value.length);
      //最多字数限制
      if (len > this.data.max) return;
      // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
      this.setData({
        currentWordNumber: len, //当前字数
        ['form.desc']: value
      })
    }
    },
    ImgAddClick(e) {
        const that = this;
        qq.chooseImage({
            count:that.data.limit_pic, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album',"camera"], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                let imglist = that.data.imglist;
                for (var i = 0; i < tempFilePaths.length; i++) {
                    if (imglist.length >= that.data.limit_pic) {
                        break
                    } else {
                        imglist.push(tempFilePaths[i])
                    }
                }
                that.setData({
                    imglist: imglist,
                })
            }
        })
    },
    TabChoose(e) {
        var activekey = e.currentTarget.dataset.activekey;
        if (activekey != this.data.last_active_key) {
            this.setData({
                last_active_key: activekey,
                activekey: activekey
            });
        }else{
            this.setData({
                last_active_key: "",
                activekey: ""
            });
        }
    },
    DeleteBtnClick(e) {
        var arr = this.data.imglist;
        arr.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            imglist: arr,
            temporary_imgs: false
        })
    },
    TagClick(e) {
        var key = e.target.dataset.key;
        var tags = this.data.tags;
        tags[key].is_active = (!tags[key].is_active);
        let is_active_length = 0
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].is_active) is_active_length++
        }
        if (is_active_length > 2) {
            tags[key].is_active = (!tags[key].is_active);
            app.ShowQQmodal('最多添加两个板块，请重新选择！', "");
            return
        }
        this.setData({
            tags: tags
        });
    },
    previewImage(e) {
        var current = e.target.dataset.src;
        qq.previewImage({
            current: current, // 当前显示图片的http链接
            urls: this.data.imglist // 需要预览的图片http链接列表
        })
    },
    initValidate() {
        const rules = {
            title: {
                required: true,
                maxlength: 30,
                minlength: 3
            },
            desc: {
                required: true,
                maxlength: 2000,
                minlength: 5
            },
        }
        const messages = {
            title: {
                required: '标题必须要填写',
                maxlength: '标题最多30个字符',
                minlength: '标题至少3个字符'
            },
            desc: {
                required: '请简要描述内容',
                maxlength: '描述过长，请重新输入',
                minlength: '描述太短啦'
            },
        };
        this.WxValidate = new WxValidate(rules, messages)
    },
    submitBtn: function (e) {
        var that = this;
        var params = this.data.form;
        params['formId'] = e.detail.formId;
        if (!this.WxValidate.checkForm(params)) {
            const error = this.WxValidate.errorList[0];
            app.ShowQQmodal(error.msg, "");
            return false
        }
        var img_list = this.data.imglist;
        if(this.data.is_img_upload){
            if(img_list.length <=0){
                app.ShowQQmodal('请选择图片', "");
                return
            }
            params['photo'] = '1'
        }else{
            delete params['photo']
        }
        let active_address = this.data.active_address;
        if (active_address) {
            params['address'] = active_address
        } else {
            delete params['address']
        }
        params['tags'] = [];
        params['tg'] = "";
        var tags = this.data.tags;
        for (var index in tags) {
            if (tags[index].is_active) {
                params['tags'].push(tags[index])
            }
        }
        if(this.data.anonymous){
            params['anonymous'] = '1'
        }else{
            delete params['anonymous']
        }
        var temprory = that.data.temporary_imgs;
        params['school_id'] = that.data.school['id'];
        if(!params['school_id']){
            app.ShowQQmodal('发布错误', "请重新选择学校");
            return false
        }
        params['can_add_friend'] = that.data.can_add_friend;
        app.qqshowloading('发布中，请稍后');
        if (temprory) {
            params['imgs'] = temprory;
            app.WxHttpRequestPOST('activity_add', params, that.PublishDone, app.InterError)
        } else {
            if(img_list.length > 0){
                app.uploadFile('static/'+that.data.school['code']+'/activity/',this.data.oss,img_list, function (urls) {
                    that.setData({
                        temporary_imgs: urls
                    });
                    params['imgs'] = urls;
                    app.WxHttpRequestPOST('activity_add', params, that.PublishDone, app.InterError)
                })
            }else{
                app.WxHttpRequestPOST('activity_add', params, that.PublishDone, app.InterError)
            }
        }
    },
    AuthFriend(){
        let that = this;
        qq.getSetting({
            success(res) {
                if (!res.authSetting['setting.addFriend']) {
                    qq.showModal({
                        title: '授权确认',
                        content: '授权后开启好友添加功能',
                        success: function (tip) {
                            if (tip.confirm) {
                                qq.openSetting({
                                    success: function (data) {
                                        let can_add_friend = 1;
                                        if (res.authSetting['setting.addFriend']) {
                                            app.ShowToast("授权成功")
                                        } else {
                                            can_add_friend=0
                                            app.ShowToast("授权失败，请重新点击")
                                        }
                                        that.setData({
                                            can_add_friend:can_add_friend
                                        })
                                    }
                                })
                            }else{app.ShowToast("授权失败，请重新点击");
                                that.setData({
                                    can_add_friend:0
                                })}
                        },
                    })
                }else{
                    that.setData({
                        can_add_friend:1
                    })
                }
            }
        })
    },
    CanSeeMe (e) {
      if(e.detail.value){
          this.AuthFriend();
      }else{
          this.setData({
              can_add_friend:0
          })
      }
    },
    GetAddress () {
      let params = {
          active_address:this.data.active_address,
          input:this.data.input
      }
      qq.navigateTo({
          url: '/pages/publish/address?data='+encodeURIComponent(JSON.stringify(params))
      })
    },
    anonymousClick () {
      this.setData({
          anonymous:!this.data.anonymous
      })
    },
    PublishDone(res) {
        qq.hideLoading()
        var data = res.data;
        if (data.code === 200) {
            app.globalData.new_publish = true;
            app.ShowQQmodal('恭喜！发布成功!', '');
            let delta = 1;
            if(this.data.type === 'img'){
                delta = 2
            }
            setTimeout(function () {
                    qq.navigateBack({
                        delta:delta
                    });
                }, 1500)
        } else {
            app.ShowToast(data.message)
        }
        qq.hideLoading();
    },
    onLoad: function (options) {
      app.qqshowloading('')
      var type = options.type;
        var that = this;
        app.WxHttpRequestGet('get_upload_sign', {}, function (res) {
            let data = res.data;
            if (data.code === 200) {
                if(type === 'img'){
                    let limitCount = options.limitImg;
                    that.setData({
                        limit_pic:parseInt(limitCount),
                        type:type,
                        is_img_upload:true,
                        oss: data.data.oss,
                        school:app.globalData.school,
                        access_token: data.data.access_token,
                        title: '校园风景'
                    })
                }else{
                    let tags = data.data.tags;
                    let setData = {
                        oss: data.data.oss,
                        type: type,
                        school:app.globalData.school,
                        access_token: data.data.access_token,
                        title: "校园动态",
                    }
                    let option_tag = options.tag_id;
                    if ( option_tag ){
                        for(var i=0;i<tags.length;i++){
                            if(options.tag_id == tags[i].id){
                                tags[i].is_active = true;
                                tags = [tags[i]];
                                setData['onload_with_tag'] = true;
                                console.log('我跳出了')
                                break
                            }
                        }
                    }
                    setData['tags'] = tags;
                    that.setData(setData)
                }
            } else {
                app.ShowQQmodal("网络错误，请稍后再试～", "");
            }
            qq.hideLoading()
        });
        this.initValidate();
    },
})

