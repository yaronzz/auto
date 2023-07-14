let unitls = require('./unitls.js');

//跳转菜单页面
function toPage(name) {
    let btnClass = "android.widget.RadioButton";
    let btnId = 'rdbtn_mine';
    if (name == '圈友')
        btnId = 'rdbtn_community'

    if (className(btnClass).id(btnId).exists()) {
        console.log("进入[" + name + "]界面成功");

        className(btnClass).id(btnId).findOnce().click();
        return true;
    }
    else {
        console.log("进入[" + name + "]界面失败，未能检查到按钮");
        return false;
    }
}

//签到
function checkIn() {
    let btnClass = "android.widget.TextView";

    if (className(btnClass).text("签到").exists()) {
        console.log("签到成功");

        className(btnClass).text("签到").findOnce().click();
    }
    else if (className(btnClass).text("已签到").exists()) {
        console.log("已签到");

        className(btnClass).text("已签到").findOnce().click();
    }
    else {
        console.log("签到失败，未能检查到按钮");
        unitls.sendNotify("大众签到失败", "未能检查到按钮");
        return false;
    }

    sleep(5000);

    let text = "签到时长查询异常"
    if (textContains("已连续签到").exists())
    {
        let widget = textContains("已连续签到").findOnce();
        text = widget.text()
    }
    unitls.sendNotify("大众签到成功:" + text, "--");
    console.log("签到成功," + text);

    //打开宝箱流程
    if (id("demoCanvas").exists())
    {
        id("demoCanvas").findOne().parent().click()
        console.log("打开宝箱成功");
    }
    return true;
}

//评论|点赞|转发
function comment() {
    id("item_brand_comment_root").className("android.view.ViewGroup").clickable(true).depth(16).findOne().click();

    let sharebtn = className("android.widget.Image").clickable(true).findOne()
    let comedit = className("android.widget.TextView").text("请输入您的评论").findOnce()
    let discussbtn = comedit.parent().child(1);
    let starbtn = comedit.parent().child(2);

    starbtn.click();
    console.log("点赞成功");
    sleep(1000);

    discussbtn.click();
    sleep(1000);

    let edit = className("android.widget.EditText").findOne();
    edit.setText("打卡");
    sleep(1000);

    let sendbtn = className("android.widget.Button").findOne();
    sendbtn.click();
    console.log("打卡成功");
    sleep(1000);

    sharebtn.click();
    sleep(500);
    className("android.widget.ImageView").id("iv_share_bg").findOne().click()
    console.log("分享成功");
    sleep(5000);

    back();
    sleep(2000);
}



/******************手机解锁*********************/
unitls.unlockByConfig();

/*******************签到********************/
launchApp("上汽大众");
sleep(8000);

if (toPage('我的')) {
    sleep(2000);

    checkIn()
    back()
}

sleep(1000);

/*******************点赞\评论\转发********************/
if (toPage('圈友')) {
    sleep(5000);

    comment()
    back()
}

sleep(2000);
home()
