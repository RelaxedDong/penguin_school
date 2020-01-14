<!--<view bindtap="PublishClick" class="publish-btn">-->
<!--    <text class="cuIcon-picfill"></text>-->
<!--</view>-->
<!--<view class='case-page'>-->
<!--    <view class='list-masonry'>-->
<!--        <view class='item-masonry shadow' qq:for="{{photoes}}" qq:key>-->
<!--            <view style="position: relative" class="face-height"  bindtap="HandleImgClick" data-id="{{item.id}}">-->
<!--                <image class="image" src='{{item.imgs[0]}}'-->
<!--                       mode='widthFix'></image>-->
<!--                <view class="img-count" >-->
<!--                    {{item.imgs.length}} 图-->
<!--                </view>-->
<!--            </view>-->
<!--            <view class="border-box padding-10 border-box">-->
<!--                <view qq:if="{{item.address}}" class="text-size-25 margin-top-10 text-black column-center flex-row">-->
<!--                    <text class="cuIcon-locationfill border-box"></text>-->
<!--                    <text class="margin-left-5">{{item.address}}</text>-->
<!--                </view>-->
<!--                <view class="text-grey photo-desc">-->
<!--                    {{item.content}}-->
<!--                </view>-->
<!--                <view class="activity-head flex-row text-size-23 ">-->
<!--                    <image class='user-img' src='{{item.avatarUrl}}'></image>-->
<!--                    <view class="flex-column margin-left-10">-->
<!--                        <view class="text-black flex-row text-size-25">-->
<!--                            {{item.nickname}}-->
<!--                        </view>-->
<!--                        <view class="text-size-25 text-grey">{{item.create_time}}</view>-->
<!--                    </view>-->
<!--                    <view class="auto-left column-center margin-right-5">-->
<!--                        <view class="favor border-box" bindtap="FavorClick" data-id="{{item.id}}"-->
<!--                        data-count="{{item.favor_count}}" data-index="{{index}}">-->
<!--                            <text class="{{item.status=='favor'?'text-red cuIcon-likefill':'cuIcon-like'}}"></text>-->
<!--                            <text class="margin-left-10">{{item.favor_count}}</text>-->
<!--                        </view>-->
<!--                    </view>-->
<!--                </view>-->
<!--            </view>-->

<!--        </view>-->
<!--    </view>-->
<!--</view>-->
<!--<view class="empty" qq:if="{{photoes.length == 0}}">-->
<!--    <image src="/imgs/source/loading.gif"></image>-->
<!--    <text class="text-grey">此处空空，快来发布吧</text>-->
<!--</view>-->
<!--建议给当前页面添加一个白色遮罩层 外加加载动画 数据加载完成在关闭 避免网速过慢加载图过慢造成页面使用感不好-->
<scroll-view
        scroll-y="true"
        bindscrolltolower="lower"
        lower-threshold="100"
        style="height:100%;">
    <view class="waterfall">
        <view class="view" style="margin-right:20rpx">
            <view wx:for="{{Arr1}}" wx:key class="imgbox">
                <view style="position: relative" class="face-height"  bindtap="HandleImgClick" data-id="{{item.id}}">
                    <image class="image" src='{{item.imgs[0]}}'
                           mode='widthFix'></image>
                    <view class="img-count" >
                        {{item.imgs.length}} 图
                    </view>
                </view>
                <view class="border-box padding-10 border-box">
                    <view qq:if="{{item.address}}" class="text-size-25 margin-top-10 text-black column-center flex-row">
                        <text class="cuIcon-locationfill border-box"></text>
                        <text class="margin-left-5">{{item.address}}</text>
                    </view>
                    <view class="text-grey photo-desc">
                        {{item.content}}
                    </view>
                    <view class="activity-head flex-row text-size-23 ">
                        <image class='user-img' src='{{item.avatarUrl}}'></image>
                        <view class="flex-column margin-left-10">
                            <view class="text-black flex-row text-size-25">
                                {{item.nickname}}
                            </view>
                            <view class="text-size-25 text-grey">{{item.create_time}}</view>
                        </view>
                        <view class="auto-left column-center margin-right-5">
                            <view class="favor border-box" bindtap="FavorClick" data-id="{{item.id}}"
                                  data-colum="arr1"
                                  data-count="{{item.favor_count}}" data-index="{{index}}">
                                <text class="{{item.status=='favor'?'text-red cuIcon-likefill':'cuIcon-like'}}"></text>
                                <text class="margin-left-10">{{item.favor_count}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="view">
            <view wx:for="{{Arr2}}" wx:key class="imgbox">
                <view style="position: relative" class="face-height"  bindtap="HandleImgClick" data-id="{{item.id}}">
                    <image class="image" src='{{item.imgs[0]}}'
                           mode='widthFix'></image>
                    <view class="img-count" >
                        {{item.imgs.length}} 图
                    </view>
                </view>
                <view class="border-box padding-10 border-box">
                    <view qq:if="{{item.address}}" class="text-size-25 margin-top-10 text-black column-center flex-row">
                        <text class="cuIcon-locationfill border-box"></text>
                        <text class="margin-left-5">{{item.address}}</text>
                    </view>
                    <view class="text-grey photo-desc">
                        {{item.content}}
                    </view>
                    <view class="activity-head flex-row text-size-23 ">
                        <image class='user-img' src='{{item.avatarUrl}}'></image>
                        <view class="flex-column margin-left-10">
                            <view class="text-black flex-row text-size-25">
                                {{item.nickname}}
                            </view>
                            <view class="text-size-25 text-grey">{{item.create_time}}</view>
                        </view>
                        <view class="auto-left column-center margin-right-5">
                            <view class="favor border-box" bindtap="FavorClick" data-id="{{item.id}}"
                                  data-colum="arr2"
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
</scroll-view>
<view class="empty" qq:if="{{Arr1.length == 0}}">
    <image src="/imgs/source/loading.gif"></image>
    <text class="text-grey">此处空空，快来发布吧</text>
</view>
<view bindtap="PublishClick" class="publish-btn">
    <text class="cuIcon-picfill"></text>
</view>
