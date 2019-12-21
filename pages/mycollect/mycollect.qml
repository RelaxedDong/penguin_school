<view class="page-container">
    <view class="header-choose flex-row border-main">
        <view bindtap="BoardClick" data-key="collect" class="{{active_key=='collect'?'avtive_board':''}}">我的收藏</view>
        <view bindtap="BoardClick" data-key="publish" class="{{active_key=='publish'?'avtive_board':''}}">我的发布</view>
    </view>
    <view class="filter-list flex-row">
        <view bindtap="FilterClick" data-key="activity"  class="{{filter_key=='activity'?'active-filter':'simple-filter'}}">动态</view>
        <view qq:if="{{active_key=='publish'}}" bindtap="FilterClick" data-key="second"  class="{{filter_key=='second'?'active-filter':'simple-filter'}}">二手</view>
        <view bindtap="FilterClick" data-key="gallary"  class="{{filter_key=='gallary'?'active-filter':'simple-filter'}}">相册</view>
    </view>
    <view class="item-list" qq:for="{{user_items}}" qq:key bindtap="Todetail" data-id="{{item.id}}">
        <view class="item border-main">
            <view class="bottom-group flex-row">
                <view class="flex-row margin-top-10">
                    <view class="avatar-url">
                        <view class="small-avatar" qq:if="{{active_key=='publish'}}">
                            <open-data type="userAvatarUrl"></open-data>
                        </view>
                        <image qq:else src="{{item.anonymous == '1'?'/imgs/source/users/avatar/anonymous1.png':item.avatarUrl}}"></image>
                    </view>
                    <view class="margin-left-20">
                        <view>{{item.create_time}}</view>
                        <open-data qq:if="{{active_key=='publish'}}" type="userNickName" lang="zh_CN"></open-data>
                        <view qq:else>
                            <text qq:if="{{item.anonymous == '1'}}">匿名用户</text>
                            <text qq:else>{{item.nickname}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="item-title">
                {{item.content}}
            </view>
            <view class="scroll_box">
                <scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
                    <view class="img-box" qq:for="{{item.imgs}}"
                          qq:for-item="image"
                          qq:key bindtap="HandleImgClick" data-urls="{{item.imgs}}" data-currenturl="{{image}}">
                        <image src="{{image}}" class="item_book_img" mode="aspectFill"></image>
                    </view>
                </scroll-view>
            </view>
            <view class="flex-row text-size-25 text-grey">
                <view class="auto-left">
                    <view qq:if="{{type=='gallary'}}">
                        <text class="cuIcon-favorfill text-yellow"></text>
                        <text class="margin-left-10" >{{item.favor_count}}</text>
                    </view>
                    <view class="margin-left-20">
                        <text class="cuIcon-attention"></text>
                        <text class="margin-left-10">{{item.view_count}}</text>
                    </view>
                    <view qq:if="{{active_key === 'publish'}}" class="margin-left-20 text-red" data-id="{{item.id}}"  data-index="{{index}}"
                          catch:tap="HandleDelete" data-type="{{type}}">
                        <text class="cuIcon-deletefill"></text>
                        <text class="margin-left-10">删除</text>
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
