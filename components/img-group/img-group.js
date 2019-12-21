//publish.js
//获取应用实例
Component({
  properties: {
    "img_length":{
      type:Number,
      value: 0,
    },
    "urls":{
      type:Array,
      value:[],
    }
  },
  data: {
    img_length:5,
    urls: []
  },
  onLoad: function () {

  },
})
