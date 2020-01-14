//nav.js
const app = getApp()
Page({
    data:{
        releaseFocus:false,
        favor:false,
        reply_commentid:false,
        releaseName:"发表新评论",
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
    MoreComment(e) {
        let index = e.currentTarget.dataset.index;
        let comment = this.data.comments[index];
        let data = {
            'comments':comment,
            'activity_id':this.data.activity.id,
            'super_id':comment.id
        }
        qq.navigateTo({
          url: '/pages/detail/more-vote_add?data='+encodeURIComponent(JSON.stringify(data))
      })
    },
    HandleSend (e){
        if (!app.AUthCheck()){
            return
        }
        let that = this;
        let comment = this.data.commentValue;
        if(!comment){
            app.ShowQQmodal('请输入评论', "");
        }
        let params = {activity_id:this.data.activity.id,desc:comment,formId:e.detail.formId}
        if(this.data.reply_commentid){
            params['reply_commentid'] = this.data.reply_commentid;
        }
        app.qqshowloading('发布中，请稍后');
        app.WxHttpRequestPOST('activity_comment',params,
            function (res) {
            let data = res.data;
            if(data.code == 200){
                let comments = that.data.comments;
                if(that.data.reply_commentid){
                    let raw_comment = comments[that.data.reply_index];
                    let length = 1;
                    if(raw_comment.len){
                        length = raw_comment.len + length
                    }
                    let index = that.data.reply_index;
                    let reply_key =  `comments[${index}].len`;
                    let children_key =  `comments[${index}].children`;
                    params['commentValue'] = "";
                    let children = comments[index].children;
                    if(!children) children = [];
                    children.push(data.data);
                    that.setData({
                        [reply_key]: length,
                        [children_key]: children,
                        commentValue:""
                    })
                } else {
                    comments.unshift(data.data);
                    that.setData({
                        comments:comments,
                        commentValue:""
                    });
                }
                app.ShowQQmodal('留言成功', '');
            }else{
                app.ShowQQmodal('网络错误，请稍后再试', '');
            }
                qq.hideLoading()
            },app.InterError)
    },
    bindReply: function(e){
        let dataset = e.currentTarget.dataset;
        let update_data = {
            releaseFocus: true,
            commentValue:""
        };
        if(dataset.commentid){
            update_data['reply_commentid'] = dataset.commentid;
            update_data['reply_index'] = dataset.index;
            update_data['releaseName'] = "回复 "+dataset.nickname
        }else {
            update_data['reply_commentid'] = false;
            update_data['reply_index'] = false;
            update_data['releaseName'] = "发表新评论"
        }
        this.setData(update_data)
    },
    HandleGetDone (res){
        var data = res.data;
        if(data.code === 200){
            this.setData({
                activity:data.data.activity,
                comments:data.data.comments,
                user_id:app.globalData.user_id,
                favor_count:data.data.favor_count,
            })
        }else{
            app.ShowQQmodal(data.message, "");
        }
        qq.hideLoading();
    },
    GetImageInfo(share_row, result_func){
        let result = [];
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
    share(){
      this.onShareAppMessage()
    },
    onShareAppMessage(res){
        app.ShowMenue()
    },
    onLoad: function (options) {
        app.qqshowloading('');
        const detail_id = options.detail_id;
        app.WxHttpRequestGet('activity_detail',{detail_id:detail_id},this.HandleGetDone,app.InterError)
    },
    onShow: function () {
        if(app.globalData.re_render_detail){
            app.globalData.re_render_detail = false;
            this.setData({
                releaseFocus: false,
                commentValue:""
            })
            app.WxHttpRequestGet('activity_detail',{detail_id:this.data.activity.id},this.HandleGetDone,app.InterError)
        }
    }
})
