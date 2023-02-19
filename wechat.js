var sha1 = require("sha1");
var parseString = require('xml2js').parseString;
var request = require("request");
var path = require("path");
var fs = require("fs");
var util = require("util");
var msg = require("./msg");
var accessTokenJson = require("./config/access_token.json");

function Wechat(config) {
    this.config = config;
    this.token = config.wechat.token;
    this.appID = config.wechat.appID;
    this.appScrect = config.wechat.appSecret;
    this.prefix = config.wechat.prefix;
    this.diyApi = config.wechat.diyApi;
}

Wechat.prototype.autoMsg = function (req, res, next) {
    req.on('data', function (data) {
        buffer.push(data);
        var msgXml = Buffer.concat([data]).toString('utf-8');
        console.log('msgXml', msgXml);
        parseString(msgXml, { explicitArray: false }, function (err, result) {
            console.log('parseString', err, result);
            if (err) throw err;
            result = result.xml;
            var toUser = result.ToUserName;
            var fromUser = result.FromUserName;
            //回复普通消息
            if (result.MsgType === "text") {
                res.send(msg.textMsg(toUser, fromUser, msg.message(result.Content)));
            }
        })
    });
};

//获取access_token
//为什么要保存access_token，原因请查看文档
Wechat.prototype.getAccessToken = function () {
    var that = this;
    return new Promise(function (resolve, reject) {
        var currentTime = new Date().getTime();
        //格式化请求地址,把刚才的%s按顺序替换
        var url = util.format(that.diyApi.getAccessToken, that.prefix, that.appID, that.appScrect);
        //判断本地存储的 access_token 是否有效
        if (accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
            that.requestGet(url).then(function (data) {
                var result = JSON.parse(data);
                // console.log(result);
                if (data.indexOf("errcode") < 0) {
                    accessTokenJson.access_token = result.access_token;
                    accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                    // console.log(accessTokenJson);
                    //更新本地存储的
                    fs.writeFile('./../config/access_token.json', JSON.stringify(accessTokenJson), function (err) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("access_token失效,重新写入成功!");
                        }
                    });
                    resolve(accessTokenJson.access_token);
                } else {
                    resolve(result);
                }
            });
        } else {
            //将本地存储的 access_token 返回
            resolve(accessTokenJson.access_token);
        }
    });
}
//封装一个get方法
Wechat.prototype.requestGet = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, (error, response, body) => {
            resolve(body);
        })
    })
}
//封装一个post方法
Wechat.prototype.requestPost = function (url, data) {
    return new Promise(function (resolve, reject) {
        request.post({ url: url, formData: data }, function (err, httpResponse, body) {
            resolve(body);
        });
    });
}


//上传素材
Wechat.prototype.uploadFile = function (urlPath, type) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.getAccessToken().then(function (data) {
            //data=== access_token
            var form = { //构造表单
                media: fs.createReadStream(urlPath)
            }
            var url = util.format(that.diyApi.uploadFile, that.prefix, data, type);
            that.requestPost(url, form).then(function (result) {
                resolve(JSON.parse(result).media_id);
            })
        })
    })
}

module.exports = Wechat