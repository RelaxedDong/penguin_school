<view class="auth-contaner"  animation="{{slide_up1}}">
    <view class="image-rotate">
        <image class="image-rotate" mode="aspectFit" animation="{{animation}}" src='{{school.logo}}'></image>
    </view>
    <view class="form-group">
        <view class="input-box">
            <view class="input-item border-main">
                <input class="text-grey" type="text" bindinput="nameInput" placeholder="姓名" />
            </view>
            <view class="input-item border-main">
                <input class="text-grey" type="text" bindinput="studentIdInput" placeholder="学号" />
            </view>
            <view class="input-item border-main">
                <picker bindchange="bindPickerChange" value="{{index}}"  range="{{departments}}">
                    <view class="space-between text-grey text-size-30 ">
                        <view class="padding-top-bottom-10">
                            <text qq:if="{{!departments[index]}}">学院选择</text> {{departments[index]}}
                        </view>
                    </view>
                </picker>
            </view>
        </view>
        <view class="margin-top-10">
            <form bindsubmit='submitBtn' report-submit>
                <button class="text-size-30 main-blue-bg" formType="submit">开启校园之旅</button>
            </form>
        </view>
    </view>
</view>

