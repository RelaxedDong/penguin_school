<view class="tabpanel-list where-filter text-sm" style="padding-top:{{widnowH <=568 ?bar_Height + 40:bar_Height + 45}}px;">
    <scroll-view class="scroll-view_x scroll_box" scroll-x style="width: auto;overflow:hidden;">
        <view  class="tab-item" data-activeKey="home" bindtap="changeTabs">
            <text class="{{activekey=='home'?'active-text':'text-grey'}}">首页</text>
        </view>
        <view  class="tab-item" data-activeKey="activity" bindtap="changeTabs">
            <text class="{{activekey=='activity'?'active-text':'text-grey'}}">校园动态</text>
        </view>
        <view class="tab-item" data-activeKey="second" bindtap="changeTabs">
            <text class="{{activekey=='second'?'active-text':'text-grey'}}">跳骚市场</text>
        </view>
        <view class="tab-item"  data-activeKey="photo" bindtap="changeTabs">
            <text class="{{activekey=='photo'?'active-text':'text-grey'}}">校园美景</text>
        </view>
<!--        <view class="tab-item" data-activeKey="lost" bindtap="changeTabs">-->
<!--            <text class="{{activekey=='lost'?'active-text':'text-grey'}}">失物招领</text>-->
<!--        </view>-->
        <view class="tab-item"  data-activeKey="travel" bindtap="changeTabs">
            <text class="{{activekey=='travel'?'active-text':'text-grey'}}">抱团旅游</text>
        </view>
        <view class="tab-item"  data-activeKey="food" bindtap="changeTabs">
            <text class="{{activekey=='food'?'active-text':'text-grey'}}">店铺/周边美食</text>
        </view>
    </scroll-view>
</view>
