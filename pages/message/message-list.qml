<view class="card-container margin-top-20">
    <view class="flex-column padding-top-bottom-20 border-main"
          qq:for="{{messages}}" qq:key qq:for-item="message"
          data-id="{{message.content.detail_id}}"
          data-target="{{message.content.board}}"
          bindtap="HandleClick"
        >
        <view class="activity-head flex-row">
            <image src="{{message.content.avatarUrl}}"></image>
            <view class="info flex-column">
                <view class="nickname">
                    <view class="text-black">
                        {{message.content.nickname}}
                    </view>
                </view>
                <view class="text-size-23 text-grey">
                    <view>{{message.create_time}}</view>
                </view>
            </view>
<!--            <view class="auto-left margin-right-5 location align-items" qq:if="{{message.status =='not_read'}}">-->
<!--               <text class="margin-left-5 main-bg-cor border-radius-10 padding-10">未读</text>-->
<!--            </view>-->
        </view>
        <view class="desc text-grey column-center msg-desc" >
            {{message.content.content}}
        </view>
    </view>
    <view class="empty" qq:if="{{messages.length == 0}}">
        <image src="/imgs/source/loading.gif"></image>
        <text class="text-grey">此处空空...</text>
    </view>
</view>
