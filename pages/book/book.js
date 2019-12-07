// photo.js
const  app = getApp()
Page({
  data: {
    books: [],
    inputVal: "",
  },
  bindInput(e){
    this.setData({
      inputVal:e.detail.value,
    })
  },
  SeeStore(e){
    const that = this;
    const book_id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    if(this.data.books[index].stores){
      return
    }
    app.qqshowloading('拼命加载中，请稍后');
    app.WxHttpRequestGet('book_store', {book_id:book_id}, function (res) {
      const data = res.data;
      if(data.code == 200){
        var oSelected = "books[" + index + "].stores";
        that.setData({
          [oSelected]:data.data
        })
      }else{
        app.ShowQQmodal(data.message, "");
      }
      qq.hideLoading()
    })
  },
  toSearch:function(e){
    app.qqshowloading('拼命加载中，请稍后');
    this.SearchFunc(this.data.inputVal)
  },
  SearchFunc(key){
      const that = this;
      app.WxHttpRequestGet('book_search', {key:key}, function (res) {
          const data = res.data;
          if(data.code == 200){
            that.setData({
              books: data.data.book
            })
          }else{
            app.ShowQQmodal(data.message, "");
          }
        qq.hideLoading()
      })
  },
  onLoad: function () {
    app.ShowToast('搜索图书查看馆藏位置吧～')
  }
});
