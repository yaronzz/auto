//读取配置文件
function readConfig() {
    let content = files.read('./profile.json');
    let params = JSON.parse(content);
    return params;
}

// 手机解锁
function unlock(password) {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1000);
        swipe(500, 2000, 500, 1000, 210);

        console.log("密码解锁[" + password + "]");

        for (var i = 0; i < password.length; i++) {
            var p = text(password[i].toString()).findOne().bounds();
            click(p.centerX(), p.centerY());
            sleep(100);
        }

        sleep(500);
    }
}

function unlockByConfig() {
    let params = readConfig();
    unlock(params.phone_password);
}

// 点击控件
function clickWidget(widget) {
    if (!widget)
        return false;
    if (widget.clickable()) {
        widget.click();
        return true;
    }

    let parent = widget.parent();
    for (let triedTimes = 0; triedTimes < 5; triedTimes++) {
        if (parent.clickable()) {
            parent.click();
            return true;
        }
        parent = parent.parent();
        if (!parent)
            break;
    }

    click(widget.bounds().centerX(), widget.bounds().centerY());
    return true;
}

//获取日期字符串yyyy-MM-dd
function getDateString(offsetDay) {
    let t = offsetDay * 24 * 60 * 60 * 1000;
    let curDate = new Date();
    curDate.setTime(curDate.getTime() + t);

    let year = curDate.getFullYear().toString();
    let month = (curDate.getMonth() + 1).toString();
    let day = curDate.getDate().toString();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return year + "-" + month + "-" + day;
}

//检查无障碍权限
function checkPermissions() {
    auto();             //检查无障碍权限
    requiresApi(24);    //安卓7以上版本
}

//全局参数
let globalParams = {
    isDebug: false,
    deviceVolume: device.getMusicVolume(),
}

//设置安静环境
function setQuietEnv(){
    device.setMusicVolume(0);
}

//恢复环境
function restoreEnv(){
    device.setMusicVolume(globalParams.deviceVolume);
}

exports.globalParams = globalParams;
exports.unlock = unlock;
exports.unlockByConfig = unlockByConfig;
exports.checkPermissions = checkPermissions;
exports.setQuietEnv = setQuietEnv;
exports.restoreEnv = restoreEnv;
exports.readConfig = readConfig;
exports.clickWidget = clickWidget;
exports.getDateString = getDateString;