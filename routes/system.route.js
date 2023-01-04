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
    res.send(config.devices.where(d => d.id == req.params.id));
});

router.get('/config', function(req, res, next) {
    res.send({
        server: config.server,
        bluetooth: config.bluetooth,
        devices: config.devices
    });
})

module.exports = router;