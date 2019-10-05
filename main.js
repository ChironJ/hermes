const readline = require('readline');
const demo = require('./demo');
const config = require('config');
const pako = require('pako');
const WebSocket = require('ws');
const async = require('async');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

var WsMgr = require('./ws_mgr.class.js');
var ws_mgr = new WsMgr(config.huobi.ws_url_prex_subscribe);
ws = ws_mgr.get_ws();
while (ws.readyState !== WebSocket.OPEN) {
    require('deasync').sleep(1000);
    if (ws.readyState === WebSocket.OPEN) {
        break;
    }
    console.log(ws.readyState);
}
COINS = ["BTC", "XRP", "ETH", "EOS", "TRX", "BSV", "LTC", "BCH"]
TIMES = ["CW", "NW", "CQ"]
var param_symbol = []
COINS.forEach(function(coin, index) {
    for (var period of TIMES) {
        param_symbol.push(coin+"_"+period);
    }
});
//param_symbol = ["BTC_CW", "BTC_NW", "BTC_CQ", 
//                "XRP_CW", "XRP_NW", "XRP_CQ",
//                "ETH_CW", "ETH_NW", "ETH_CQ",
//                "EOS_CW", "EOS_NW", "EOS_CQ",
//                ]
console.log(param_symbol);
param_symbol.forEach(function(symbol, index) {
    ws_mgr.ws_subscribe(symbol);
});
//demo.run_sub(ws, "sub_depth");
//demo.run_sub(ws, "sd_CW");


