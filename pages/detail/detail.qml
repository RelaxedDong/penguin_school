<view class="page-container" qq:if="{{activity}}">
  <view class="activity-head shadow flex-row border-main padding-top-bottom-20">
    <image class="cell-center" src="{{activity.anonymous == '1'?'/imgs/source/users/avatar/anonymous1.png':activity.avatarUrl}}"></image>
    <view class="info flex-column">
      <view class="nickname">
        <view class="text-black">
          {{activity.anonymous == '1'?'匿名用户':activity.nickname}}
        </view>
      </view>
      <view class="text-size-23 text-grey">
        <view>{{activity.create_time}}</view>
      </view>
    </view>
    <view class="auto-left margin-right-5 location align-items">
      <button qq:if="{{activity.can_add_friend == '1' && activity.anonymous !== '1'}}" class="add-btn main-bg-cor"
              bindaddfriend="bindaddfrienResult"
              open-type="addFriend"
              open-id="{{activity.openid}}">
        + 好友
      </button>
    </view>
  </view>
  <view class="detail-title space-between space-b">
    <view>
      {{activity.title}}
    </view>
    <view>
      <button open-type="share" class="cell-center text-yellow flex-row ">
        <view  class=" auto-left">
          <text class="cuIcon-share"></text>
        </view>
      </button>
    </view>
  </view>
  <view class="text-desc">
    <text>
      {{activity.content}}
    </text>
  </view>
  <view class="grid-9 padding-top-bottom-20">
    <view class="img-box" qq:for="{{activity.imgs}}" qq:key bindtap="HandleImgClick"
          data-urls="{{activity.imgs}}" data-currenturl="{{item}}">
      <image src="{{item}}" class="item_book_img" mode="aspectFill"></image>
    </view>
  </view>
  <view class="padding-top-bottom-20 text-size-25 text-grey">
    <view qq:if="{{activity.address}}" class="location text-size-23">
      <text class="cuIcon-locationfill"></text>
      <text class="margin-left-10">{{activity.address}}</text>
    </view>
  </view>
  <view class="space-between align-items margin-top-20 padding-top-bottom-10">
        <view class="text-blue-active border-box" qq:for="{{activity.tags}}">
          <view class="text-size-23">#{{item.name}}</view>
        </view>
  </view>
  <view class="space-between text-grey padding-top-bottom-20 text-size-27 border-main margin-left-10">
    <view bindtap="QQZonePublish">
      <text class="cuIcon-upload margin-right-10 green"></text>
      <text>生成说说</text>
    </view>
      <view class="margin-right-10">
        <view class="flex-row">
          <view class="margin-right-20">
            <text class="margin-right-10 cuIcon-attention"></text>{{activity.view_count}}
          </view>
          <view bindtap="bindReply" class="margin-right-20">
            <text class="cuIcon-comment margin-right-10"></text>{{comments.length}}
          </view>
          <view bindtap="LickClick" data-id="{{activity.id}}" class="margin-right-20">
            <text class="margin-right-10 {{favor?'text-red cuIcon-likefill':'cuIcon-like'}}"></text>{{favor_count}}
          </view>
        </view>
      </view>
  </view>
  <view class="release" hidden="{{!releaseFocus}}">
    <textarea class="text"
              placeholder-class="input_null"
              fixed="true"
              bindinput="inputBind"
              value="{{commentValue}}"
              maxlength="-1"
              show-confirm-bar="false"
              cursor-spacing="15"
              auto-height="true"
              focus="{{releaseFocus}}"
              placeholder="{{releaseName}}"></textarea>
      <form class="submit" bindsubmit='HandleSend' report-submit>
        <button class="main-bg-cor text-size-30 text-blue" formType="submit">发表</button>
      </form>
  </view>
  <view class="text-center back-index" bindtap="Toindex" qq:if="{{detail_load}}">
    <text class="cuIcon-home"></text>
  </view>
  <view class="box-comment ">
    <view class="empty" qq:if="{{comments.length == 0}}">
      <image src="/imgs/source/loading.gif"></image>
      <text class="text-grey">沙发是空的，赶紧来抢！</text>
    </view>
    <view class="border-main padding-10 border-box"  qq:for="{{comments}}" qq:key qq:for-item="comment">
      <view class="activity-head flex-row margin-top-10">
        <image src="{{comment.avatarUrl}}"></image>
        <view class="info flex-column">
          <view class="text-black text-size-30">{{comment.nickname}}</view>
          <view class="text-size-25 text-grey">{{comment.create_time}}</view>
        </view>
        <view class="share" qq:if="{{user_id == comment.publisher_id}}" data-index="{{index}}" bindtap="DeleteComment"
              data-id="{{comment.id}}" data-act="{{activity.id}}">
          <text class="cuIcon-deletefill text-red border-box text-size-18"></text>
        </view>
      </view>
      <view class="text-size-25 text-black comment-desc">
        <text>
          {{ comment.content }}
        </text>
      </view>
      <view class="space-between padding-top-bottom-10 text-grey" >
        <view class="more-comment flex-row" >
          <view qq:if="{{comment.len > 0}}" bindtap="MoreComment"
                data-index="{{index}}" class="flex-row">
            <text>{{comment.len}} 条回复</text>
            <text class="cuIcon-right cell-center"></text>
          </view>
        </view>
        <text catch:tap="bindReply" class="text-size-25  border-box" data-index="{{index}}"
            data-commentId="{{comment.id}}" data-nickname="{{comment.nickname}}"
        >回复</text>
      </view>
    </view>
  </view>
</view>

