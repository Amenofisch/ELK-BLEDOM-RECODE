var express = require('express');
var router = express.Router();
var config = require('../config/config');

// This route returns the config of all devices
router.get('/', function(req, res, next) {
    res.send(config.devices);
});

// This route returns the config of a single device
router.get('/:id', function(req, res, next) {
    res.send(config.devices[req.params.id]);
});

/**
 * This section is for controlling all devices
 * This is done by looping through the config and calling the functions
 */

// This route controls the power of all devices
router.post('/power', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "boolean") return res.status(400).send("Value must be a boolean");

    let resp = [];
    for(let i = 0; i < config.devices.length; i++) {
        resp.push("status: " + config.devices[i].setPower(value));
    }
    res.send(resp);
})

// This route controls the brightness of all devices
router.post('/brightness', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "number") return res.status(400).send("Value must be a number");

    let resp = [];
    for(let i = 0; i < config.devices.length; i++) {
        resp.push("status: " + config.devices[i].setBrightness(value));
    }
    res.send(resp);
})

// This route controls the color of all devices
router.post('/color', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let resp = [];
    for(let i = 0; i < config.devices.length; i++) {
        resp.push(config.devices[i].setColor(value.toLowerCase()).then((status) => {
            return "status: " + status;
        }));
    }
    res.send(resp);
})

// This route takes a custom command for all devices
router.post('/custom', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let resp = [];
    for(let i = 0; i < config.devices.length; i++) {
        resp.push("status: " + config.devices[i].sendCustom(value));
    }
    res.send(resp);
});

/**
 * This section is for controlling a single device
 * The routes are the same as above, but with an id parameter
 * The id parameter is used to select a single device from the config
 * The id parameter is the index of the device in the config
 * These routes are usefull for when you don't want to use the main route (aka. being lazy)
 */

// This route controls the power of a single device
router.post('/power/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "boolean") return res.status(400).send("Value must be a boolean");

    let device = config.devices[req.params.id];
    let resp = device.setPower(value);
    res.send(resp);
});

// This route controls the brightness of a single device
router.post('/brightness/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "number") return res.status(400).send("Value must be a number");

    let device = config.devices[req.params.id];
    let resp = device.setBrightness(value);
    res.send(resp);
});

// This route controls the color of a single device
router.post('/color/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let device = config.devices[req.params.id];
    let resp = device.setColor(value.toLowerCase());
    res.send(resp);
});

// This route takes a custom command for a single device
router.post('/custom/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let device = config.devices[req.params.id];
    let resp = device.sendCustom(value);
    res.send(resp);
});

/**
 * These routes are for controlling multiple devices at once
 * They all take an array of device id's in the body (these are the same id's as the ones in the config file, basically the index of the device in the array)
 * They also take a value in the body, this value is different for each route (see above)
 */

router.post('/power/', function(req, res, next) {
    if(req.body.value == undefined || req.body.devies == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    let devices = req.body.devices;

    if(typeof value != "boolean") return res.status(400).send("Value must be a boolean");
    if(typeof devices != "object") return res.status(400).send("Devices must be an array");

    let resp = [];
    for(let i = 0; i < devices.length; i++) {
        resp.push("status: " + config.devices[devices[i]].setPower(value));
    }
    res.send(resp);
})

router.post('/brightness/', function(req, res, next) {
    if(req.body.value == undefined || req.body.devies == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    let devices = req.body.devices;

    if(typeof value != "number") return res.status(400).send("Value must be a number");
    if(typeof devices != "object") return res.status(400).send("Devices must be an array");

    let resp = [];
    for(let i = 0; i < devices.length; i++) {
        resp.push("status: " + config.devices[devices[i]].setBrightness(value));
    }
    res.send(resp);
})

router.post('/color/', function(req, res, next) {
    if(req.body.value == undefined || req.body.devies == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    let devices = req.body.devices;

    if(typeof value != "string") return res.status(400).send("Value must be a string");
    if(typeof devices != "object") return res.status(400).send("Devices must be an array");

    let resp = [];
    for(let i = 0; i < devices.length; i++) {
        resp.push(config.devices[devices[i]].setColor(value.toLowerCase()).then((status) => {
            return "status: " + status;
        }));
    }
    res.send(resp);
})

router.post('/custom/', function(req, res, next) {
    if(req.body.value == undefined || req.body.devies == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    let devices = req.body.devices;

    if(typeof value != "string") return res.status(400).send("Value must be a string");
    if(typeof devices != "object") return res.status(400).send("Devices must be an array");

    let resp = [];
    for(let i = 0; i < devices.length; i++) {
        resp.push("status: " + config.devices[devices[i]].sendCustom(value));
    }
    res.send(resp);
})

module.exports = router;