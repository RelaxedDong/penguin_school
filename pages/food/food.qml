<navbar title="美食/店铺"></navbar>
<header activekey="food"></header>
<view class="main-container">
  <view class="card-container">
      <view class="join-food-group shadow" bindtap="HandleClick">
          <view class="join-now-info text-red">生活头条</view>
          <view class="food-face">
              <image class="border-radius" mode="aspectFill" src="/imgs/source/food.jpg"></image>
          </view>
          <view class="joined-list">
              <text class="text-black text-bold">校园周边入驻</text>
              <text class="text-grey margin-top-10 text-size-25">永和豆浆刚刚入驻了</text>
          </view>
          <view class="join-now-btn">
              <text class="cuIcon-right text-grey"></text>
          </view>
      </view>
      <view class="card-box shadow" qq:for="{{foods}}" qq:key bindtap="HandleClick">
      <view class="card-img imgurl" style="background-image: url({{item.url}})"></view>
      <view class="card-info">
        <view class="card-title margin-top-10">
          <view>{{item.name}}</view>
          <text class="cuIcon-more padding-10 border-box text-grey text-size-30"></text>
        </view>
        <view class="margin-top-10">
          {{item.source}}
        </view>
        <view class="user-info margin-top-10">
          <view class="text-grey margin-top-20 text-size-20">
              {{item.address}}
          </view>
          <view class="price text-red text-bold">人均 {{item.price}}</view>
        </view>
      </view>
    </view>
  </view>
</view>
