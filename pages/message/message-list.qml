<!--<ad unit-id="07455d6724a14cd74e00a52e5fe972fe" class="margin-top-20" type="feeds"></ad>-->
<view class="card-container margin-top-20">
    <view class="flex-column padding-top-bottom-20 border-main"
          qq:for="{{messages}}" qq:key qq:for-item="message"
          data-id="{{message.content.detail_id}}"
          data-curid="{{message.id}}"
          data-target="{{message.content.board}}"
          data-index="{{index}}"
          bindtap="HandleClick"
        >
        <view class="activity-head flex-row">
            <image src="{{message.content.avatarUrl}}"></image>
            <view class="info flex-column margin-left-20 text-size-25">
                <view class="nickname">
                    <view class="text-black">
                        {{message.content.nickname}}
                    </view>
                </view>
                <view class="text-size-23 text-grey">
                    <view>{{message.create_time}}</view>
                </view>
            </view>
            <view class="auto-left margin-right-5 location align-items" qq:if="{{message.status =='not_read'}}">
                <text class="cuIcon-title text-red text-size-30"></text>
            </view>
        </view>
        <view class="desc text-grey text-blue column-center msg-desc" >
            《 {{message.content.content}} 》
        </view>
    </view>
    <view class="empty" qq:if="{{messages.length == 0}}">
        <image src="/imgs/source/none.png"></image>
        <text class="text-grey">此处空空...</text>
    </view>
</view>
