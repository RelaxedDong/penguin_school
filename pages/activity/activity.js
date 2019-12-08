//nav.js
const app = getApp()
Page({
    data:{
        showSearch: false,
        showModalStatus: false,
        order_bar: false,
        is_open: false,
        active_tag_id: 'all',
        inputVal: '',
        default_icon: 'cuIcon-triangledownfill',
        order: 'DESC',
        order_key: 'create_time'
    },
    bindaddfriend(e){
        console.log(e)
    },
    ScaleClickEvent(e){
      let is_open = e.detail.is_open;
      if(is_open){
          this.setData({
              is_open:is_open
          })
      }
    },
    bindInput(e){
        this.setData({
            inputVal:e.detail.value,
        })
    },
    FilterClick(e) {
        let order_key = e.currentTarget.dataset.key;
        if(order_key === this.data.order_key){
            this.setData({
                order: this.data.order === 'DESC'?"ASC":'DESC',
                default_icon:this.data.default_icon === 'cuIcon-triangledownfill'?'cuIcon-triangleupfill':'cuIcon-triangledownfill'
            })
        }else{
            this.setData({
                order: 'DESC',
                default_icon: 'cuIcon-triangledownfill',
                order_key: order_key,
            })
        }
        this.pageFilter(this.data.active_tag_id, this.data.inputVal)
    },
    PublishClick(){
        app.AuthNavigateToCheck('/pages/publish/publish?type=activity')
    },
    DetailClick(e){
        var detail_id = e.currentTarget.dataset.id;
        qq.navigateTo({
          url:'/pages/detail/detail?detail_id='+detail_id
      })
    },
    toSearch:function(e){
        this.pageFilter(this.data.active_tag_id, this.data.inputVal)
    },
    FilterBar(){
        this.setData({
            order_bar:!this.data.order_bar,
        })
    },
    SearchBtnClick(){
        if(this.data.showSearch){
            //  关闭
            this.pageFilter(this.data.active_tag_id, "")
        }
        this.setData({
            showSearch:!this.data.showSearch,
            inputVal:''
        })
    },
    onLoad: function (options) {
        if(options.active_id){
            this.pageFilter(options.active_id)
            this.setData({
                active_tag_id:options.active_id
            })
        }else{
            this.pageFilter(this.data.active_tag_id)
        }
    },
    TagClick (e) {
        let id = e.currentTarget.dataset.id;
        this.setData({
            active_tag_id:id,
        });
        this.pageFilter(id,this.data.inputVal)
    },
    pageFilter(tag_id, key=""){
        app.qqshowloading('加载中，请稍后');
        let that = this;
        let params = {active_tag_id:tag_id,key:key,order:this.data.order,order_key:this.data.order_key}
        app.WxHttpRequestGet('activity_list',params,function (res) {
            let data = res.data;
            let tags_response = data.data.tags;
            let tags = [{name:'全部',id:'all'}].concat(tags_response);
            if(data.code === 200){
                that.setData({
                    activities:data.data.activities,
                    tags: tags
                })
            }else{
                app.InterError()
            }
        },app.InterError);
        qq.hideLoading()
    },
    onShareAppMessage(res){
        app.ShowMenue()
    },
    ShareClick(){
      app.ShowMenue()
    },
    onShow: function () {
        if(app.globalData.new_publish){
            this.pageFilter('all');
            app.globalData.new_publish = false;
        }
    }
})



  
