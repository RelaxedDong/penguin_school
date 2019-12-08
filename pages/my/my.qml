<view class="template">
    <view class="header">
        <view class="flex-row">
            <view class="outer-img">
                <view class="center-avatar">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
<!--                <image src="/imgs/source/gw.png"></image>-->
            </view>
            <view class="nickname-box">
               <open-data type="userNickName"></open-data>
            </view>
        </view>
    </view>
    <view class="waveWrapper waveAnimation">
        <view class="waveWrapperInner bgTop">
            <view class="wave waveTop"
                  style="background-image:url('https://img-blog.csdnimg.cn/20190220102330961.png')"></view>
        </view>
        <view class="waveWrapperInner bgMiddle">
            <view class="wave waveMiddle"
                  style="background-image:url('https://img-blog.csdnimg.cn/20190220102330961.png')"></view>
        </view>
        <view class="waveWrapperInner bgBottom">
            <view class="wave waveBottom"
                  style="background-image:url('https://img-blog.csdnimg.cn/20190220102330961.png')"></view>
        </view>
    </view>
    <view class="home_grids">
        <block wx:for="{{grid_list}}" wx:key="item.name">
            <view bindtap="itemClick" data-key="{{item.key}}" data-url="{{item.route}}" class="home_grid">
                <image src="{{item.url}}" class="home_icon"></image>
                <view class="margin-top-10">{{item.name}}</view>
            </view>
        </block>
    </view>
    <view class="choose-items page-container">
        <!--    <view class="space-between choose-item">-->
        <!--        <view>-->
        <!--            <text class="cuIcon-my text-size-30"></text>-->
        <!--            <text class="margin-left-20 text-size-25">编辑信息</text>-->
        <!--        </view>-->
        <!--        <view>-->
        <!--            <text class="cuIcon-right margin-right-10"></text>-->
        <!--        </view>-->
        <!--    </view>-->
<!--        <button class="space-between choose-item" open-type="openGroupProfile" group-id="428434143">-->
<!--            <view>-->
<!--                <button class="item-button">-->
<!--                    <text class="cuIcon-group icon-style"></text>-->
<!--                    <text class="text-size-25">添加群聊</text>-->
<!--                </button>-->
<!--            </view>-->
<!--            <view class="right-arr">-->
<!--                <text class="cuIcon-right margin-right-10"></text>-->
<!--            </view>-->
<!--        </button>-->
        <button class="space-between choose-item" open-type="feedback">
            <view>
                <button class="item-button">
                    <text class="cuIcon-servicefill icon-style"></text>
                    <text class="text-size-25">吐个槽</text>
                </button>
            </view>
            <view class="right-arr">
                <text class="cuIcon-right margin-right-10"></text>
            </view>
        </button>
        <button class="space-between choose-item"  open-type="addFriend" open-id="{{admin_openid}}">
            <view>
                <button class="item-button">
                    <text class="cuIcon-markfill icon-style"></text>
                    <text class="text-size-25">联系我们</text>
                </button>
            </view>
            <view class="right-arr">
                <text class="cuIcon-right margin-right-10"></text>
            </view>
        </button>
        <button class="space-between choose-item"  open-type="addFriend" open-id="{{admin_openid}}">
            <view>
                <button class="item-button">
                    <text class="cuIcon-group_fill icon-style"></text>
                    <text class="text-size-25">校园加入</text>
                </button>
            </view>
            <view class="right-arr">
                <text class="cuIcon-right margin-right-10"></text>
            </view>
        </button>
    </view>
</view>
