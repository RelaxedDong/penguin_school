// photo.js
const  app = getApp();
Page({
    data: {
        message:{}
    },
    HandleClick(e){
      let dataset = e.currentTarget.dataset;
      let url ='/pages/detail/detail?detail_id='+dataset.id;
        if(dataset.target === 'activity') {
      } else {
        url = '/pages/preview/preview?imgid='+dataset.id
        }
        qq.navigateTo({
            url:url
        })
    },
    onLoad: function (options) {
        let self = this;
        app.WxHttpRequestPOST('get_message_list', {'choose_type':options.type}, function (res) {
            console.log(res)
            let data = res.data;
            if(data.code === 200){
                self.setData({
                    messages:data.data
                })
            }
        })
    }
});
