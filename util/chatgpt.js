import { ChatGPTAPI } from "chatgpt";
import http from "http";
import { defer } from "utils-lib-js";
const apiKey = "Bearer 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";
const initChatGPT = (
    opts = {
        apiKey,
        markdown: false,
    }
) => {
    return new ChatGPTAPI(opts);
};

/**
 * @name:
 * @description: 服务端响应消息
 * @param {ServerResponse} res ServerResponse实例
 * @param {*} msg 发送的消息
 * @param {*} code 状态码
 * @return {*}
 */
const sendRes = (res, msg = "", code = 200) => {
    res.writeHead(code, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
    });
    res.write(msg);
    res.end();
};
/**
 * @name:
 * @description: 封装了一下ChatGPT
 * @param {*} msg 发送的消息
 * @param {*} opts 配置文件，传parentMessageId，conversationId可以关联上下文
 * @return {Promise}
 */
const sendChatGPTMsg = async ({ msg, opts }) => {
    const { promise, resolve, reject } = defer();
    chatGPTApi.sendMessage(msg, opts).catch(reject).then(resolve);
    return promise;
};

module.exports = { initChatGPT, sendRes, sendChatGPTMsg }