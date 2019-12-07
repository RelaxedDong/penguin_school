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
    urls: [
        'https://donghao.club/school/2019113022455145088Pfxhiij7JnMXyGTbHWSmXCD55cjShj.jpg',
        'https://donghao.club/school/20191130224551465CyT2AJXHNRT2fP8Pw6WP4xFyaM8T34iR.jpg',
        'https://donghao.club/school/201911281802936YAc5drCCyJprEKYnf6Tctcr3fX6aD8Jb.jpg',
        'https://donghao.club/school/201911281758555074BzrDKbAEACEkYiBxB8dcDcRtysPRcbA.jpg',
        'https://donghao.club/school/20191128175855501CRrKSKGNHJjsiFX44TDGnWmwkh4nafXR.jpg',
    ]
  },
  onLoad: function () {

  },
})
