// components/SwiperSlider/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperData: {
      type: Array,
      value: []
    },
    swiperOptions: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    options: {},
  },
  attached: function (){
    this.setData({
      options: Object.assign({}, {
        autoplay: false,
        circular: true,
        interval: 3000,
        duration: 100,
        previousMargin: 60,
        nextMargin: 0,
        displayMultipleItems: 3,
        currentSwiper: ''
      }, this.data.swiperOptions)
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      this.setData({
        'options.currentSwiper': e.detail.current
      })
    }
  }
})
