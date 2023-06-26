var url = "https://raw.githubusercontent.com/yaronzz/auto/master/";

var res = http.get("https://raw.githubusercontent.com/yaronzz/auto/master/version.json");
if (res.statusCode !== 200) {
    console.log("请求失败");
}
// files.writeBytes("/sdcard/1.png", res.body.bytes());
// toast("下载成功");
// app.viewFile("/sdcard/1.png");
console.log(res.body.string());

