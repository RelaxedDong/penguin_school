<view class="page-container">
    <view class="items-box">
        <view  qq:for="{{categories}}" class="item-choose" bindtap="SelectClick" data-id="{{item.id}}">
            <image src="{{item.face}}"></image>
            <view class="margin-top-20 text-black text-size-23">{{item.name}}</view>
        </view>
    </view>
</view>
