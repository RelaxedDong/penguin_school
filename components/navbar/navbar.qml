<view class='status-bar'>
        <view class='goBack' bindtap='toMyHome' style="padding-top:{{bar_Height}}px;"  hidden='{{show_bol}}'>
                       <text class="cuIcon-my"></text>
        </view>
        <view class="tabar {{my_class ? 'tabar2':''}}" style="padding-top:{{bar_Height}}px;">
                <view bindtap="SchoolChoose">
                        <text qq:if="{{is_home}}" class="cuIcon-locationfill"></text>
                        <text class="red margin-left-10">{{title}}</text>
                </view>
        </view>
</view>

