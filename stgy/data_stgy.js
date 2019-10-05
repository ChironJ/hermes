const log = require('../log');
var redis = require('redis');
client = redis.createClient(6379, '127.0.0.1', {});

class DataStgy {
    static base_stgy(msg) {
        //console.log(msg.tick.asks);
        var ask1 = 0;
        for (let x of msg.tick.asks) { 
            //console.log("ask:"+x);
            ask1 = x;
            break;
        }
        var bid1 = 0;
        for (let x of msg.tick.bids) { 
            //console.log("bid:"+x);
            bid1 = x;
            break;
        }
        //log.logger.info(msg.tick);
        //console.log(msg.tick.ch);
        client.set(msg.tick.ch, JSON.stringify(msg.tick));
        log.logger.info("###{\"ch\":\""+msg.tick.ch+
                    "\",\"ask\":\""+ask1+
                    "\",\"bid\":\""+bid1+
                    "\",\"spread\":\""+(ask1[0]-bid1[0])+"\"}###");
    }
    static t100_stgy(msg) {
        //console.log("t100 data")

    }
}


module.exports = DataStgy
