const config = require('config');
const log = require('./log');
const WsMgr = require('./ws_mgr.class.js');

process.on('uncaughtException', (error => {
    log.logger.error(error);
    // process.exit(1);
}));

process.on('unhandledRejection', (reason, p) => {
    log.logger.error('Unhandled Rejection at:', p, 'reason:', reason);
    // process.exit(1);
});

async function main() {
    let ws_mgr = new WsMgr(config.huobi.ws_url_prex_subscribe);
    await ws_mgr.init_ws();

    let COINS = ["BTC", "XRP", "ETH", "EOS", "TRX", "BSV", "LTC", "BCH"],
        TIMES = ["CW", "NW", "CQ"],
        param_symbol = [];

    COINS.forEach((coin) => {
        for (let period of TIMES) {
            param_symbol.push(coin + "_" + period);
        }
    });

    console.log(param_symbol);
    param_symbol.forEach((symbol) => {
        ws_mgr.ws_subscribe(symbol);
    });
}

main().then(() => log.logger.info('app start success')).catch((e) => log.logger.error(e));
