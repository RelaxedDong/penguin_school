<view class="auth-contaner"  animation="{{slide_up1}}">
    <view class="image-rotate">
        <image class="image-rotate" mode="aspectFit"
               src='{{school.logo}}'></image>
    </view>
    <view class="form-group">
        <view class="input-box">
            <view class="input-item border-main padding-top-bottom-10 space-between">
                <view>
                    <input class="text-grey" type="text" disabled placeholder="{{school.name}}" />
                </view>
                <button hover-class="none"
                        qq:if="{{!user_id}}" class="auth-button"
                        open-type="getUserInfo" bindgetuserinfo="login">授权绑定</button>
            </view>
            <view class="input-item border-main padding-top-bottom-10" qq:if="{{department}}">
                <input class="text-grey" type="text" disabled="{{department}}" bindinput="studentIdInput" placeholder="{{department}}" />
            </view>
            <view class="input-item border-main" qq:else>
                <picker bindchange="bindPickerChange" value="{{index}}"  range="{{departments}}">
                    <view class="space-between text-grey text-size-30 ">
                        <view class="padding-top-bottom-10">
                            <text qq:if="{{!department}}">学院选择</text> {{department}}
                        </view>
                    </view>
                </picker>
            </view>
            <view class="input-item border-main padding-top-bottom-10">
                <input class="text-grey" type="text" bindinput="studentIdInput" placeholder="{{school.school_id}}" />
            </view>
            <view class="input-item border-main padding-top-bottom-10">
                <input class="text-grey" type="text" bindinput="nameInput" placeholder="{{school.username}}" />
            </view>
            <view class="input-item border-main padding-top-bottom-10">
                <input class="text-grey" type="text"  bindinput="qqInput" placeholder="{{school.qq?school.qq:'未填写QQ号码'}}" />
            </view>
        </view>
        <view class="margin-top-10">
            <form bindsubmit='submitBtn' report-submit>
                <button hover-class="none"
                        class="text-size-30 main-blue-bg" formType="submit">
                    <text class="text-white" qq:if="{{!is_auth}}"  disabled="{{is_auth}}">开启校园之旅</text>
                    <text class="text-white" qq:else>立即更新（QQ，姓名，学号可更正）</text>
                </button>
            </form>
        </view>
    </view>
</view>

