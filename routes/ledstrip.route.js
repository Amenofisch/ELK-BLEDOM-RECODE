var express = require('express');
var router = express.Router();
var config = require('../config/config');

router.get('/', function(req, res, next) {
    res.send(config.devices);
});

router.get('/:id', function(req, res, next) {
    res.send(config.devices[req.params.id]);
});

router.post('/power/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "boolean") return res.status(400).send("Value must be a boolean");

    let device = config.devices[req.params.id];
    let resp = device.setPower(value);
    res.send(resp);
});

router.post('/brightness/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "number") return res.status(400).send("Value must be a number");

    let device = config.devices[req.params.id];
    let resp = device.setBrightness(value);
    res.send(resp);
});

router.post('/color/:id', function(req, res, next) {
    if(req.body.value == undefined) return res.status(400).send("No value specified");
    let value = req.body.value;
    if(typeof value != "string") return res.status(400).send("Value must be a string");

    let device = config.devices[req.params.id];
    let resp = device.setColor(value.toLowerCase());
    res.send(resp);
});

module.exports = router;