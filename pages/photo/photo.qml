<navbar title="校园美景"></navbar>
<header activekey="photo"></header>
<view bindtap="PublishClick" class="publish-btn">
    <text class="cuIcon-picfill"></text>
</view>
<view class='case-page'>
    <view class='list-masonry'>
        <view class='item-masonry' qq:for="{{photoes}}" qq:key>
            <view style="position: relative"  bindtap="HandleImgClick" data-id="{{item.id}}">
                <image class="image" src='{{item.imgs[0]}}'
                       mode='widthFix'></image>
                <view class="img-count" >
                    {{item.imgs.length}} 图
                </view>
            </view>
            <view class="padding-10 border-box">
                <view qq:if="{{item.address}}" class="text-size-25 margin-top-10 text-black column-center flex-row">
                    <text class="cuIcon-locationfill border-box"></text>
                    <text class="margin-left-5">{{item.address}}</text>
                </view>
                <view class="text-grey photo-desc">
                    {{item.content}}
                </view>
                <view class="activity-head flex-row margin-10 text-size-23 ">
                    <image class='user-img' src='{{item.avatarUrl}}'></image>
                    <view class="flex-column margin-left-10">
                        <view class="text-black flex-row text-size-25">
                            {{item.nickname}}
                        </view>
                        <view class="text-size-25 text-grey">{{item.create_time}}</view>
                    </view>
                    <view class="auto-left column-center">
                        <view class="favor border-box" bindtap="FavorClick" data-id="{{item.id}}"
                        data-count="{{item.favor_count}}" data-index="{{index}}">
                            <text class="{{item.status=='favor'?'text-red cuIcon-likefill':'cuIcon-like'}}"></text>
                            <text class="margin-left-10">{{item.favor_count}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</view>
