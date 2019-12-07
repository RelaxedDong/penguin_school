<view class="img-group flex-row" qq:if="{{img_length}}">
    <view class="box-1 margin-right-5">
        <image qq:if="{{img_length == 1}}" mode="aspectFill"  src="{{urls[0]}}"></image>
        <image qq:else mode="aspectFill"  src="{{urls[0]}}"></image>
    </view>
    <view class="flex-column box-2" qq:if="{{img_length>1}}">
        <image qq:if="{{img_length==2}}" src="{{urls[1]}}" mode="aspectFill" style="height: 380rpx"></image>
        <image qq:else src="{{urls[1]}}" class="margin-bottom-10"  mode="aspectFill"></image>
        <view class="box-3" qq:if="{{img_length==3}}">
            <image src="{{urls[2]}}" mode="aspectFill"></image>
        </view>
        <view class="box-3" qq:if="{{img_length==4}}">
            <image class="margin-right-5" src="{{urls[2]}}" mode="aspectFill"></image>
            <image src="{{urls[3]}}" mode="aspectFill"></image>
        </view>
        <view class="box-3" qq:if="{{img_length==5}}">
            <image class="margin-right-5" src="{{urls[2]}}" mode="aspectFill"></image>
            <image class="margin-right-5" src="{{urls[3]}}" mode="aspectFill"></image>
            <image src="{{urls[4]}}" mode="aspectFill"></image>
        </view>
    </view>
</view>

