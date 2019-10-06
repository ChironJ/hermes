const WebSocket = require('ws');
const pako = require('pako');
const config = require('./config/data_stgy.json');
const DataStgy = require('./stgy/data_stgy');

const log = require('./log');

class WsMgr {
    constructor(url) {
        this._ws = new WebSocket(url);
        this.init_ws();
        this.agentchain = new Map();
        console.log(config.data_stgy_list);
        for (let x of config.data_stgy_list) {
            this.agentchain.set(x, DataStgy[x]);
        }
    }

    init_ws() {
        this._ws.on('open', () => {
            log.logger.info("socket open");
        });
        this._ws.on('close', () => {
            log.logger.info("socket close");
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
                log.logger.info("socket ping");
            } else if (msg.tick) {
                //ms.logger.info("socket msg");
                for (let v of this.agentchain.values()) {
                    v(msg);
                }
                // handle(msg);
            } else {
                log.logger.info("socket text " + text);
            }
        });
        this._ws.on('error', (e) => {
            log.logger.error(e);
        });
    }

    get_ws() {
        return this._ws;
    }

    ws_subscribe(symbol, type, id) {
        symbol = symbol || "BTC_CQ"
        type = type || "step0"
        id = id || "id1"
        const body = {};
        body["sub"] = "market." + symbol + ".depth." + type;
        body["id"] = id
        console.log(body);
        body && this._ws.send(JSON.stringify(body));
    }
}

module.exports = WsMgr;
