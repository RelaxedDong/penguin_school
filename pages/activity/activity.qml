<!--<navbar title="校园动态"></navbar>-->
<!--<header activekey="activity"></header>-->
<view style="min-height: 220rpx">
  <view class="scroll_box padding-20 fixed">
    <scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;" scroll-left="{{tag_index * screenWidth / 4}}">
      <view class="tag-list {{item.id == active_tag_id?'main-bg-cor active-text':'text-black'}}" qq:for="{{tags}}" qq:key>
        <view class="text-size-27" bindtap="TagClick" data-id="{{item.id}}">
          <text class=" {{item.id == active_tag_id?'text-yellow cuIcon-tagfill':'cuIcon-tag'}}"></text>
          {{item.name}}
        </view>
      </view>
    </scroll-view>
    <view class="order-bar {{order_bar?'':'border-main'}}">
      <view>
        <view class="search-box">
          <text class="cuIcon-search margin-left-20"></text>
          <input type="text" placeholder="搜索 标题/内容/分类..." value="{{inputVal}}"
                 bindinput='bindInput' bindconfirm="toSearch"/>
        </view>
      </view>
      <view class="cell-center filter text-size-25" bindtap="FilterBar">
        <text>筛选</text>
        <text class="cuIcon-order margin-left-10"></text>
      </view>
    </view>
    <view class="filter-bar border-main" qq:if="{{order_bar}}">
      <view bindtap="FilterClick" data-key="{{item.key}}" qq:for="{{order_map}}" qq:for-item="item"
            class="filter-item {{order_key == item.key?'text-blue':'text-grey'}}">
        <text class="cuIcon-{{item.tag}} margin-right-10"></text>
        <text>{{item.name}}</text>
        <text class="{{order_key == item.key?default_icon:''}}"></text>
      </view>
    </view>
  </view>
</view>
<view class="">
  <view bindtap="PublishClick" class="publish-btn">
    <text class="cuIcon-add"></text>
  </view>
  <view bindtouchstart="touchStart" class="margin-top-10" bindtap="DetailClick" data-id="{{activity.id}}" qq:for="{{activities}}" qq:key qq:for-item="activity">
      <view qq:if="{{index%5 == 2}}"  class="advertise">
          <ad unit-id="d78afa38065c87c7805996973a589d6a"></ad>
      </view>
      <view class="activity-list padding-10 shadow">
          <view class="activity-head flex-row">
              <image src="{{activity.anonymous == '1'?'/imgs/source/users/avatar/anonymous1.png':activity.avatarUrl}}"></image>
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
              <view class="auto-left margin-right-5 location align-items" qq:if="{{activity.address}}">
                  <text class="cuIcon-locationfill"></text><text class="margin-left-5 text-grey">{{activity.address}}</text>
              </view>
          </view>
          <view class="desc text-grey column-center padding-top-bottom-20" >
              {{ activity.content }}
          </view>
          <imgcol urls="{{activity.imgs}}" img_length="{{activity.imgs.length}}"></imgcol>
          <view class="activity-foot text-grey {{activity.tags_len>0?'space-between':''}}">
              <view class="text-size-23 text-blue-active" qq:for="{{activity.tags}}" qq:key
                    qq:for-item="tag" catch:tap="TagClick" data-id="{{tag.id}}">
                  <view>#{{tag.name}}</view>
              </view>
              <view class="flex-row padding-10 {{activity.tags_len>0?'auto-left':'space-between'}}">
                  <view>
                      <text class="cuIcon-attention  margin-right-10"></text>
                      <text>{{activity.view_count}}</text>
                  </view>
                  <view class="margin-left-20">
                      <text class="cuIcon-comment margin-right-10"></text>
                      <text>{{activity.comment_count}}</text>
                  </view>
                  <view class="margin-left-20">
                      <text class="cuIcon-like margin-right-10"></text>
                      <text>{{activity.collect_count}}</text>
                  </view>
              </view>
          </view>
      </view>
  </view>
  <view class='text-center padding-20 text-grey text-size-23' wx:if="{{noMore}}">
    <text>没有更多了</text>
  </view>
  <view class="empty" qq:if="{{activities.length == 0}}">
    <image src="/imgs/source/loading.gif"></image>
    <text class="text-grey">此处什么都没有，快来发布吧～</text>
  </view>
</view>
