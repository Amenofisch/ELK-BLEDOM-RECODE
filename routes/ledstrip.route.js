var express = require('express');
var router = express.Router();
var config = require('../config/config');

// This route returns the config of all devices
router.get('/', function(req, res, next) {
    res.send(config.devices);
});

// This route takes a custom command for all devices
router.post('/custom', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let resp = [];
    for(let i = 0; i < config.devices.length; i++) {
        resp.push(config.devices[i].sendCustom(value)).then((status) => {
            return "status: " + status;
        });;
    }
    res.send(resp);
});

// This route returns the config of a single device
router.get('/:id', function(req, res, next) {
    res.send(config.devices[req.params.id]);
});

// This route controls the power of all devices
router.post('/power', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "boolean") return res.status(400).send("Value must be a boolean");

    let resp = [];
    for(let i = 0; i < config.devices.length; i++) {
        resp.push(config.devices[i].setPower(value)).then((status) => {
            return "status: " + status;
        });;
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
        resp.push(config.devices[i].setBrightness(value)).then((status) => {
            return "status: " + status;
        });
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

// This route takes a custom command for a single device
router.post('/custom/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let device = config.devices[req.params.id];
    let resp = device.sendCustom(value);
    res.send(resp);
});

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

module.exports = router;