//nav.js
const app = getApp();
Page({
    data:{
        showModalStatus: false,
        noMore: false,
        order_bar: false,
        is_open: false,
        active_tag_id: 'all',
        screenWidth: app.globalData.screenWidth,
        height: 0,
        page: 1,
        inputVal: '',
        order_map: [
            {name: '时间',key:"create_time",tag:"timefill"},
            {name: '查看',key:"view_count",tag:"attentionfill"},
            {name: '评论',key:"comment_count",tag:"commentfill"},
            {name: '收藏',key:"collect_count",tag:"favorfill"},
        ],
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
        app.AuthNavigateToCheck('/pages/publish/publish?type=activity&tag_id='+this.data.active_tag_id)
    },
    DetailClick(e){
        var detail_id = e.currentTarget.dataset.id;
        qq.navigateTo({
            url:'/pages/detail/detail?detail_id='+detail_id
        })
    },
    onReachBottom () {
        if(!this.data.noMore){
            let that = this;
            let page = this.data.page + 1;
            let params = {active_tag_id:this.data.active_tag_id,key:this.data.inputVal,order:this.data.order,
                order_key:this.data.order_key,school_id:app.globalData.school['id'],page:page};
            app.WxHttpRequestGet('activity_list',params,function (res) {
                let data = res.data;
                if(data.code === 200){
                    let raw_activities = that.data.activities;
                    let response_data = data.data.activities
                    if(response_data.length === 0){
                        that.setData({
                            noMore:true
                        });
                    }else{
                        raw_activities = raw_activities.concat(response_data);
                        that.setData({
                            activities:raw_activities,
                            page: page
                        })
                    }
                }else{
                    app.InterError()
                }
            },app.InterError);
        }
    },
    toSearch:function(e){
        this.pageFilter(this.data.active_tag_id, this.data.inputVal)
        qq.pageScrollTo({
            scrollTop: 0
        })
    },
    FilterBar(){
        this.setData({
            order_bar:!this.data.order_bar,
        })
    },
    onLoad: function (options) {
        this.setData({
            active_tag_id: options.active_id
        })
            this.pageFilter(options.active_id);
    },
    TagClick (e) {
        let id = e.currentTarget.dataset.id;
        this.setData({
            active_tag_id:id,
        });
        qq.pageScrollTo({
            scrollTop: 0
        });
        this.pageFilter(id,this.data.inputVal)
    },
    touchStart (e) {
        if(this.data.order_bar){
            this.setData({
                order_bar:false,
            })
        }
    },
    ToUserPage (e){
        var i = e.currentTarget.dataset.id;
        qq.navigateTo({
            url:"/pages/my/profile/profile?i="+i
        })
    },
    pageFilter(tag_id, key=""){
        app.qqshowloading('');
        let that = this;
        let params = {active_tag_id:tag_id,key:key,order:this.data.order,
            order_key:this.data.order_key,school_id:app.globalData.school['id']}
        app.WxHttpRequestGet('activity_list',params,function (res) {
            let data = res.data;
            if(data.code === 200){
                let params = {
                    activities:data.data.activities,
                    page: 1,
                    noMore:false,
                };
                if(!that.data.tags){
                    params['tags'] = [{name:'全部',id:'all'}].concat(data.data.tags)
                }
                that.setData(params);
                for(let i =0;i<that.data.tags.length;i++){
                    if(that.data.tags[i].id == tag_id){
                        that.setData({
                            tag_index: i
                        })
                        break
                    }
                }
            }else{
                app.InterError()
            }
            qq.hideLoading()
        },app.InterError);
    },
    onShareAppMessage(res){
        app.ShowMenue()
    },
    onShow: function () {
        if(app.globalData.new_publish){
            this.pageFilter('all');
            app.globalData.new_publish = false;
        }
    }
})




