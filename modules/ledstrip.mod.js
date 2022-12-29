var shell = require("shelljs");

/**
 * @class Ledstrip
 * @param {string} name The name of the LED strip
 * @param {string} bid The Bluetooth ID of the LED strip
 * @param {string} handle The handle of the LED strip
 * @param {string} device The Bluetooth device to use
 */
class Ledstrip {
    constructor(name, bid, handle, device) {
        this.name = name;
        this.bid = bid;
        this.handle = handle;
        this.device = device;
    }

    d2h(d) {
        var s = (+d).toString(16);
        if (s.length < 2) s = '0' + s;
        return s;
    } 

    async setColor(value) {
        value = value.replace("#", ""); // Remove the # if it's there

        console.log(`Setting color for ${this.name} to ${value} at handle ${this.handle} on device ${this.bid}`);
        await shell.exec(`gatttool -i ${this.device} -b ${this.bid} --char-write-req -a ${this.handle} -n 7e070503${value}10ef`);
        if (shell.error()) return false;
        return true;    
    }

    async setPower(value) {
        console.log(`Setting power for ${this.name} to ${value} at handle ${this.handle} on device ${this.bid}`);
        await shell.exec(`gatttool -i ${this.device} -b ${this.bid} --char-write-req -a ${this.handle} -n ${value ? "7e0404f00001ff00ef" : "7e0404000000ff00ef"}`);
        if (shell.error()) return false;
        return true;
    }
    
    async setBrightness(value) {
        if(value < 0 || value > 100) throw new Error("Brightness must be between 0 and 100");
        value = this.d2h(value);
        console.log(`Setting brightness for ${this.name} to ${value} at handle ${this.handle} on device ${this.bid}`);

        await shell.exec(`gatttool -i ${this.device} -b ${this.bid} --char-write-req -a ${this.handle} -n 7e0401${value}01ffff00ef`);
        if (shell.error()) return false;
        return true;
    }

    async sendCustom(value) {
        console.log(`Sending custom command for ${this.name} to ${value} at handle ${this.handle} on device ${this.bid}`);
        await shell.exec(`gatttool -i ${this.device} -b ${this.bid} --char-write-req -a ${this.handle} -n ${value}`);
        if (shell.error()) return false;
        return true;
    }
}

module.exports = Ledstrip;