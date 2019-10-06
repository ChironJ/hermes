const config = require('config');

function ws_subscribe(ws, intf_no) {
    let targetIntf = config.ws_interfaces.ws_sub.filter(x => x.intf_no === intf_no)[0];
    console.log("begin subscribe");
    console.log(targetIntf);
    console.log("above is target");
    targetIntf && ws.send(JSON.stringify(targetIntf.sample));
}

function ws_request(ws, intf_no) {
    let targetIntf = config.ws_interfaces.ws_req.filter(x => x.intf_no === intf_no)[0];
    targetIntf && ws.send(JSON.stringify(targetIntf.sample));
}

exports.run_sub = ws_subscribe;
exports.run_req = ws_request;

