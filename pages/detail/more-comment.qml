<view class="commentbox" id="foot">
    <view  qq:for="{{comments}}" qq:key="id" qq:for-item="comment">
        <view class="activity-head flex-row margin-top-20">
            <image src="{{comment.avatarUrl}}"></image>
            <view class="info flex-column">
                <view class="text-black text-size-30">{{comment.nickname}}
                    <text class="owner-tag main-bg-cor text-size-25" qq:if="{{comment.id == super_id}}">楼主</text>
                </view>
                <view class="text-size-25 text-grey">{{comment.create_time}}</view>
            </view>
            <view class="share" qq:if="{{user_id == comment.publisher_id}}" data-index="{{index}}" bindtap="DeleteComment"
                  data-id="{{comment.id}}" data-act="{{activity_id}}">
                <text class="cuIcon-deletefill text-yellow padding-10 border-box text-size-30"></text>
            </view>
        </view>
            <view class="text-size-25 margin-top-20 text-black comment-desc">
                <block qq:if="{{comment.parent_id !== super_id && comment.id !== super_id}}">
                    回复 <text class="text-blue">{{comments_doc[comment.parent_id].nickname}}</text> ：
                </block>
                {{ comment.content }}
            </view>
        <view class="flex-row {{comment.id == super_id?'border-main padding-top-bottom-20':''}}">
            <text bindtap="bindReply" class="auto-left text-size-25  text-grey border-box" data-index="{{index}}"
                  data-commentId="{{comment.id}}" data-nickname="{{comment.nickname}}"
            >回复</text>
        </view>
    </view>
    <view class="release" hidden="{{!releaseFocus}}">
    <textarea class="text"
              placeholder-class="input_null"
              fixed="true"
              bindinput="inputBind"
              value="{{commentValue}}"
              maxlength="-1"
              show-confirm-bar="false"
              cursor-spacing="15"
              auto-height="true"
              focus="{{releaseFocus}}"
              placeholder="{{releaseName}}"></textarea>
        <!--    <view class="submit" bindtap="HandleSend">-->
        <form class="submit" bindsubmit='HandleSend' report-submit>
            <button class="main-bg-cor text-size-30 text-blue" formType="submit">发表</button>
        </form>
        <!--    </view>-->
    </view>
</view>
