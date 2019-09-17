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
console.log("here");
ws = ws_mgr.get_ws();
while (ws.readyState !== WebSocket.OPEN) {
    require('deasync').sleep(100);
    if (ws.readyState === WebSocket.OPEN) {
        break;
    }
    console.log(ws.readyState);
}

demo.run_sub(ws, "sd");






var rl = readline.createInterface(process.stdin, process.stdout);

var recursiveAsyncReadLine = function () {
    var ws = new WebSocket(config.huobi.ws_url_prex_subscribe);
    ws.on('open', () => {
        console.log('socket open succeed. input your command, or "h" to get help');
    });
    ws.on('close', () => {
        console.log('socket close succeed.');
    });
    ws.on('message', (data) => {
        let text = pako.inflate(data, {
            to: 'string'
        });
        let msg = JSON.parse(text);
        if (msg.ping) {
            ws.send(JSON.stringify({
                pong: msg.ping
            }));
            console.log("ping");
        } else if (msg.tick) {
            console.log("begin msg");
            console.log(msg.tick.asks);
            console.log(msg.tick.bids);
            console.log(msg);
            console.log("end msg");
            // handle(msg);
        } else {
            console.log("begin text");
            console.log(text);
            console.log("end text");
        }
    });
    rl.question('Command: ', function (answer) {
        switch (answer){
            case 'exit':
              ws.close();
              return rl.close();
            case 's1':
            case 's2':
            case 's3':
            case 'sd':
            case 'st':
              demo.run_sub(ws, answer);break;  
            case 'r1':
            case 'r2':
            case 'rn':
              demo.run_req(ws, answer);break;  
            case 'h':
              console.log('Req请求指令列表如下:');
              var getIntfs = config.ws_interfaces.ws_req;
              getIntfs.forEach(e => {
                console.log(e.tip, e.intf_no);
              });
              console.log('Ws注册指令列表如下:');
              var postIntfs = config.ws_interfaces.ws_sub;
              postIntfs.forEach(e => {
                console.log(e.tip, e.intf_no);
              });
              break;  

            default:
              console.log('请输入指令, 比如s1, s2, s1, r1, r2..., 指令列表请输入h, 退出输入exit');break;  
        }
      (ws.readyState === WebSocket.OPEN) && ws.close();
      recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
  };

//recursiveAsyncReadLine(); 
class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

var pt = new Point(2, 3);
console.log(pt.toString());
