//回复文字消息
exports.textMsg = function (toUser, fromUser, content) {
    var resultXml = "<xml><ToUserName><![CDATA[" + fromUser + "]]></ToUserName>";
    resultXml += "<FromUserName><![CDATA[" + toUser + "]]></FromUserName>";
    resultXml += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
    resultXml += "<MsgType><![CDATA[text]]></MsgType>";
    resultXml += "<Content><![CDATA[" + content + "]]></Content></xml>";
    return resultXml;
}

//设置自动回复内容
exports.message = function (data) {
    console.log(data)
    var content;
    if (data === "你好" || data === "hello" || data === "hi") {
        content = "欢迎光临小许客栈!"
    } else {
        content = "公众号还在升级，敬请期待!";
    }
    return content;
}

//回复图片消息
exports.imgMsg = function (toUser, fromUser, media_id) {
    var xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
    xmlContent += "<FromUserName><![CDATA[" + fromUser + "]]></FromUserName>";
    xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
    xmlContent += "<MsgType><![CDATA[image]]></MsgType>";
    xmlContent += "<Image><MediaId><![CDATA[" + media_id + "]]></MediaId></Image></xml>";
    return xmlContent;
}
