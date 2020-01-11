<view class="page-container">
    <ad unit-id="d78afa38065c87c7805996973a589d6a"></ad>
    <view class="item-choose margin-top-20">
        <view class="search-box">
            <text class="cuIcon-search margin-left-20"></text>
            <input type="text" placeholder="请输发布地址" value="{{input}}"
                   bindinput='getsuggest' bindconfirm="search"/>
        </view>
        <view qq:if="{{active_address}}"
              class="location padding-top-bottom-20 text-size-23"
              style="text-align: left"
              bindtap="ClearAddress"
        >
            <text class="margin-right-20">当前选择：</text>
            <text class="cuIcon-locationfill"></text>
            <text class="margin-left-10">{{active_address}}</text>
        </view>
        <view class="flex-column text-center padding-top-bottom-20" qq:if="{{address_list.length > 0}}">
            <view  qq:for="{{address_list}}" qq:key qq:key
                   class="items text-size-27 border-main padding-10"
                   bindtap="AddressClick" data-address="{{item}}"
            ><text qq:if="{{item == active_address}}" class="cuIcon-locationfill text-size-30 text-yellow"></text>
                {{item}}
            </view>
        </view>
    </view>
</view>
