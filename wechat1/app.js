
"use strict";

let Koa = require("koa");
let wechat = require('./wechat/g')

let config = {
    wechat: {
        appID: 'wxa10091a7afdecf1b',
        appSecret: '2e477408144e6e2f479d29fdbd6a2ad4',
        token: '123456654321'
    }
}

let app = new Koa()
app.use(wechat(config.wechat))

app.listen(8080);
console.log("Listening:1234")