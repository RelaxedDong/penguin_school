<view class="page-container">
    <view class="page-title text-black">
        <view class="table_cell">
            <button class="text-size-30 text-black">{{title}} ({{school.name}})</button>
        </view>
        <view class="">
            <form bindsubmit='submitBtn' report-submit>
                <button class="main-bg-cor text-size-30 text-blue" formType="submit">发表</button>
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
            <view class="choosed text-size-30">
                    <view class="choose-item flex-row"  qq:for="{{tags}}" qq:key qq:if="{{item.is_active}}">
                        <text class="margin-right-10">#</text>
                        <text>{{item.name}}</text>
                    </view>
            </view>
            <view class="flex-row margin-top-20 text-size-25 text-grey" qq:if="{{active_address}}">
                <text class="cuIcon-location margin-right-10"></text>
                <text>{{active_address}}</text>
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
    <view class="space-between border-main" data-activeKey="tag" bindtap="TabChoose"  qq:if="{{!is_img_upload}}">
        <view>
            <text class="cuIcon-tag"></text><text class="margin-left-10">添加板块</text>
        </view>
        <view>
            <text class="{{activekey == 'tag'?'cuIcon-unfold':'cuIcon-right'}}"></text>
        </view>
    </view>
    <view class="item-choose"  qq:if="{{activekey == 'tag' && !is_img_upload}}">
        <view class="items-box">
            <view  qq:for="{{tags}}" qq:key  class="items  bg-f4" bindtap="TagClick"
                   data-key="{{index}}"
            ><text qq:if="{{item.is_active}}" class="cuIcon-tagfill  text-yellow"></text>{{item.name}}</view>
        </view>
    </view>
    <view class="space-between border-main"  data-activeKey="location" bindtap="TabChoose">
        <view>
            <text class="cuIcon-location"></text><text class="margin-left-10">添加地标</text>
        </view>
        <view>
            <text class="{{activekey == 'location'?'cuIcon-unfold':'cuIcon-right'}}"></text>
        </view>
    </view>
    <view class="item-choose"  qq:if="{{activekey == 'location'}}">
        <view class="search-box" >
            <input bindinput='getsuggest' placeholder="请输发布地址" value="{{input}}" type="text"  confirm-type="search" />
            <text class="cuIcon-close" bindtap="ClearClick"  style="margin-left: auto;margin-right:20rpx;padding: 10rpx;box-sizing: border-box"></text>
        </view>
        <view class="items-box">
            <view  qq:for="{{address_list}}" qq:key qq:key  class="items text-size-23 bg-f4" bindtap="AddressClick" data-address="{{item}}"
            ><text qq:if="{{item == active_address}}" class="cuIcon-locationfill text-size-30 text-yellow"></text>{{item}}</view>
        </view>
    </view>
    <view class="space-between" bindtap="anonymousClick" qq:if="{{!is_img_upload}}">
        <view>
            <text class=" {{anonymous?'cuIcon-radiobox':'cuIcon-round'}}"></text><text class="margin-left-10">匿名发布</text>
            <text class="margin-left-10">（一天一次）</text>
        </view>
    </view>
</view>
</view>
