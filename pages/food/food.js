//publish.js
//获取应用实例
const app = getApp()
Page({
  data: {
    foods:[
      {url: 'https://img1.qunarzz.com/travel/poi/1802/a6/dfda2c49d965a037.jpg_r_480x360x95_0ad80e67.jpg',
        name: 'N多寿司',
        price: '22',
        address: '府衙小吃一条街忆品香隔壁',
        source: '寿司'
      },
      {url: 'https://img1.qunarzz.com/travel/poi/1802/eb/1b97b5f722a8cf37.jpg_r_480x360x95_e99136ec.jpg',
        name: '食尚派海鲜自助餐厅',
        price: '55',
        address: '民主街豪盛百货南门东100米',
        source: '海鲜自助'
      },{url: 'https://img1.qunarzz.com/travel/poi/1807/fa/2203868372b65537.jpg_r_480x360x95_5ff8a03a.jpg',
        name: '农家菜馆',
        price: '25',
        address: '赊店镇泰山路中段路北',
        source: '家常菜'
      },{url: 'https://img1.qunarzz.com/travel/poi/1803/e5/b8eb980dc1cb4f37.jpg_r_480x360x95_5b9b16f9.jpg',
        name: '永和豆浆',
        price: '19',
        address: '车站南路与武侯路交叉口向北50米路西',
        source: '永和豆浆'
      },{url: 'https://img1.qunarzz.com/travel/poi/1803/a2/a68d7524a1989937.jpg_r_480x360x95_848e0040.jpg',
        name: '悦丽怡景西餐厅',
        price: '82',
        address: '人民南路与民主街交叉口东北角(近财神庙西)',
        source: '西餐厅'
      },{url: 'https://img1.qunarzz.com/travel/poi/1803/26/0b18e23d49d47d37.jpg_r_480x360x95_9767cd6c.jpg',
        name: '王府烤鸭店',
        price: '40',
        address: '卧龙路中段(近南阳钱柜)',
        source: '美味烤鸭'
      },
    ]
  },
  onShareAppMessage(res){
    app.ShowMenue()
  },
  HandleClick(){
    app.ShowToast('研发中，敬请期待～')
  },
  onLoad: function () {

  },
})
