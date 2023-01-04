var Ledstrip = require('../modules/ledstrip.mod.js');

module.exports = class Config {
    // Change these settings if you have multiple instances of this server
    static server = {
        name: "ELK-BLEDOM-RECODE",
        version: "v1.0.0", // Do not change this
        port: 5000
    };
    static bluetooth = {
        device: "hci0"
    }
    // You can add as many LED strips as you want here
    static devices = [
        new Ledstrip(0, "ELK-BLEDOM 1", "BE:FF:20:00:06:FF", "0x0008", this.bluetooth.device),
        new Ledstrip(1, "ELK-BLEDOM 2", "BE:59:0D:00:16:DB", "0x0009", this.bluetooth.device),
    ]
}