<view class="view-container" qq:if="{{votes.length > 0}}">
    <view class="votes-list">
        <!--list begin-->
        <view class="vote-item" qq:for="{{votes}}" qq:for-item="vote" qq:for-index="vote_index">
            <view class="vote-item-hd bottom-line">
                <image src="{{vote.is_private == 1?'/imgs/source/users/avatar/anonymous1.png':vote.avatarUrl}}" lazy-load="true" mode="aspectFill"></image>
                <view class="vote-item-hd-info">
                    <view class="nickname">
                        <text qq:if="{{vote.is_private==1}}">匿名发布</text>
                        <text qq:else>{{vote.nickname}}</text>
                    </view>
                    <view>
                        {{vote.create_time}}
                    </view>
                </view>
                <view class="vote-item-hd-op {{delOpState?'vote-item-hd-op-hover':''}}"  data-index="{{vote_index}}" data-voteid="{{vote.data.id}}" bindtap="voteOP">
                    <i class="fa fa-circle"></i>
                    <i class="fa fa-circle"></i>
                    <i class="fa fa-circle"></i>
                </view>
            </view>
            <view class="vote-item-con">
                <view class="vote-item-con-hd bottom-line">
                    <!--配图 begin-->
                    <view class="vote-imgs {{vote.images.length>=3?'vote-imgs-more':''}}" wx:if="{{vote.images.length>0}}">
                        <view wx:if="{{vote.images.length<3}}"  wx:for="{{vote.images}}" wx:key="{{vote.id}}" class="vote-img-box">
                            <image lazy-load="true" mode="aspectFill" src="{{item}}"
                                   data-urls="{{vote.images}}" data-currenturl="{{item}}" bindtap="previewImage"></image>
                        </view>
                        <view wx:if="{{vote.images.length>=3}}">
                            <swiper indicator-dots="true" indicator-color="#58c9b9" indicator-active-color="#d1b6e1">
                                <block qq:for="{{vote.images}}" qq:key="{{index}}">
                                    <swiper-item>
                                        <image src="{{item}}" lazy-load="true" data-src="{{item}}" data-images="{{vote.images}}" class="slide-image" width="100%" height="auto" mode="aspectFill" bindtap="bindPreviewImage"></image>
                                    </swiper-item>
                                </block>
                            </swiper>
                        </view>
                    </view>
                    <!--配图 end-->
                    <view class="vote-title">{{vote.title}}</view>
                    <view class="vote-des-content" qq:if="{{vote.content}}">{{vote.content}}</view>
                </view>
                    <!--当前用户已投票 begin-->
                    <view qq:for="{{vote.options}}" qq:key qq:for-index="optopn_index">
                        <view class="vote-item-data vote-item-data-voted"
                              data-voteindex="{{vote_index}}"
                              data-optionindex="{{optopn_index}}"
                              data-id="{{vote.id}}" bindtap="VoteAdd">
                            <block qq:if="{{item.vote_user_ids.length>0&&vote.user_is_vote}}">
                                <text class="count-num">（{{item.vote_user_ids.length}}票）</text>{{item.title}}
                                <text class="vote-item-data-percent">{{item.percent}}%</text>
                                <view class="progress-state" style="width:{{item.percent}}%;background-color:{{votedColor[optopn_index]}};"></view>
                            </block>
                            <block qq:else>
                                <text qq:if="{{vote.user_is_vote}}" class="count-num">（{{item.vote_user_ids.length}}票）</text>{{item.title}}
                            </block>
                        </view>
                    </view>
                </view>
            <view class="vote-item-ft top-line">
                <view>
                    <text class="cuIcon-rankfill fa-align-left" style="font-size: 30rpx"
                          bindtap="targetToVoteDetail" data-nickname="{{vote.nickname}}" data-index="{{voteIndex}}" data-src="{{vote.data.id}}"></text>
                    <text style="margin-left: 20rpx;font-size: 25rpx">{{vote.total}}</text>
                </view>
<!--                <i class="fa fa-align-left" bindtap="targetToVoteDetail" data-nickname="{{vote.nickname}}" data-index="{{voteIndex}}" data-src="{{vote.data.id}}"><text>20</text></i>-->
<!--                <button open-type="share" plain="true" data-voteid="{{vote.data.id}}" data-cover="{{vote.images[0]}}" data-title="{{vote.data.title}}" data-nickname="{{vote.nickname}}" bindtap="onShareAppMessage"><i-->
<!--                        class="fa fa-share-square-o"></i></button>-->
                <view class="color-warn end-time" qq:if="{{vote.end_time}}">
                    {{vote.end_time}} 截止
                </view>
            </view>
        </view>
        <!--list end-->
        <view class="no-more-tip" wx:if="{{bottomLineState}}">这是底部，已无更多内容</view>
    </view>
</view>
<view class="empty" qq:else>
    <image src="/imgs/source/loading.gif"></image>
    <text class="text-grey">{{school.name}}暂无投票，快来发布吧</text>
</view>
<view class="feedback-btn">
    <button open-type="feedback">
        <text class="cuIcon-questionfill fa-plus-circle"></text>反馈
    </button>
</view>
<view  class="vote-add-btn" hover-class="vote-item-data-active" bindtap="targetToAdd">
    <text class="cuIcon-roundaddfill fa-plus-circle"></text>创建投票
    <!--        <text>创建投票</text>-->
    <!--        <i class="fa fa-plus-circle"></i>创建投票-->
</view>
