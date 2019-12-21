// photo.js
const app = getApp()
Page({
    data: {
        commentValue: ""
    },
    onLoad: function (options) {
        var data = JSON.parse(decodeURIComponent(options.data));
        this.setData({
            super_id: data.super_id,
            activity_id: data.activity_id,
            user_id: app.globalData.user_id
        });
        this.GetDetailComments()
    },
    GetDetailComments: function(){
        let self = this;
        app.WxHttpRequestGet('comment_more', {parent_comment_id: this.data.super_id}, function (res) {
            let response = res.data;
            if (response.code === 200) {
                let comments = response.data;
                let comments_doc = {}
                for(var i=0;i<comments.length;i++){
                    comments_doc[comments[i].id] = {id:comments[i].id,nickname:comments[i].nickname,avatarUrl:
                    comments[i].avatarUrl}
                }
                self.setData({
                    comments_doc: comments_doc,
                    comments: comments,
                })
            } else {
                app.ShowQQmodal(response.message, "");
            }
        }, app.InterError)
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
                            app.ShowQQmodal('删除成功～', "");
                            if(dataset.id === that.data.super_id){
                                app.globalData.re_render_detail = true
                                qq.navigateBack();
                            }else {
                                that.GetDetailComments()
                            }
                        }else{
                            app.ShowQQmodal(data.message, "");
                        }
                    }, app.InterError)

                }
            }
        })
    },
    bindReply: function (e) {
        let dataset = e.currentTarget.dataset;
        let set_data = {
            commentValue: ""
        }
        if(this.data.reply_commentid === dataset.commentid){
            set_data['releaseFocus'] = false
            set_data['reply_commentid'] = false;
        } else {
            set_data['releaseFocus'] = true;
            set_data['reply_index'] = dataset.index;
            set_data['releaseName'] = "回复 " + dataset.nickname;
            set_data['reply_commentid'] = dataset.commentid;
        }
        this.setData(set_data)
    },
    inputBind(e) {
        this.setData({
            commentValue: e.detail.value
        })
    },
    HandleSend: function (e) {
        let that = this;
        let comment = this.data.commentValue;
        if (!comment) {
            app.ShowQQmodal('请输入评论', "");
        }
        let params = {activity_id: this.data.activity_id, desc: comment, formId: e.detail.formId}
        params['reply_commentid'] = this.data.reply_commentid;
        app.WxHttpRequestPOST('activity_comment', params, function (res) {
            let data = res.data;
            if (data.code === 200) {
                that.GetDetailComments();
                that.setData({
                    commentValue:"",
                    releaseFocus:false
                })
                app.pageScrollToBottom('foot');
                app.ShowQQmodal('留言成功', '');
            } else {
                app.ShowQQmodal(res.message, "");
            }
        }, app.InterError)
    }
});
