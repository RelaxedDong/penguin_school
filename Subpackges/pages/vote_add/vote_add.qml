<!--vote_add.wxml-->
<view class="vote-add" scroll-y="{{addNewVoteState}}">
    <view class="vote-add-item">
        <label class="label-for-input">投票标题</label>
        <input class="bottom-line" type="text" placeholder="请输入投票标题,至少3个字" maxlength="50" bindinput="bindTitleInput" confirm-type="done" value="{{newVoteTitle}}" />
    </view>
    <view class="vote-add-item clearfix">
        <label class="label-for-input">投票类型</label>
        <radio-group class="vote-radio-group vote-add-item-data" bindchange="radioChange">
            <label qq:for="{{voteTypes}}" qq:key="{{index}}">
                <radio class="vote-radio" value="{{item.name}}" checked="{{item.checked}}" 	color="#7087f4"/>{{item.value}}
            </label>
        </radio-group>
    </view>
    <view class="vote-add-item clearfix">
        <label>投票描述</label>
        <textarea qq:if="{{!desTextareaState}}" class="fl vote-add-item-data" bindinput="bindDesTextAreaInput" maxlength="120" auto-height placeholder="补充描述（选填，不超过120字）" value="{{desTextareaData}}" />
        <view class="fl peso-des-textarea" qq:elif="{{desTextareaState}}">
            <text qq:if="desTextareaDataLen>0">{{desTextareaData}}</text>
            <text qq:if="desTextareaDataLen===0">补充描述（选填，不超过120字）</text>
        </view>
        <view qq:if="{{desTextareaDataLen>0}}" class="fr vote-add-item-data des-textarea-tip"><text class="{{desTextareaDataLen===120?'color-warn':''}}">{{desTextareaDataLen}}/120</text></view>
    </view>
    <view class="vote-add-item vote-add-item-imgs clearfix">
        <label>投票配图<text>(最多4张)</text></label>
        <view class="vote-add-item-imgs-box">
            <view qq:for="{{voteImgs}}" qq:key="{{index}}">
                <image qq:if="{{item}}" data-src="{{item}}" src="{{item}}" mode="aspectFill" bindtap="bindPreviewImage"></image>
                <text class="cuIcon-roundclosefill fa-minus-circle" bindtap="delImage" data-index="{{index}}"></text>
            </view>
            <image hidden="{{voteImgs.length==4?true:false}}" src="../../imgs/uploadImg.png" catchtap="ImgAddClick"></image>
        </view>
    </view>
    <view class="vote-add-item clearfix">
        <label>设置选项</label>
        <view class="vote-options fl vote-add-item-data">
            <view class="vote-option-container" qq:if="{{newVotes.length>0}}">
                <view qq:for="{{newVotes}}" qq:key="{{index}}" class="bottom-line" hover-class="vote-option-hover-class" data-index="{{index}}" bindlongpress="confirmDelItem">
                    <view class="vote-option">
                        <!--                        <i class="fa fa-minus-circle" data-index="{{index}}" bindtap="confirmDelItem"></i>-->
                        <text class="cuIcon-roundclosefill fa-minus-circle" bindtap="confirmDelItem" data-index="{{index}}"></text>
                        <text class="vote-option-content">{{item.title}}</text>
                    </view>
                </view>
            </view>
            <button qq:if="{{newVotes.length < 4}}" type="defalut" bindtap="addNewVote" class='btn' bindtap='addNewVote'>添加投票选项</button>
            <view class="vote-item-tip">
                <text>添加答案</text>
                <view>
                    <text>选项最少两个，最多四个</text>
                </view>
            </view>
        </view>
    </view>
    <view class="vote-add-item">
        <view class="publish-vote-btn" type="primary" bindtap="publishNewVote">
            <text>发布</text>
        </view>
<!--        <button qq:else class="publish-btn" loading="true" type="primary">正在发布</button>-->
    </view>
    <!--弹窗 begin-->
    <view class="vote-item-add-mask" catchtouchmove="true" qq:if="{{addNewVoteState}}">
        <view class="vote-item-add clearfix {{textareaFocusFlag ?'vote-item-add-active':''}}">
            <textarea catchtouchmove="true" class="vote-add-item-data" auto-focus="{{addNewVoteState}}" bindfocus="bindTextAreaFocus" bindblur="bindTextAreablur" bindinput="bindTextAreaInput" auto-height maxlength="40" placeholder="请填写选项内容,内容不要超过40字" value="{{newVoteContent}}"
            />
            <view class="clearfix">
                <text class="{{newVoteWordsState?'color-warn':''}}">{{newVoteWords}}/40</text>
            </view>
            <button class="confirm-add-btn" type="primary" bindtap="confirmAddNewVote">确认添加</button>
            <i class="fa fa-times-circle" bindtap="closeMask"></i>
        </view>
    </view>
    <!--弹窗 end-->
</view>