const express = require("express");
const app = express();

// app.get('/', function(req, res){
//     const text = process.env.TEXT || 'HELLO TEST'
//     res.send(text)
// })

var Wechat = require("./util/wechat");
console.log("Wechat", Wechat);
const config = {
    wechat: {
        token: "abc",
        appID: "wxdcd01dfbd76ceb96",
        appSecret: "",
        prefix: "",
        diyApi: "",
    },
};
var wechat = new Wechat(config); //实例化一个WeChat对象
app.get("/wx", (req, res, next) => {
    wechat.auth(req, res, next);
});
app.post("/wx", (req, res, next) => {
    wechat.autoMsg(req, res, next);
});
app.get("/aaa", (req, res, next) => {
    console.log("i am in");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`服务已启动，端口：${port}`);
});
