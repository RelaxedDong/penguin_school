<!--index.wxml-->
<wxs module="filter" src="../../../utils/numbertofix.wxs"></wxs>
<view class="view-container">
<!--    <view class="votes-list-tab">-->
<!--        <view class="tab {{filterName==='all'?'active':''}}" data-src="all" bindtap="getVoteListByType" hover-class="vote-item-data-active">全部</view>-->
<!--        <view class="tab {{filterName==='popular'?'active':''}}" data-src="popular" bindtap="getVoteListByType" hover-class="vote-item-data-active">最热</view>-->
<!--        <view class="tab {{filterName==='mine'?'active':''}}" data-src="mine" bindtap="getVoteListByType" hover-class="vote-item-data-active">我的</view>-->
<!--    </view>-->
    <view class="votes-list">
        <view class="no-vote-tip" qq:if="{{votes.length===0}}">
            <view class="tips-icon tips-icon-res"></view>
            <button type="primary" hover-class="none" bindtap="targetToAdd">创建投票</button>
        </view>
        <!--list begin-->
        <view class="vote-item" qq:for="{{votes}}" wx:for-item="vote" wx:for-index="voteIndex">
            <view class="vote-item-hd bottom-line">
                <image src="{{vote.avatarUrl}}" lazy-load="true" mode="aspectFill"></image>
                <view class="vote-item-hd-info">
                    <view class="nickname">{{vote.nickname}}</view>
                    <view>{{vote.create_time}}</view>
                </view>
                <view class="vote-item-hd-op {{delOpState?'vote-item-hd-op-hover':''}}"  data-index="{{voteIndex}}" data-voteid="{{vote.data.id}}" bindtap="voteOP">
                    <i class="fa fa-circle"></i>
                    <i class="fa fa-circle"></i>
                    <i class="fa fa-circle"></i>
                </view>
            </view>
            <view class="vote-item-con">
                <view class="vote-item-con-hd bottom-line">
                    <!--配图 begin-->
                    <view class="vote-imgs {{vote.images.length>=3?'vote-imgs-more':''}}" wx:if="{{vote.images.length>0}}">
                        <view wx:if="{{vote.images.length<3}}" wx:for="{{vote.images}}" wx:key="{{index}}" class="vote-img-box">
                            <image data-src="{{item}}" lazy-load="true" data-images="{{vote.images}}" src="{{item}}" mode="aspectFill" bindtap="bindPreviewImage"></image>
                        </view>
                        <view wx:if="{{vote.images.length>=3}}">
                            <swiper indicator-dots="true" indicator-color="#58c9b9" indicator-active-color="#d1b6e1">
                                <block wx:for="{{vote.images}}" wx:key="{{index}}">
                                    <swiper-item>
                                        <image src="{{item}}" lazy-load="true" data-src="{{item}}" data-images="{{vote.images}}" class="slide-image" width="100%" height="auto" mode="aspectFill" bindtap="bindPreviewImage"></image>
                                    </swiper-item>
                                </block>
                            </swiper>
                        </view>
                    </view>
                    <!--配图 end-->
                    <view class="vote-title">{{vote.title}}</view>
                    <view class="vote-des-content" wx:if="{{vote.content}}">{{vote.content}}</view>
                </view>
                <view>
                    <!--当前用户已投票 begin-->
                    <view wx:for="{{vote.options}}" wx:key="{{item.id}}">
                        <view class="vote-item-data vote-item-data-voted" data-src="{{item.id}}">
                            {{item.title}}
                            <text class="vote-item-data-percent">{{filter.numberToFix(1/2*100)}}%</text>
                            <view class="progress-state" style="width:{{filter.numberToFix(1/2*100)}}%;background-color:{{votedColor[index]}};"></view>
                        </view>
                    </view>
                    <!--当前用户已投票 end-->
                </view>
<!--                <view wx:else>-->
<!--                    &lt;!&ndash;当前用户未投票 begin&ndash;&gt;-->
<!--                    <view wx:for="{{vote.options}}" wx:key="{{item.id}}">-->
<!--                        <view wx:if="{{index === vote.options.length-1}}" bindtap="onVote" data-index="{{index}}" data-vindex="{{voteIndex}}" data-src="{{item.id}}" class="vote-item-data" hover-class="vote-item-data-active">-->
<!--                            {{item.title}}-->
<!--                        </view>-->
<!--                        <view wx:else class="vote-item-data bottom-line" bindtap="onVote" data-index="{{index}}" data-vindex="{{voteIndex}}" data-src="{{item.id}}" hover-class="vote-item-data-active">-->
<!--                            {{item.title}}-->
<!--                        </view>-->
<!--                    </view>-->
<!--                    &lt;!&ndash;当前用户未投票 end&ndash;&gt;-->
<!--                </view>-->
            </view>
            <view class="vote-item-ft top-line">
                <view>
                    <text class="cuIcon-rankfill fa-align-left" style="font-size: 30rpx"
                          bindtap="targetToVoteDetail" data-nickname="{{vote.nickname}}" data-index="{{voteIndex}}" data-src="{{vote.data.id}}"></text>
                    <text style="margin-left: 20rpx;font-size: 25rpx">20</text>
                </view>
<!--                <i class="fa fa-align-left" bindtap="targetToVoteDetail" data-nickname="{{vote.nickname}}" data-index="{{voteIndex}}" data-src="{{vote.data.id}}"><text>20</text></i>-->
                <button open-type="share" plain="true" data-voteid="{{vote.data.id}}" data-cover="{{vote.images[0]}}" data-title="{{vote.data.title}}" data-nickname="{{vote.nickname}}" bindtap="onShareAppMessage"><i
                        class="fa fa-share-square-o"></i></button>
            </view>
        </view>
        <!--list end-->
        <view class="no-more-tip" wx:if="{{bottomLineState}}">这是底部，已无更多内容</view>
    </view>
    <view wx:if="{{votes.length>0}}" class="feedback-btn">
        <button open-type="feedback">
            <i class="fa fa-question-circle"></i>反馈
        </button>
    </view>
    <view wx:if="{{votes.length>0}}" class="vote-add-btn" hover-class="vote-item-data-active" bindtap="targetToAdd">
        <i class="fa fa-plus-circle"></i>创建投票
    </view>
</view>