<!--<navbar title="校园动态"></navbar>-->
<!--<header activekey="activity"></header>-->
<view class="page-container">
  <view class="scroll_box padding-top-bottom-10">
    <scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
      <view class="tag-list {{item.id == active_tag_id?'active-text':'text-black'}}" qq:for="{{tags}}" qq:key>
        <view class="text-size-27" bindtap="TagClick" data-id="{{item.id}}">
          <text class=" {{item.id == active_tag_id?'icon-active cuIcon-tagfill':'cuIcon-tag'}}"></text>
          {{item.name}}
        </view>
      </view>
    </scroll-view>
  </view>
  <view class="order-bar {{order_bar?'':'border-main'}}">
    <view>
      <view class="search-box">
        <input type="text" placeholder="搜索 标题/内容/分类..." value="{{inputVal}}"
               bindinput='bindInput' bindconfirm="toSearch"/>
        <text class="cuIcon-close padding-10" bindtap="SearchBtnClick"
              style="margin-left: auto;margin-right:20rpx;padding: 10rpx;box-sizing: border-box"></text>
      </view>
    </view>
      <view class="text-black" bindtap="FilterBar">
        <text>筛选</text>
        <text class="cuIcon-order margin-left-10"></text>
      </view>
  </view>
  <view class="filter-bar" qq:if="{{order_bar}}">
    <view bindtap="FilterClick" data-key="{{item.key}}" qq:for="{{order_map}}" qq:for-item="item"
          class="margin-left-20">
      <text>{{item.name}}</text>
      <text class="{{order_key == item.key?default_icon:''}}"></text>
    </view>
  </view>
  <view bindtap="PublishClick" class="publish-btn">
    <text class="cuIcon-add"></text>
  </view>
  <view class="activity-list shadow margin-top-10" bindtap="DetailClick" data-id="{{activity.id}}" qq:for="{{activities}}" qq:key qq:for-item="activity">
    <view class="activity-head flex-row">
      <image src="{{activity.anonymous == '1'?'/imgs/source/users/avatar/anonymous1.png':activity.avatarUrl}}"></image>
      <view class="info flex-column">
        <view class="nickname">
          <view class="text-black flex-row">
              {{activity.anonymous == '1'?'匿名用户':activity.nickname}}
          </view>
          <view class="user-tags text-black text-size-25 margin-left-10" qq:for="{{activity.tags}}" qq:key
                qq:for-item="tag">
            <text class="cuIcon-tag margin-right-5"></text>{{tag.name}}
          </view>
        </view>
        <view class="text-size-23 text-grey">{{activity.create_time}}</view>
      </view>
      <view class="share" bindtap="ShareClick">
        <text class="cuIcon-more padding-10 border-box text-grey text-size-30"></text>
      </view>
    </view>
    <view class="desc text-grey" >
      <text>
        {{ activity.content }}
      </text>
    </view>
    <imgcol urls="{{activity.imgs}}" img_length="{{activity.imgs.length}}"></imgcol>
    <view class="activity-foot text-grey">
      <view class="location" qq:if="{{activity.address}}">
        <text class="cuIcon-locationfill"></text>
        <text class="margin-left-10">{{activity.address}}</text>
      </view>
      <view class="auto-left flex-row text-size-23">
        <view>
          <text class="cuIcon-attention  margin-right-10"></text>
          <text>{{activity.view_count}}</text>
        </view>
        <view class="margin-left-10">
          <text class="cuIcon-favor  margin-right-10"></text>
          <text>{{activity.favor_length}}</text>
        </view>
        <view class="margin-left-10">
          <text class="cuIcon-comment margin-right-10"></text>
          <text>{{activity.comment_length}}</text>
        </view>
      </view>
    </view>
  </view>
  <view class="empty" qq:if="{{activities.length == 0}}">
    <image src="/imgs/source/loading.gif"></image>
    <text class="text-grey">此处什么都没有，快来发布吧～</text>
  </view>
</view>
