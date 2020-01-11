<swiper class='swiper' indicator-dots="{{options.indicatorDots}}" autoplay="{{options.autoplay}}"
        circular="{{options.circular}}" vertical="{{options.vertical}}" bindchange="swiperChange"
        interval="{{options.interval}}" duration="{{options.duration}}"
        previous-margin="{{options.previousMargin}}rpx"
        next-margin="{{options.nextMargin}}rpx">
        <swiper-item wx:for="{{swiperData}}" wx:key="index" class="swiper-item {{ index == options.currentSwiper ?
        'swiper-slide-active' : 'swiper-slide-scaleY' }}"
        bindtap="HandlerImageClick" data-url="{{item.url}}">
                <image src="{{ item.src }}" mode="aspectFill" binderror="errImg" class="slide-image"></image>
                        <view class='item-content'>
                                <text class='tags'>{{ item.name }}</text>
                                <view class='title'>{{ item.desc }}</view>
                        </view>
        </swiper-item>
</swiper>
<!--  实现点击选中样式  -->
<view class="dots">
        <block wx:for="{{ swiperData }}" wx:key="index">
                <view class="dot{{index == options.currentSwiper ? ' active' : '' }}"></view>
        </block>
</view>
