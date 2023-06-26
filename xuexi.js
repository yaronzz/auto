let unitls = require('./unitls.js');

function inMain() {
    if (text("我的").exists()) {
        if (text("我的").findOne(100).bounds().centerX() > device.width * 0.7)
            return true;
    }
    return false;
}

function backToMain() {
    for (let i = 0; i < 6; i++) {
        if (inMain())
            break;
        back();
        sleep(2000);

        if (textContains("加入书架").exists()) {
            unitls.clickWidget(text("取消").findOne(1000));
            sleep(2000);
        }
        if (textContains("确定要退出答题").exists()) {
            unitls.clickWidget(text("退出").findOne(1000));
            sleep(2000);
        }
    }
}

function openApp() {
    launchApp("学习强国");
    sleep(3000);

    backToMain();
    if (inMain())
        return true;

    console.log("打开学习强国失败");
    return false;
}

function readArticles(numOfArticles) {
    //切换文章页面
    click(device.width / 2, device.height - 100);
    sleep(1000);

    click("推荐");
    sleep(1000);

    //获取要阅读的文章的日期
    let dateStr = unitls.getDateString(0);
    if (new Date().getHours() <= 8)
        dateStr = unitls.getDateString(-1);

    //开始阅读
    console.log("开始阅读文章");
    let readCounts = 0;
    let failedCounts = 0;
    let listView = className("ListView");
    for (let idx = 0; readCounts < numOfArticles && failedCounts < 20;) {
        sleep(1000);

        if (!click(dateStr, idx)) {
            console.log("获取文章失败,已失败" + failedCounts + "次,向下滑动");
            failedCounts++;

            //滑动到底部
            listView.scrollForward();
            idx = 0;
            sleep(1000);
            continue;
        }

        idx++;
        sleep(3000);

        // let p = boundsInside(device.width * 0.1, device.height * 0.1, device.width * 0.9, device.height * 0.9)
        //     .text(dateStr)
        //     .findOne(1000);
        // if (!p)
        // {
        //     console.log("获取文章失败,已失败" + failedCounts + "次");
        //     failedCounts++;
        //     swipe(device.width / 2, device.height * 0.7, device.width / 2, device.height * 0.2, 500);
        //     sleep(200);
        //     continue;
        // }

        //进入文章页面
        // unitls.clickWidget(p);
        // sleep(3000);

        //视频跳过
        if (textContains("播放").exists()) {
            backToMain();
            swipe(80, device.height * 0.7, 80, device.height * 0.2, 500);
            sleep(1000);
            continue;
        } 

        readCounts++;
        sleep(2000);

        console.log("阅读第" + readCounts + "篇/共" + numOfArticles + "篇");
        sleep(1000);

        // console.log("收藏中");
        // click((865 * device.width) / 1080, device.height - 60);
        // sleep(1000);
        // console.log("分享中");
        // click((1000 * device.width) / 1080, device.height - 60);
        // unitls.clickWidget(textContains("分享给微信").findOne(5000));
        // sleep(5000);
        // back();
        // sleep(3000);

        // 获取浏览时长分
        for (let i = 0; i < 5 && !unitls.globalParams.isDebug; i++) {
            sleep(8000 + Math.random() * 4000);
            swipe(device.width / 2, device.height * (0.7 + Math.random() * 0.2), device.width / 2, device.height * (0.2 + Math.random() * 0.2), 1000);
            console.log("当前为第" + readCounts + "篇文章,约已阅读" + (i + 1) * 10 + "秒");
        }
        
        //返回主页并向下滑动
        backToMain();
        // if (p.bounds().bottom - 310 < 300)
        //     swipe(device.width / 2, 610, device.width / 2, 310, 1000);
        // else
        //     swipe(device.width / 2, p.bounds().bottom, device.width / 2, 310, 1000);
        sleep(1000);
    }

    console.log("阅读文章结束，成功阅读" + readCounts + "篇文章");
}

function watchVideos(numOfVedios) {
    click("电视台");
    sleep(3000);
    click("联播频道");
    sleep(3000);

    console.log("开始观看视频");

    //获取要阅读的文章的日期
    let dateStr = unitls.getDateString(0);
    if (new Date().getHours() <= 20)
        dateStr = unitls.getDateString(-1);

    let watchCounts = 0;
    let failedCounts = 0;
    let listView = className("ListView");
    for (let idx = 0; watchCounts < numOfVedios && failedCounts < 20;) {
        sleep(1000);
        if (!click(dateStr, idx)) {
            console.log("获取视频失败,已失败" + failedCounts + "次,向下滑动");
            failedCounts++;

            //滑动到底部
            listView.scrollForward();
            idx = 0;
            sleep(1000);
            continue;
        }

        idx++;
        sleep(3000);

        // let p = boundsInside(device.width * 0.1, device.height * 0.1, device.width * 0.9, device.height * 0.9)
        //     .text(dateStr)
        //     .findOne(1000);
        // if (!p) {
        //     console.log("获取视频失败,已失败" + failedCounts + "次");
        //     failedCounts++;
        //     swipe(device.width / 2, device.height * 0.7, device.width / 2, device.height * 0.2, 500);
        //     sleep(200);
        //     continue;
        // }

        // unitls.clickWidget(p);
        // sleep(3000);

        watchCounts++;

        if (textContains("新闻联播").exists() && !unitls.globalParams.isDebug) 
            sleep(3 * 60 * 1000); 

        unitls.clickWidget(text("继续播放").findOne(1000));
        sleep(1000);

        click(device.width / 2, 300 * (device.width / 1080));
        sleep(1000);

        console.log("开始看第" + watchCounts + "个视频/共" + numOfVedios + "个");

        for (let i = 0; i < 6 && !unitls.globalParams.isDebug; i++) {
            sleep(8000 + Math.random() * 4000);
            swipe(device.width / 2, device.height * (0.7 + Math.random() * 0.2), device.width / 2, device.height * (0.2 + Math.random() * 0.2), 1000);
            console.log("当前为第" + watchCounts + "个视频,约已观看" + (i + 1) * 10 + "秒");
        }

        //返回主页并向下滑动
        backToMain();
        // if (p.bounds().bottom - 310 < 300)
        //     swipe(device.width / 2, 610, device.width / 2, 310, 1000);
        // else
        //     swipe(device.width / 2, p.bounds().bottom, device.width / 2, 310, 1000);
        sleep(1000);
    }
    console.log("观看视频结束，成功观看" + watchCounts + "个视频");
}

//手机解锁
unitls.unlockByConfig();
unitls.setQuietEnv();
 
// unitls.globalParams.isDebug = true; 
if (openApp())
{
    console.log("打开学习强国成功");
    readArticles(6);
    watchVideos(6);
}

sleep(2000);
home()

unitls.restoreEnv();

