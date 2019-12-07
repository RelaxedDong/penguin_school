// pages/add/add.js
var app = getApp();
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      title: "",
      desc: "",
      price:"",
      old_price:"",
      choose_value:"",
    },
    index:0,
    inputVal:"",
    limit_pic:5,
    classId:null,
    categories: [],
    show_old_price:false,
    imglist: [],
    min:5,//最少字数
    max: 500, //最多字数 (根据自己需求改变)
  },
  bindPickerChange: function (e) {
    let item = this.data.categories[e.detail.value]
    this.setData({
      classId:item.id,
      choose_value:item.name,
      ['form.choose_value']:item.name
    })
  },
  DeleteBtnClick(e) {
    var arr = this.data.imglist;
    arr.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imglist: arr,
      temporary_imgs: false
    })
  },
  ImgAddClick(e) {
    const that = this;
    qq.chooseImage({
      count:that.data.limit_pic, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
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
  previewImage(e) {
    var current = e.target.dataset.src;
    qq.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgs // 需要预览的图片http链接列表
    })
  },
  initValidate() {
    const rules = {
      title: {
        required: true,
        maxlength: 40,
        minlength: 5
      },
      desc: {
        required: true,
        maxlength: 500,
        minlength: 5
      },
      price: {
        required: true,
        number: true,
      },
      old_price: {
        number: true,
      },
      choose_value: {
        required: true,
      },
    };
    const messages = {
      title: {
        required: '标题必须要填写',
        maxlength: '标题过长，请重新输入',
        minlength: '标题过短，请重新输入'
      },
      desc: {
        required: '请简要描述内容',
        maxlength: '描述过长，请重新输入',
        minlength: '描述太短啦'
      },
      price: {
        required: '请输入价格',
        number: '价格格式错误',
      },
      old_price: {
        number: '原价格式错误',
      },
      choose_value: {
        required: '请选择商品分类',
      }
    };
    this.WxValidate = new WxValidate(rules, messages)
  },
  inputs: function (e) {
    var type = e.currentTarget.dataset.type;
    var value = e.detail.value;
    let str = 'form.'+type;
    if (type === 'desc'){
      // 获取输入框的内容
      // 获取输入框内容的长度
      var len = parseInt(value.length);
      //最多字数限制
      if (len > this.data.max) return;
      // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
      this.setData({
        currentWordNumber: len, //当前字数
        [str]: value
      })
    }else{
      this.setData({
        [str]:value
      });
    }
  },
  bindInput (e){
    this.setData({
      ['form.old_price']:e.detail.value
    });
  },
  formSubmit(e){
    var that = this;
    var params = this.data.form;
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      app.ShowQQmodal(error.msg, "");
      return false
    }
    if(!this.data.show_old_price){
      delete params['old_price']
    }
    params['category_id'] = this.data.classId
    var temprory = that.data.temporary_imgs;
    if (temprory) {
      params['imgs'] = temprory;
      app.WxHttpRequestPOST('second_goods_add', params, that.PublishDone, app.InterError)
    } else {
      var img_list = this.data.imglist;
      if(img_list.length > 0){
        app.uploadFile('second/',this.data.oss,img_list, function (urls) {
          that.setData({
            temporary_imgs: urls
          });
          params['imgs'] = urls;
          app.WxHttpRequestPOST('second_goods_add', params, that.PublishDone, app.InterError)
        })
      }else{
        app.WxHttpRequestPOST('second_goods_add', params, that.PublishDone, app.InterError)
      }
    }
  },
  PublishDone(res) {
    qq.hideLoading();
    var data = res.data;
    if (data.code === 200) {
      app.ShowQQmodal('恭喜！商品发布成功', '');
      app.globalData.new_goods = true;
      setTimeout(function () {
        qq.navigateBack();
      }, 1500)
    } else {
      app.ShowToast(data.message)
    }
  },
  OldSwitchClick(e){
    let value = e.detail.value;
      this.setData({
        show_old_price:value
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.WxHttpRequestGet('get_upload_sign', {category:'category'}, function (res) {
      let data = res.data;
      if (data.code === 200) {
        that.setData({
          oss: data.data.oss,
          categories: data.data.tags
        })
      } else {
        app.ShowQQmodal("网络错误，请稍后再试～", "");
      }
    });
    this.initValidate()
  }
})
