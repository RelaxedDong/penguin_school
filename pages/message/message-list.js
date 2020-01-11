// photo.js
const  app = getApp();
Page({
    data: {
        message:{}
    },
    HandleClick(e){
        let self = this;
        let dataset = e.currentTarget.dataset;
        app.WxHttpRequestPOST('message_read', {'message_id':dataset.curid}, function (res) {
        let data = res.data;
        if(data.code === 200){
            let index = dataset.index;
            let status = 'messages['+index+'].status';
            self.setData({
                [status]: 'is_read'
            });
            let url ='/pages/detail/detail?detail_id='+dataset.id;
            if(dataset.target === 'activity') {
            } else {
                url = '/pages/preview/preview?imgid='+dataset.id
            }
            qq.navigateTo({
                url:url
            })
        }else{
            app.ShowQQmodal(data.msg, "");
        }
    }, app.InterError)

    },
    onLoad: function (options) {
        let self = this;
        app.WxHttpRequestPOST('get_message_list', {'choose_type':options.type}, function (res) {
            let data = res.data;
            if(data.code === 200){
                self.setData({
                    messages:data.data
                })
            }
        })
    }
});
