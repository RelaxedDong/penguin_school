<view class="vote-add">
  <view class="vote-add-item">
    <label class="label-for-input">学号</label>
    <input class="bottom-line" type="text" disabled
           maxlength="50" bindinput="bindTitleInput" confirm-type="done" value="{{student_no}}" />
  </view>
  <view class="vote-add-item">
    <label class="label-for-input">密码</label>
    <input class="bottom-line" type="password" placeholder="请输入教务系统密码" bindinput="InputValue" maxlength="20" value="{{password}}" />
  </view>
  <view class="vote-add-item">
  <view class='label-for-input picker-label'>验证码：</view>
  <view class='right'>
    <view class='right-left'>
    <input class="bottom-line" placeholder='请输入验证码' bindinput='InputCatptcha' value='{{catptcha}}' />
    </view>
    <view class='right-right'>
      <!-- <button class='btn'>验证码</button> -->
      <image bindtap="ChangeCaptcha" src="data:image/jpeg;base64,{{captcha_stream}}"></image>
    </view>
</view>
  </view>
  <view class="vote-add-item clearfix">
    <label>学期选择<text class="other-text">(终止时间)</text></label>
    <radio-group class="vote-radio-group vote-add-item-data" bindchange="xueqiChange">
      <label qq:for="{{xueqi}}" qq:key="{{index}}">
        <radio class="vote-radio" value="{{item.name}}" checked="{{item.checked}}" 	color="#16D0FF"/>{{item.name}}
      </label>
    </radio-group>
  </view>
  <view class="vote-add-item">
    <picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
      <view class="picker-label">
        学年选择：{{array[index]}}
      </view>
    </picker>
  </view>
  <view class="vote-add-item">
    <button type="defalut" bindtap="ScoreSearch" class='btn'>立即查询</button>
    <!--        <button qq:else class="publish-btn" loading="true" type="primary">正在发布</button>-->
  </view>
  <ad style="margin-top: 50rpx" unit-id="b9c4e3249e88c54ec2a0ea53a8d0bec4" type="card"></ad>
</view>

