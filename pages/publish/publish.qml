<view class="page-container">
    <view class="page-title text-black" qq:if="{{school}}">
        <view class="table_cell">
            <button class="text-size-30 text-black">{{title}} ({{school.name}})</button>
        </view>
        <view class="">
            <form bindsubmit='submitBtn' report-submit>
                <button class="main-bg-cor text-size-25 text-blue" formType="submit">发表</button>
            </form>
        </view>
    </view>
    <view class="page-top">
        <view class="input-box">
            <view class="input-item border-main">
                <input required="{{true}}"  data-type="title" type="text" placeholder="请输入标题" bindinput="inputs" />
            </view>
            <view class="input-item border-main">
                <textarea class="areas"  placeholder='请输入内容' data-type="desc" minlength="{{min}}" maxlength="{{max}}" bindinput="inputs">
                    <text class="currentWordNumber">{{currentWordNumber|0}}/{{max}}</text>
                    </textarea>
            </view>
            <view class="scroll_box padding-top-bottom-20">
                <scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
                    <view class="img-box" qq:for="{{imglist}}" qq:key qq:for-item="image">
                        <image src='{{image}}' class="item_book_img" data-src="{{image}}" mode="aspectFill" bindtap="previewImage"></image>
                        <text class="cuIcon-close DeleteBtn" bindtap="DeleteBtnClick" data-index="{{index}}"></text>
                        <text class="face" qq:if="{{index === 0}}">封面</text>
                    </view>
                </scroll-view>
            </view>
            <view qq:if="{{active_address}}"
                  bindtap="GetAddress"
                  class="location text-size-25 padding-top-bottom-10">
                <text class="cuIcon-locationfill"></text>
                <text class="margin-left-10">{{active_address}}</text>
            </view>
            <view class="choosed text-size-30">
                    <view class="choose-item main-bg-cor text-size-25 flex-row"  qq:for="{{tags}}" qq:key qq:if="{{item.is_active}}">
                        <text class="tg"># {{item.name}}</text>
                    </view>
            </view>
    </view>
</view>
<view class="flex-column select-container">
    <view class="space-between border-main" bindtap="ImgAddClick">
        <view>
            <text class="cuIcon-pic"></text><text class="margin-left-10">添加图片</text>
        </view>
        <view>
            <text>{{imglist.length}} / {{limit_pic}}</text>
        </view>
    </view>
    <view class="space-between border-main" data-activeKey="tag" bindtap="TabChoose"  qq:if="{{!is_img_upload && !onload_with_tag}}">
        <view>
            <text class="cuIcon-tag"></text><text class="margin-left-10">添加板块</text>
        </view>
        <view>
            <text class="{{activekey == 'tag'?'cuIcon-unfold':'cuIcon-right'}}"></text>
        </view>
    </view>
    <view class="item-choose"  qq:if="{{activekey == 'tag' && !is_img_upload}}">
        <view class="items-box">
            <view  qq:for="{{tags}}" qq:key  class="items  main-bg-cor" bindtap="TagClick"
                   data-key="{{index}}"
            ><text qq:if="{{item.is_active}}" class="cuIcon-tagfill  text-yellow"></text>{{item.name}}</view>
        </view>
    </view>
    <view bindtap="GetAddress"
               class="space-between border-main"
               >
        <view>
            <text class="cuIcon-location"></text><text class="margin-left-10">添加地标</text>
        </view>
        <view>
            <text class="cuIcon-right"></text>
        </view>
    </view>
<!--    <view class="item-choose"  qq:if="{{activekey == 'location'}}">-->
<!--        <view class="search-box">-->
<!--            <text class="cuIcon-search margin-left-20"></text>-->
<!--            <input type="text" placeholder="请输发布地址" value="{{input}}"-->
<!--                   bindinput='getsuggest' bindconfirm="search"/>-->
<!--        </view>-->
<!--        <view class="items-box main-bg-cor" qq:if="{{address_list.length > 0}}">-->
<!--            <view  qq:for="{{address_list}}" qq:key qq:key  class="items text-size-23 " bindtap="AddressClick" data-address="{{item}}"-->
<!--            ><text qq:if="{{item == active_address}}" class="cuIcon-locationfill text-size-30 text-yellow"></text>{{item}}</view>-->
<!--        </view>-->
<!--    </view>-->
    <view class="space-between border-main" bindtap="anonymousClick" qq:if="{{!is_img_upload}}">
        <view>
            <text class=" {{anonymous?'cuIcon-radiobox':'cuIcon-round'}}"></text><text class="margin-left-10">匿名发布</text>
            <text class="margin-left-10">（一天一次）</text>
        </view>
    </view>
    <view class="space-between" qq:if="{{!is_img_upload}}">
        <view>允许添加QQ好友</view>
        <switch checked="{{can_add_friend}}" bindchange="CanSeeMe" />
    </view>
</view>
</view>
