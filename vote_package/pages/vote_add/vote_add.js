//logs.js
const app = getApp()
Page({
    data: {
        newVoteTitle: '',
        desTextareaState: false,
        addNewVoteState: false,
        textareaFocusFlag: false,
        newVoteWords: 0,
        newVoteWordsState: false,
        newVoteContent: '',
        newVotes: [],
        desTextareaData: '',
        voteTypeChoosed: 0,
        time: '00:00',
        voteTitleLen: 0,
        voteDesLen: 0,
        voteImgs: [],
        unique_answer: [],
        voteTypes: [
            { name: 'F', value: '公开', checked: true },
            { name: 'T', value: '私密' }
        ],
        limitTime: [
            { name: 'N', value: '无限制', checked: true },
            { name: 'T', value: '限制'}
        ],
        showlimitTime:false,
        limitTimeChoose:'N'
    },
    timeLimitChange(e){
        let value = e.detail.value;
        this.setData({
            limitTimeChoose:value,
            limitTime: [
                { name: 'N', value: '无限制', checked: value === 'N' },
                { name: 'T', value: '限制', checked: value==='T'}
            ],
            showlimitTime: value === 'T'
        })
    },
    radioChange: function(e) {
        let self = this;
        let choosedValue = e.detail.value;
        if (e.detail.value === "T") {
            qq.showModal({
                content: '私密投票发布将不展示发布者头像昵称等~',
                success: function(res) {
                    if (res.confirm) {
                        self.setData({
                            voteTypeChoosed: choosedValue
                        })
                        return;
                    } else if (res.cancel) {
                        self.setData({
                            voteTypes: [
                                { name: 'F', value: '公开', checked: true },
                                { name: 'T', value: '私密' }
                            ]
                        })
                    }
                }
            })
        } else {
            self.setData({
                voteTypeChoosed: choosedValue
            })
        }
    },
    bindTitleInput: function(e) {
        let self = this;
        self.setData({
            newVoteTitle: e.detail.value,
            voteTitleLen: e.detail.cursor
        })
    },
    bindDesTextAreaInput: function(e) {
        let self = this;
        self.setData({
            desTextareaData: e.detail.value
        })
    },
    bindTextAreaInput: function(e) {
        var self = this;
        self.setData({
            newVoteWords: e.detail.cursor,
            newVoteContent: e.detail.value
        })
        if (self.data.newVoteWords === 40) {
            self.setData({
                newVoteWordsState: true
            })
        } else {
            self.setData({
                newVoteWordsState: false
            })
        }
    },
    bindTimeChange(e) {
        let self = this;
        let now = new Date();
        let date =app.getyyyyMMdd(now);
        if(date === this.data.date){
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let split_date = e.detail.value.split(':');
            let hour = split_date[0];
            let min = split_date[1];
            if(parseInt(hour) < hours){
                app.ShowQQmodal('时间选择错误', "请重新选择");
                return
            }else if(parseInt(hour) === hours ){
                if(parseInt(min)<=minutes){
                    now.setMinutes(now.getMinutes() + 30);
                    app.ShowQQmodal('时间选择错误', "投票时间至少30分钟");
                    let set_min = now.getMinutes();
                    if(set_min < 10){
                        set_min = '0'+set_min
                    }
                    let params = {
                        time:now.getHours()+':'+ set_min
                    }
                    let date = app.getyyyyMMdd(now); // 如果是23：30后操作
                    if(date !== app.getyyyyMMdd(new Date())){
                        params['date'] = date
                    }
                    setTimeout(function () {
                        self.setData(params)
                    },1500)
                }else {
                    this.setData({
                        time: e.detail.value,
                    })
                }
            } else {
                this.setData({
                    time: e.detail.value,
                })
            }
        } else {
            this.setData({
                time: e.detail.value,
            })
        }
    },
    bindvaliDateChange (e) {
        let now = new Date();
        let date =app.getyyyyMMdd(now);
        let params = {
            date: e.detail.value
        };
        if(e.detail.value !== date){
            params['start_time'] = '00:00'
        } else {
            params['start_time'] = now.getHours()+':'+now.getMinutes();
            params['time'] = '23:59';
        }
        this.setData(params)
    },
    onLoad: function() {
        let self = this;
        let now = new Date();
        let date =app.getyyyyMMdd(now);
        const startDate =app.getyyyyMMdd(now);
        let minites = now.getMinutes();
        let hours = now.getHours();
        let start_time = hours+':'+minites;

        now.setDate(now.getDate() + 1);
        now.setFullYear(now.getFullYear() + 1); //最长限制一年
        const endDate = app.getyyyyMMdd(now);
        app.WxHttpRequestGet('get_upload_sign', {}, function (res) {
            let data = res.data;
            if (data.code === 200) {
                self.setData({
                    limit_pic:3,
                    startDate:startDate,
                    date:date,
                    time:"23:59",
                    start_time:start_time,
                    endDate:endDate,
                    oss: data.data.oss,
                    access_token: data.data.access_token,
                })
            } else {
                app.ShowQQmodal("网络错误，请稍后再试～", "");
            }
            qq.hideLoading()
        });
    },
    addNewVote: function() {
        var self = this;
        self.setData({
            desTextareaState: !this.data.desTextareaState,
            addNewVoteState: !this.data.addNewVoteState,
        })
    },
    confirmAddNewVote: function() {
        let voteContent = this.data.newVoteContent;
        let voteItem = {};
        var self = this;
        if(self.data.unique_answer.indexOf(voteContent)!==-1){
            app.ShowToast('已存在投票选项');
            return
        }
        if (voteContent) {
            voteItem.title = voteContent;
        } else {
            app.ShowToast('请填写选项内容');
            return;
        }
        self.data.newVotes.push(voteItem);
        self.data.unique_answer.push(voteContent);
        self.setData({
            desTextareaState: !self.data.desTextareaState,
            unique_answer: self.data.unique_answer,
            newVoteContent: '',
            newVotes: self.data.newVotes,
            addNewVoteState: false,
            newVoteWords: 0,
        });

    },
    closeMask: function() {
        var self = this;
        self.setData({
            addNewVoteState: false,
            newVoteContent: '',
            newVoteWords: 0,
            newVoteWordsState: false,
            desTextareaState: false,
        })
    },
    showMask: function() {
        var self = this;
        self.setData({
            addNewVoteState: false
        })
    },
    bindTextAreablur: function() {
        var self = this;
        self.setData({
            textareaFocusFlag: false
        })
    },
    bindTextAreaFocus: function() {
        this.setData({
            textareaFocusFlag: true
        })
    },
    bindPreviewImage: function(e) {
        var self = this;
        qq.previewImage({
            current: e.currentTarget.dataset.src, // 当前显示图片的http链接
            urls: self.data.voteImgs // 需要预览的图片http链接列表
        })
    },
    delImage: function(e) {
        let i = e.currentTarget.dataset.index;
        let voteImgs = this.data.voteImgs;
        voteImgs.splice(i, 1);
        this.setData({
            voteImgs: voteImgs,
            temporary_imgs: false
        })
    },
    ImgAddClick(e) {
        const that = this;
        qq.chooseImage({
            count:4, // 3
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                let voteImgs = that.data.voteImgs;
                for (var i = 0; i < tempFilePaths.length; i++) {
                    if (voteImgs.length >= 4) {
                        break
                    } else {
                        voteImgs.push(tempFilePaths[i])
                    }
                }
                that.setData({
                    voteImgs: voteImgs,
                })
            }
        })
    },
    confirmDelItem: function(e) {
        let self = this;
        let index = e.currentTarget.dataset.index;
        let delData = self.data.newVotes;
        let unique_answer = self.data.unique_answer;
        qq.showModal({
            title: '温馨提示',
            content: '确认删除该投票选项？',
            success: function(res) {
                if (res.confirm) {
                    delData.splice(index, 1);
                    unique_answer.splice(index, 1);
                    self.setData({
                        newVotes: delData,
                        unique_answer: unique_answer,
                    })
                }
            }
        })
    },
    PublishDone(res){
        let data = res.data;
        if (data.code === 200) {
            qq.showToast({
                title: '投票发布成功',
                icon: 'success',
                duration: 1500,
                mask: true
            });
            setTimeout(function () {
                app.globalData.new_vote = true;
                qq.navigateBack();
            }, 1500)
        }else {
            app.ShowToast(data.message)
        }
        qq.hideLoading();
    },
    publishNewVote: function() {
        /**
         * 标题：newVoteTitle
         * 类型：voteTypeChoosed
         * 描述：desTextareaData
         * 选项：newVotes
         */
        let self = this;
        let newVoteTitle = self.data.newVoteTitle;
        let voteTypeChoosed = self.data.voteTypeChoosed == 0 ? 'F' : self.data.voteTypeChoosed;
        let desTextareaData = self.data.desTextareaData;
        let newVotes = self.data.newVotes;
        if (newVoteTitle === "") {
            app.ShowToast('请输入【投票标题】后再提交');
            return;
        } else if (self.data.voteTitleLen < 3) {
            app.ShowToast('【投票标题】至少三个字');
            return;
        }
        if (newVotes.length < 2) {
            app.ShowToast('【投票选项】至少两项！');
            return;
        }
        let params = {
            title: newVoteTitle,
            is_private: voteTypeChoosed==='F'?'0':'1',
            content: desTextareaData,
            options: newVotes
        };
        if(this.data.limitTimeChoose==='T'){
            params['end_time'] = this.data.date + ' ' + this.data.time
        }
        var temprory = self.data.temporary_imgs;
        let img_list = self.data.voteImgs;
        app.qqshowloading('发布中，请稍后');
        if (temprory) {
            params['images'] = temprory;
            app.WxHttpRequestPOST('vote_add', params, self.PublishDone, app.InterError)
        } else {
            if(img_list.length > 0){
                app.uploadFile('static/votes/',self.data.oss,img_list, function (urls) {
                    self.setData({
                        temporary_imgs: urls
                    });
                    params['images'] = urls;
                    app.WxHttpRequestPOST('vote_add', params, self.PublishDone, app.InterError)
                })
            }else{
                app.WxHttpRequestPOST('vote_add', params, self.PublishDone, app.InterError)
            }
        }
    }
})
