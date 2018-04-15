
"use strict";

let sha1 = require("sha1");

function Wechat(opts) {
    let that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    this.getAccessToken().then(function (data) {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            return that.updateAccessToken();
        }
        if (that.isValidAccessToken(data)) {
            Promise.resolve(data);
        }
        else {
            return that.updateAccessToken()
        }
    }).then(function(data){
        that.access_token = data.access_token;
        that.exports_in = data.exports_in;
        that.saveAccessToken(data)
    })
}










module.exports = function (ops) {
    return function* (next) {
        console.log(this.query);
        let token = ops.token;
        let signature = this.query.signature;
        let nonce = this.query.nonce;
        let timestamp = this.query.timestamp;
        let echostr = this.query.echostr;
        let str = [token, timestamp, nonce].sort().join('');
        let sha = sha1(str);

        if (sha == signature) {
            this.body = echostr + '';
        } else {
            this.body = 'wrong';
        }
    }
}