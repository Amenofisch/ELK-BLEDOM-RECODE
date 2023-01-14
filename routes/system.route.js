const { json } = require('express');
var express = require('express');
var router = express.Router();
var config = require('../config/config');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/config/devices', function(req, res, next) {
    res.send(config.devices);
});

router.get('/config/devices/:id', function(req, res, next) {
    var devicesToBeSent = [];

    for (let i = 0; i < config.devices.length; i++) {
        if(config.devices[i].id == req.params.id) devicesToBeSent.push(config.devices[i]);
    }

    res.send(devicesToBeSent);
});

router.get('/config', function(req, res, next) {
    res.send({
        server: config.server,
        bluetooth: config.bluetooth,
        devices: config.devices
    });
})

module.exports = router;