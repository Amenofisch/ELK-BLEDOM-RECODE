var express = require('express');
var router = express.Router();
var config = require('../config/config');

router.get('/', function(req, res, next) {
    res.send('This is the default LED Strip route');
});

router.get('/led', function(req, res, next) {
    res.send(config.devices);
});

router.get('/led/:id', function(req, res, next) {
    res.send(config.devices[req.params.id]);
});

router.post('/led/power/:id', function(req, res, next) {
    let value = req.body.value;
    if(value == undefined) return res.status(400).send("No value specified");
    if(typeof value != "boolean") return res.status(400).send("Value must be a boolean");

    let device = config.devices[req.params.id];
    device.setPower(value);
});

router.post('/led/brightness/:id', function(req, res, next) {
    let value = req.body.value;
    if(value == undefined) return res.status(400).send("No value specified");
    if(typeof value != "number") return res.status(400).send("Value must be a number");

    let device = config.devices[req.params.id];
    device.setBrightness(value);
});

router.post('/led/color/:id', function(req, res, next) {
    let value = req.body.value;
    if(value == undefined) return res.status(400).send("No value specified");
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let device = config.devices[req.params.id];
    device.setColor(value);
});

module.exports = router;