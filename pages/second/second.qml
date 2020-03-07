<swiper class="swiper-box " circular="true" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
    <block wx:for="{{imgUrls}}" wx:for-index="index">
        <swiper-item>
            <image src="{{item}}" class="slide-image" mode="aspectFill"/>
        </swiper-item>
    </block>
</swiper>
<view class='layout_horizontal margin-top-20'>
    <view style='flex:1' bindtap="SelectClick" data-id="1">
            <image class='img' src='/imgs/tem/phone.png'></image>
    </view>
    <view style='flex:1;' bindtap="SelectClick" data-id="4">
            <image class='img' src='/imgs/tem/book.png'></image>
    </view>
    <view style='flex:1;' bindtap="SelectClick" data-id="3">
            <image class='img' src='/imgs/tem/computer.png'></image>
    </view>
    <view style='flex:1'>
        <navigator url='/pages/category/category'>
        <image class='img' src='/imgs/tem/more.png'></image>
        </navigator>
    </view>
</view>

<view class='layout_horizontal'>
    <view style='flex:1' class='classifition' bindtap="SelectClick" data-id="1">
        <text>手机</text>
    </view>
    <view style='flex:1' class='classifition' bindtap="SelectClick" data-id="4">
        <text>二手书</text>
    </view>
    <view style='flex:1' class='classifition' bindtap="SelectClick" data-id="3">
        <text>电脑</text>
    </view>
    <view style='flex:1' class='classifition'>
        <text>更多</text>
    </view>
</view>

<view class='layout_horizontal'>
    <button bindtap='SelectClickOrder' data-key="create_time" class="title {{order_key=='create_time'?'active':''}}" style='flex:1'>最新</button>
    <button bindtap='SelectClickOrder' data-key="view_count"class="title {{order_key=='view_count'?'active':''}}"   style='flex:1'>热门</button>
</view>

<view bindtap="PublishClick" class="publish-btn">
    <text class="cuIcon-add"></text>
</view>
<view class="page-container">
    <view  qq:for="{{second_goods}}" data-id="{{item.id}}" class="border-main padding-10" bindtap="SecondDetail">
        <view class="activity-head flex-row">
            <image class='user-img' src='{{item.avatarUrl}}'></image>
            <view class="info flex-column">
                <view class="nickname">
                    <view class="text-black flex-row">
                        {{item.nickname}}
                    </view>
                </view>
                <view class="text-size-25 text-grey">{{item.create_time}}</view>
            </view>
            <view class="share">
                <text class="cuIcon-more padding-10 border-box text-grey text-size-30"></text>
            </view>
        </view>
        <view class="text-size-25 text-black" >
            <text>
                {{ item.content }}
            </text>
        </view>
        <view class="img-9-box">
            <view class="img-box-second">
                <image qq:for="{{item.imgs}}" qq:key src="{{item}}" class="item_book_img" mode="aspectFill"></image>
            </view>
        </view>
        <view class="activity-foot space-between text-grey">
                <view>
                    <text class="cuIcon-newshotfill text-yellow"></text>
                    <text class="margin-left-10">{{item.name}}</text>
                </view>
                <view>
                    <text class="cuIcon-attention"></text>
                    <text class="margin-left-10">{{item.view_count}}</text>
                </view>
        </view>
    </view>
    <view class="empty" qq:if="{{second_goods.length == 0}}">
        <image src="/imgs/source/none.png"></image>
        <text class="text-grey">二手闲置快速赚钱，快来发布吧</text>
    </view>
</view>


