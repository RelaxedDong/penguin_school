<!--商品幻灯片-->
<swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" class="banner" duration="{{duration}}" circular="{{duration}}">
    <block qq:for="{{second.imgs}}" qq:key="goods_info" qq:for-item="image">
        <swiper-item>
            <image src="{{image}}" mode="aspectFill" class="slide-image"  data-urls="{{second.imgs}}" data-currenturl="{{image}}" bindtap="previewImage"></image>
        </swiper-item>
    </block>
</swiper>
<view class="page-container footer-bottom">
    <view class="header padding-top-bottom-20 space-between border-main">
        <view class="price">¥ {{second.price}}</view>
        <view class="text-grey text-size-25 auto-left" qq:if="{{second.old_price}}">
            <text>原价： </text>
            <text class="raw_price">¥ {{second.old_price}}</text>
        </view>
    </view>
    <view class="text-size-30 item">
        {{second.title}}
    </view>
    <view class="text-grey item good-desc">
        <text>{{second.content}}</text>
    </view>
<!--    <view class="margin-top-20">-->
<!--        <view class="text-size-25 margin-right- text-grey">20人收藏了</view>-->
<!--    </view>-->
<!--    <view class="flex-row margin-top-10">-->
<!--        <image wx:for="{{goods_img}}" wx:key  style='transform:translateX({{-index*30}}rpx)' class='myface' src='{{item}}' mode='aspectFill'></image>-->
<!--    </view>-->
    <view class="space-between text-size-25 item  border-main">
        <view class="location item" qq:if="{{second.address}}">
            <text class="cuIcon-locationfill"></text>
            <text class="margin-left-10">{{second.address}}</text>
        </view>
        <view class="text-size-25 item">
            <text class="cuIcon-newshotfill text-yellow"></text>
            <text class="text-grey margin-left-10">{{second.name}}</text>
        </view>
    </view>
    <view class="activity-head flex-row item">
        <image class='user-img' src='{{second.avatarUrl}}'></image>
        <view class="info flex-column">
            <view class="nickname">
                <view class="text-black flex-row">
                    {{second.nickname}}
                </view>
            </view>
            <view class="text-size-25 text-grey">{{second.create_time}}</view>
        </view>
    </view>
</view>
<view class="footer text-grey">
    <view  class="text-center margin-left-20">
        <button open-type="share" class="cu-button">
            <text class="cuIcon-share"></text>
            <text class="text-size-25 margin-top-20">分享</text>
        </button>
    </view>
<!--    <view  class="flex-column text-center">-->
<!--        <text class="cuIcon-favor"></text>-->
<!--        <text class="text-size-25">收藏</text>-->
<!--    </view>-->
        <view  class="text-center flex-column">
                <text class="cuIcon-attention"></text>
                <text class="text-size-25 margin-top-10">查看：{{second.view_count}}</text>
        </view>
    <view>
        <button class="add-cart-btn" animation="{{animation}}" bindaddfriend="bindaddfrienResult" open-type="addFriend" open-id="{{second.openid}}">立即联系</button>
    </view>
</view>

