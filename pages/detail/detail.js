//nav.js
const app = getApp()
Page({
    data:{
        releaseFocus:false,
        favor:false,
        commentValue:"",
        comments:[],
        favor_count:0,
    },
    inputBind (e){
        this.setData({
            commentValue:e.detail.value
        })
    },
    HandleImgClick (e) {
        app.preView(e);
    },
    bindaddfrienResult(res){
        let detail = res.detail;
        if(detail.errMsg === 'addFriend:fail auth deny'){
            app.AddFriendAuth()
        }
    },
    DeleteComment(e){
    let is_auth = app.AUthCheck();
    if (!is_auth){
        return
    }
      let that = this;
      let dataset = e.currentTarget.dataset;
        qq.showModal({
            title: '确认提示',
            content: '确认删除评论吗？',
            success(res) {
                if (res.confirm) {
                    app.WxHttpRequestPOST('comment_delete', {id:dataset.id,act:dataset.act}, function (response) {
                        let data = response.data;
                        if(data.code === 200){
                            var comments = that.data.comments;
                            comments.splice(dataset.index,1);
                            that.setData({
                                comments:comments
                            })
                        }else{
                            app.ShowQQmodal(data.message, "");
                        }
                    }, app.InterError)

                }
            }
        })
    },
    HandleSend (){
        let is_auth = app.AUthCheck();
        if (!is_auth){
            return
        }
        let that = this;
        let comment = this.data.commentValue;
        if(!comment){
            app.ShowQQmodal('请输入评论', "");
        }
        app.qqshowloading('发布中，请稍后');
        app.WxHttpRequestPOST('activity_comment',{activity_id:this.data.activity.id,desc:comment},
            function (res) {
            let data = res.data;
            if(data.code == 200){
                let comments = that.data.comments;
                comments.unshift({'content':that.data.commentValue,'avatarUrl':data.data.avatarUrl,
                'nickname': data.data.nickname,'create_time': '刚刚发布','publisher_id':data.data.publisher_id,
                'comment_id':data.data.comment_id});
                that.setData({
                    comments:comments,
                    commentValue:""
                });
                app.ShowQQmodal('留言成功', '');
            }else{
                app.ShowQQmodal('网络错误，请稍后再试', '');
            }
                qq.hideLoading()
            },app.InterError)
    },
    bindReply: function(e){
        this.setData({
            releaseFocus: true
        })
    },
    HandleGetDone (res){
        var data = res.data;
        if(data.code === 200){
            const favor = data.data.favor_count;
            var count = 0;
            if(favor){
                count = favor[0]['count(1)'];
            }
            this.setData({
                activity:data.data.activity,
                comments:data.data.comments,
                user_id:app.globalData.user_id,
                favor_count:count,
            })
        }else{
            app.ShowQQmodal(data.message, "");
        }
        qq.hideLoading();
    },
    GetImageInfo(share_row, result_func){
        let result = []
            for(var i =0;i<share_row.length;i++){
                qq.getImageInfo({
                    src: share_row[i],
                    success(res) {
                        if(res){
                            result.push({
                                type: 'photo',
                                path: res.path
                            })
                            if(result.length === share_row.length){
                                result_func(result)
                            }
                        }
                    }
                })
            }
    },
    QQZonePublish(){
        let that = this;
        let share_row = app.globalData.share_urls;
        let activity = that.data.activity;
        if(activity.imgs){
            share_row = share_row.concat(activity.imgs);
        }
        app.qqshowloading('拼命生成中...');
        that.GetImageInfo(share_row, function (res) {
            qq.hideLoading()
            qq.openQzonePublish({
                    text: '#企鹅校园 ' + activity.content,
                    media: res
                })
        })
    },
    FavorDone (res){
        const data =res.data;
        if(data.code == 200){
            var favor_count = this.data.favor_count;
            this.setData({
                favor_count:data.data === 'normal'?favor_count+1:favor_count-1,
                favor:data.data === 'normal'
            })
        }else{
            app.ShowQQmodal(data.message, "");
        }
    },
    LickClick (e){
        let is_auth = app.AUthCheck();
        if (!is_auth){
            return
        }
        const activity_id = e.currentTarget.dataset.id;
        app.WxHttpRequestPOST('activity_favor',{activity_id:activity_id},this.FavorDone,app.InterError)
    },
    onShareAppMessage(res){
        app.ShowMenue()
    },
    onLoad: function (options) {
        app.qqshowloading('加载中，请稍后');
        const detail_id = options.detail_id;
        app.WxHttpRequestGet('activity_detail',{detail_id:detail_id},this.HandleGetDone,app.InterError)
    }
})
