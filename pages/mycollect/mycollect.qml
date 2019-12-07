<view class="page-container">
    <view class="header-choose flex-row border-main">
        <view bindtap="BoardClick" data-key="collect" class="{{active_key=='collect'?'avtive_board':''}}">我的收藏</view>
        <view bindtap="BoardClick" data-key="publish" class="{{active_key=='publish'?'avtive_board':''}}">我的发布</view>
    </view>
    <view class="filter-list flex-row">
        <view bindtap="FilterClick" data-key="activity"  class="{{filter_key=='activity'?'active-filter':'simple-filter'}}">动态</view>
        <view qq:if="{{active_key=='publish'}}" bindtap="FilterClick" data-key="second"  class="{{filter_key=='second'?'active-filter':'simple-filter'}}">二手</view>
        <view bindtap="FilterClick" data-key="photo"  class="{{filter_key=='photo'?'active-filter':'simple-filter'}}">相册</view>
    </view>
    <view class="item-list" qq:for="{{user_items}}" qq:key bindtap="Todetail" data-id="{{item.id}}">
        <view class="item border-main">
            <view class="item-title">
                {{item.content}}
            </view>
            <view class="image-group flex-row">
                <image qq:for="{{item.imgs}}"  qq:key qq:for-item="image" src="{{image}}"></image>
            </view>
            <view class="bottom-group flex-row">
                <view class="flex-row margin-top-10">
                    <view class="avatar-url">
                        <view class="small-avatar" qq:if="{{active_key=='publish'}}">
                            <open-data type="userAvatarUrl"></open-data>
                        </view>
                        <image qq:else src="{{item.avatarUrl}}"></image>
                    </view>
                    <view class="margin-left-20">
                        <view>{{item.create_time}}</view>
                        <open-data qq:if="{{active_key=='publish'}}" type="userNickName" lang="zh_CN"></open-data>
                        <view qq:else>{{item.nickname}}</view>
                    </view>
                </view>
                <view class="flex-row">
                    <view qq:if="{{type!=='second'}}">
                        <text class="cuIcon-favorfill text-yellow"></text>
                        <text class="margin-left-10" qq:if="{{type=='photo'}}">{{item.favor_count}}</text>
                        <text class="margin-left-10" qq:else>{{item.favor_length}}</text>
                    </view>
                    <view class="margin-left-20">
                        <text class="cuIcon-attention"></text>
                        <text class="margin-left-10">{{item.view_count}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
    <view class="empty" qq:if="{{user_items.length == 0}}">
        <image src="/imgs/source/loading.gif"></image>
        <text class="text-grey">空空如也，快来发吧～</text>
    </view>
</view>
