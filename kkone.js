let unitls = require('./unitls.js');


//打开微信首页
function openWeiXin() {
    launchApp("微信");
    sleep(1000);

    var backtime = 0;
    while (!id("f2s").className("android.widget.TextView").text("微信").exists()) {
        back()
        sleep(500);
        backtime++;
        if (backtime > 5) {
            console.log("返回微信首页失败");
            return false;
        }
    }

    return true;
}

//KKONE签到
function kkoneCheckIn() {
    for (let index = 0; index < 20; index++) {
        if (id("hg4").className("android.view.View").text("KKONE").exists())
            break;

        console.log("微信首页找不到KKONE,尝试上滑第" + index + "次");
        swipe(device.width / 2, device.height * 0.2, device.width / 2, device.height * 0.7, 500);
    }

    if (!id("hg4").className("android.view.View").text("KKONE").exists())
        return false;

    let kkone = id("hg4").className("android.view.View").text("KKONE").findOne()
    kkone.parent().parent().parent().parent().parent().click()
    sleep(1000)

    id("b59").className("android.widget.TextView").text("我的会员").findOne().parent().parent().click()
    sleep(1000)

    className("android.widget.TextView").text("我的会员卡").findOne().click()
    sleep(5000)

    className("android.widget.Button").text("每日签到").findOne().click()
    sleep(1000)

    className("android.widget.Button").text("立即签到").findOne().click()
    sleep(3000)

    console.log("KKONE签到完成");

    for (let index = 0; index < 3; index++) {
        back()
        sleep(500);
    }

    return true;
}


//手机解锁
unitls.unlockByConfig();

//打开微信
if (openWeiXin()) {
    kkoneCheckIn();
}
