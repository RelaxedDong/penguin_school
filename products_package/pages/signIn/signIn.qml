<!--pages/signIn/signIn.qml-->
<view class='signIn'>
  <view class='sign-com'>
    <view class='thead'>
      <view class='tt'>已连续签到</view>
      <view class='mm'><label class='n'>{{signNum}}</label>天</view>
    </view>
    <view class='modle'>
        <view class='mol'>
          <view class='mol-line'></view>
            <view class='mol-ites'>
              <view class="ite {{signNum>=min?'hover':''}}" data-n='{{min}}'>
                <label class='n'>+3</label>
              </view>
              <view class="ite {{signNum>=min+1?'hover':''}}" data-n='{{min+1}}'>
                <label class='n'>+3</label>
              </view>
                <view class="ite {{signNum>=min+2?'hover':''}}" data-n='{{min+2}}'>
                <label class='n'>+3</label>
              </view>
              <view class="ite {{signNum>=min+3?'hover':''}}" data-n='{{min+3}}'>
                <label class='n'>+3</label>
              </view>
              <view class="ite {{signNum>=min+4?'hover':''}}" data-n='{{min+4}}'>
                <label class='n'>+3</label>
              </view>
              <view class="ite {{signNum>=min+5?'hover':''}}" data-n='{{min+5}}'>
                <label class='n'>+3</label>
              </view>
              <view class="ite {{signNum>=min+6?'hover':''}}" data-n='{{max}}'>
                <label class='n'>+3</label>
              </view>
            </view>
        </view>
        <view class='moday'>
          <label class='dd'>{{min}}天</label>
          <label class='dd'>{{min+1}}天</label>
          <label class='dd'>{{min+2}}天</label>
          <label class='dd'>{{min+3}}天</label>
          <label class='dd'>{{min+4}}天</label>
          <label class='dd'>{{min+5}}天</label>
          <label class='dd'>{{max}}天</label>
        </view>
      </view>

    <view class='the-btn'>
      <button type='button' class='btn' bindtap='bindSignIn'
      >签到</button>
    </view>
  </view>
</view>

<view class='explax'>
  <view class='margin-top-10'>签到数： {{signNum}}天</view>
  <view class='margin-top-10 space-between'>
    <view>
      积分数： {{point}}
    </view>
    <view class="point-center" bindtap="GoPointCenter">
      去兑换
    </view>
  </view>
  <view qq:if="{{sign_time}}" class='margin-top-10'>上次签到： {{sign_time}}</view>
</view>
<ad unit-id="b9c4e3249e88c54ec2a0ea53a8d0bec4" type="card"></ad>