<header activekey="second" last_active_key="second"></header>
<view class="page-container">
    <form bindsubmit="formSubmit">
        <view class='top-card'>
            <view class='title'>
                <input class="border-main padding-top-bottom-20" data-type="title" bindinput="inputs" placeholder="标题品牌型号买方搜索内容"></input>
            </view>
            <view class="input-box">
                <view class="input-item border-main">
                <textarea class="areas" data-type="desc"  bindinput="inputs" placeholder='请输入内容' minlength="{{min}}" maxlength="{{max}}" bindinput="inputs">
                    <text class="currentWordNumber">{{currentWordNumber|0}}/{{max}}</text>
                    </textarea>
                </view>
            </view>
            <view class="scroll_box padding-top-bottom-20 margin-20">
                <scroll-view class="scroll-view_x" scroll-x style="width: auto;overflow:hidden;">
                    <view class="img-box" qq:for="{{imglist}}" qq:key qq:for-item="image"
                          bindtap="previewImage"
                          data-urls="{{imglist}}" data-currenturl="{{image}}">
                        <image src='{{image}}' class="item_book_img"
                               mode="aspectFill"></image>
                        <text class="cuIcon-close DeleteBtn" bindtap="DeleteBtnClick" data-index="{{index}}"></text>
                        <text class="face" qq:if="{{index === 0}}">封面</text>
                    </view>
                </scroll-view>
            </view>
            <image src='/imgs/tem/add_image.png' bindtap="ImgAddClick" class='img'></image>
        </view>
        <view class='buttom-card'>
            <view class='span'>
                <input class="border-main" data-type="price" placeholder='请输入商品价格 /元' type='digit' bindinput="inputs" />
            </view>
            <view class="span space-between">
                <switch class="switch-price"  bindchange="OldSwitchClick"></switch><text qq:if="{{!show_old_price}}">原价不展示</text>
                <view class="title" qq:if="{{show_old_price}}">
                    <view class="search-box">
                        <input type="text" placeholder="请输入原价 /元" value="{{inputVal}}"  bindinput='bindInput' />
                    </view>
                </view>
            </view>
            <view class='span padding-top-bottom-20'>
                <picker bindchange="bindPickerChange" range-key='name' range="{{categories}}">
                    选择分类<text class="margin-left-20">{{choose_value}}</text>
                </picker>
            </view>
        </view>
        <view class='buttom'>
            <button form-type='submit'>确认发布</button>
        </view>
    </form>
</view>
