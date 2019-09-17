const WebSocket = require('ws');
const pako = require('pako');

var ms = require('./ms');
class WsMgr {
    constructor(url) {
        this._ws = new WebSocket(url);
        this._ws.on('open', () => {
            ms.logger.info("socket open");
        });
        this._ws.on('close', () => {
            ms.logger.info("socket close");
        });
        this._ws.on('message', (data) => {
            let text = pako.inflate(data, {
                to: 'string'
            });
            let msg = JSON.parse(text);
            if (msg.ping) {
                ws.send(JSON.stringify({
                    pong: msg.ping
                }));
            } else if (msg.tick) {
                ms.logger.info("socket msg");
                console.log(msg.tick.asks);
                console.log(msg.tick.bids);
                console.log(msg);
                // handle(msg);
            } else {
                console.log("begin text");
                console.log(text);
                console.log("end text");
            }
        });
    }
    get_ws() { return this._ws; }
}

module.exports = WsMgr;
