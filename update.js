let url = "https://raw.githubusercontent.com/yaronzz/auto/master/";


console.log("==开始更新脚本==");

//获取在线版本信息
var res = http.get(url + "version.json");
if (res.statusCode !== 200) {
    console.log("获取在线版本信息失败");
    exit();
}
var onlineInfo = JSON.parse(res.body.string());
var newVersion = onlineInfo.version;
var newFiles = onlineInfo.files;

//获取本地版本信息
var curVersion = "";
try {
    let content = files.read('./version.json');
    let params = JSON.parse(content);
    curVersion = params.version;
} catch (error) {
}

//比较版本
console.log("当前版本:" + curVersion);
console.log("最新版本:" + newVersion);

if (newVersion === curVersion) {
    console.log("当前已是最新版本");
    exit();
}

for (let index = 0; index < newFiles.length; index++) {
    var res = http.get(url + newFiles[index]);
    if (res.statusCode !== 200) {
        console.log("下载失败:" + newFiles[index]);
        continue;
    }
    files.writeBytes("./" + newFiles[index], res.body.bytes());
    console.log("下载成功:" + newFiles[index]);
}