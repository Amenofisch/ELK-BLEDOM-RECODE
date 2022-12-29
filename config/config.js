var Ledstrip = require('../modules/ledstrip.mod.js');

class Config {
    static server = {
        name: "ELK-BLEDOM-RECODE",
        version: "v1.0.0",
        port: 5000
    };
    static bluetooth = {
        device: "hci0"
    }
    static devices = [
        new Ledstrip("ELK-BLEDOM 1", "BE:FF:20:00:06:FF", "0x0008"),
        new Ledstrip("ELK-BLEDOM 2", "BE:59:0D:00:16:DB", "0x0009"),
    ]
}

module.exports = { Config }; 