<view class="container">
  <view class="info">
    <view qq:for="{{contents}}"  qq:key>{{ item }}</view>
  </view>
  <view class="score-img" qq:if="{{score_stream}}">
    <image data-src="{{score_stream}}" src="{{score_stream}}"></image>
  </view>
  <ad style="margin-top: 50rpx" unit-id="b9c4e3249e88c54ec2a0ea53a8d0bec4" type="card"></ad>
</view>
