const osc = require("node-osc");
const NetworkUtils = require("../utils/networkUtils");
const config = require("../config/config");

class OSCService {
  constructor() {
    this.serverIp = NetworkUtils.getLocalIpAddress();
    this.client = new osc.Client(this.serverIp, config.osc.port);
    console.log(
      `OSC Client configured to send to ${this.serverIp}:${config.osc.port}`,
    );
  }

  sendMessage(address, value) {
    return new Promise((resolve, reject) => {
      this.client.send(address, value, (err) => {
        if (err) {
          console.error(
            `Error sending OSC to ${address} with value ${value}:`,
            err,
          );
          reject(err);
        } else {
          console.log(`OSC sent to ${address} with value ${value}`);
          resolve();
        }
      });
    });
  }
}

module.exports = OSCService;
