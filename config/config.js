var Ledstrip = require('../modules/ledstrip.mod.js');

module.exports = class Config {
    static server = {
        name: "ELK-BLEDOM-RECODE",
        version: "v1.0.0",
        port: 5000
    };
    static bluetooth = {
        device: "hci0",
    }
    static devices = [
        new Ledstrip("ELK-BLEDOM 1", "00:1A:22:0B:0C:0D", "0x0008"),
        new Ledstrip("ELK-BLEDOM 2", "00:1A:22:0B:0C:0E", "0x0009"),
    ]
}