<view class="page-container">
    <view class="book-input-box">
            <input type="text" value="{{inputVal}}"  bindinput='bindInput' bindconfirm="toSearch" placeholder="请输入书名" />
    </view>
</view>
<view class="card-container">
    <view class="card-box shadow" qq:for="{{books}}" qq:key qq:for-item="item">
        <view>
            <view class="text-black space-between">
                <text>{{item.title}}</text>
                <text class="cuIcon-more text-size-25"></text>
            </view>
        <text class="cuIcon- text-yellow"></text></view>
        <view class="item">-- {{item.author}}</view>
        <view class="item">出版社：{{item.publisher}}</view>
        <view class="item">索书号：{{item.call_number}}</view>
        <view class="item space-between">
            <text>isbn：{{item.isbn}}</text>
            <text class="text-blue text-size-25" bindtap="SeeStore" data-index="{{index}}" data-id="{{item.collect_id}}">查看馆藏</text>
        </view>
        <!--food.wxml-->
        <view class="tableView" qq:if="{{item.stores}}">
            <view class="table_header blue-grend">
                <view class="th th1">索书号</view>
                <view class="th th2">书刊信息</view>
            </view>
            <!-- <block> 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。 -->
            <block wx:for="{{ item.stores }}" wx:for-item="work" wx:key="key">
                <view class="table_cell">
                    <view class="td td1">{{work.索书号}}</view>
                    <view class="td td1">{{work.部门名称}}</view>
                    <view class="td td1">{{work.单位名}}</view>
                    <view class="td td3">{{work.bookstatus}}</view>
                </view>
            </block>
         </view>
    </view>
</view>
