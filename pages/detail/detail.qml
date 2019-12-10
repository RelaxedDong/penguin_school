<view class="aui-tour-content">
  <view class="avatar">
    <image class="img-flex" src="{{activity.anonymous == '1'?'/imgs/source/users/avatar/anonymous1.png':activity.avatarUrl}}"></image>
    <button qq:if="{{activity.can_add_friend == '1'}}" class="add-btn main-bg-cor" bindaddfriend="bindaddfrienResult" open-type="addFriend" open-id="{{activity.openid}}">+ 好友</button>
  </view>
</view>
<view class="page-container">
  <view class="detail-title">
    {{activity.title}}
  </view>
  <view class="text-desc">
      <text>
        {{activity.content}}
      </text>
  </view>
  <view class="scroll_box margin-top-20 margin-bottom-10">
    <scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
      <view class="img-box" qq:for="{{activity.imgs}}" qq:key bindtap="HandleImgClick" data-urls="{{activity.imgs}}" data-currenturl="{{item}}">
        <image src="{{item}}" class="item_book_img" mode="aspectFill"></image>
      </view>
    </scroll-view>
  </view>
  <view class="icon-row flex-row text-black ">
    <view>
      <view qq:for="{{activity.tags}}">
        <text class="cuIcon-tag margin-right-10"></text>{{item.name}}
      </view>
      <button open-type="share" class="cell-center qq-zone-share">
        <view  class="flex-row">
          <image src="/imgs/source/qq-zone.png" class="icon-img"></image>
        </view>
      </button>
    </view>
  </view>
  <view class="space-between location padding-top-bottom-20">
    <view qq:if="{{activity.address}}">
      <text class="cuIcon-locationfill"></text>
      <text class="margin-left-10">{{activity.address}}</text>
    </view>
    <view>
      <text>{{activity.create_time}}</text>
    </view>
  </view>
  <view class="space-between border-main padding-top-bottom-20">
    <view class="flex-row">
      <view class="talk" bindtap="bindReply">评论</view>
      <view class="QQZone" bindtap="QQZonePublish">生成说说</view>
    </view>
    <view class="auto-left text-grey text-size-30">
      <view bindtap="LickClick" data-id="{{activity.id}}">
        <text class=" {{favor?'text-yellow cuIcon-favorfill':'cuIcon-favor'}} margin-right-10"></text>{{favor_count}}
      </view>
      <view class="margin-left-10">
        <text class="cuIcon-comment margin-right-10"></text>{{comments.length}}
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
              placeholder="回复 {{releaseName}}"></textarea>
    <view class="submit" bindtap="HandleSend">发送</view>
  </view>
  <view class="padding-top-bottom-200">
    <view class="border-main"  qq:for="{{comments}}" qq:key qq:for-item="comment">
      <view class="activity-head flex-row margin-top-10">
        <image src="{{comment.avatarUrl}}"></image>
        <view class="info flex-column">
          <view class="text-black text-size-30">{{comment.nickname}}</view>
          <view class="text-size-25 text-grey">{{comment.create_time}}</view>
        </view>
        <view class="share" qq:if="{{user_id == comment.publisher_id}}" data-index="{{index}}" bindtap="DeleteComment"
              data-id="{{comment.comment_id}}" data-act="{{activity.id}}">
          <text class="cuIcon-deletefill text-yellow padding-10 border-box text-size-30"></text>
        </view>
      </view>
      <view class="text-size-25 text-black comment-desc">
        <text>
          {{ comment.content }}
        </text>
      </view>
    </view>
  </view>
  <view class="empty" qq:if="{{comments.length == 0}}">
    <image src="/imgs/source/loading.gif"></image>
    <text class="text-grey">沙发是空的，赶紧来抢！</text>
  </view>
</view>

