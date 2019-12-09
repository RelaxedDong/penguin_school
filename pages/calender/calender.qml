<view class="page-container">
    <view class="flex-row calender shadow">
        <image src="{{item}}" qq:for="{{calenders}}"
               qq:key bindtap="HandleImgClick" data-urls="{{calenders}}" data-currenturl="{{item}}"></image>
    </view>
    <view class="law-calender shadow">
        <view class="title">
            2020年公休放假安排
        </view>
        <view class="law-item" qq:for="{{law_date}}">
            <view class="data-name">
                <text class="cuIcon-calendar margin-right-10 text-blue"></text>{{item.name}}
            </view>
            <view>{{item.time}}</view>
            <view>{{item.manage}}</view>
            <view>
                <text class="cuIcon-timefill text-yellow"></text>
                {{item.rex}}</view>
        </view>
    </view>
</view>
<view class="empty" qq:if="{{calenders.length == 0}}">
    <image src="/imgs/source/loading.gif"></image>
    <text class="text-grey">此处空空，快来发布吧</text>
</view>

