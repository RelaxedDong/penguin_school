const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    votes:[],
    votedColor: ['#9dc8c8', '#58c9b9', '#519d9e', '#d1b6e1'],
  },
  avBack() {
    qq.navigateBack()
  },
  targetToAdd () {
    let is_auth = app.AUthCheck();
    if (!is_auth){
      return
    }
    qq.navigateTo({
      url: "/vote_package/pages/vote_add/vote_add"
    })
  },
  VoteAdd (e) {
    let is_auth = app.AUthCheck();
    if (!is_auth){
      return
    }
    let self = this;
    let dataset = e.currentTarget.dataset;
    let vote_index = dataset.voteindex;
    let params = {
      vote_id:dataset.id,
      vote_option_index:dataset.optionindex
    };
    app.WxHttpRequestPOST('user_vote',params,function (res) {
      let data =res.data;
      if(data.code === 200){
        let vote_str = `votes[${vote_index}]`;
        let vote = self.data.votes[vote_index];
        vote.options[dataset.optionindex] = data.data.vote_option;
        for(let i=0;i<vote.options.length;i++){
          vote.options[i].percent = (vote.options[i].vote_user_ids.length/data.data.total_len*100).toFixed(1);
        }
        vote['user_is_vote'] = true;
        vote['total'] = data.data.total_len;
        self.setData({
          [vote_str]:vote,
        });
        app.ShowToast('投票成功！')
      } else {
        app.ShowToast(data.message)
      }
    },app.InterError)
  },
  targetToVoteDetail () {
    app.ShowToast('研发中，敬请期待～')
  },
  //签到
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    if (app.globalData.new_vote){
      this.onLoad();
      app.globalData.new_vote = false
    }
  },
  format_votes(results){
    let user_id = app.globalData.user_id;
    return results.map((vote) => {
      for(let i=0;i<vote.options.length;i++){
        vote.options[i].percent = (vote.options[i].vote_user_ids.length/vote.total*100).toFixed(1);
      }
      vote.user_is_vote = vote.total_users.indexOf(user_id) !== -1;
      return vote;
    })
  },
  onLoad: function(options){
    let school = JSON.parse(options.school);
    let self = this;
    app.qqshowloading('');
    app.WxHttpRequestGet('vote_list', {school_id:school['id']}, function (res) {
      let data = res.data;
      if (data.code === 200) {
        let result = self.format_votes(data.data);
        self.setData({
          votes: result,
          school: school,
        })
      } else {
        app.ShowQQmodal(res.message, "");
      }
      qq.hideLoading()
    })
  },
  previewImage(e){
    app.preView(e)
  },
  //分享
  onShareAppMessage: function () {
    app.ShowMenue()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
})

