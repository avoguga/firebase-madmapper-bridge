const os = require("os");

class NetworkUtils {
  static getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
      for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
    return "127.0.0.1";
  }
}

module.exports = NetworkUtils;
