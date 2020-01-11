// photo.js
const  app = getApp()
Page({
    data: {
        input: "",
        active_address: "",
        address_list: [],
    },
    AddressClick(e) {
        let address = e.currentTarget.dataset.address;
        let raw_address = this.data.active_address;
        if(raw_address === address) {
            address = false
        }
        this.setData({
            active_address: raw_address
        });
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({active_address:address,input:this.data.input });
        qq.navigateBack()
    },
    ClearAddress(){
        this.setData({
            active_address: ""
        })
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({active_address:"",input:"" });
        qq.navigateBack()
    },
    ClearClick() {
        this.setData({
            input: "",
            address_list: []
        })
    },
    getsuggest: function (e) {
        var _this = this;
        var old_timer = this.data.timer;
        if (old_timer) {
            clearTimeout(old_timer)
        }
        this.setData({
            timer: setTimeout(() => {
                if (e.detail.value) {
                    app.globalData.qqmapsdk.getSuggestion({
                        //获取输入框值并设置keyword参数
                        keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
                        // region:"北京", //设置城市名，限制关键词所示的地域范围，非必填参数
                        success: function (res) {//搜索成功后的回调
                            var sug = [];
                            for (var i = 0; i < res.data.length; i++) {
                                sug.push(
                                    res.data[i].title,
                                )
                            }
                            _this.setData({
                                address_list: app.uniq(sug)
                            })
                        },
                    });
                } else {
                    _this.triggerEvent('SearchList', []);
                }
                // 调用关键词提示接口
            }, 700),
            input: e.detail.value,
        })
    },
    onLoad: function (options) {
        let data = JSON.parse(decodeURIComponent(options.data));
        if(data.active_address){
            this.setData({
                active_address:data.active_address
            })
        }
        if(data.input){
            this.getsuggest({detail:{value:data.input}})
        }
    }
});

