const { json } = require('express');
var express = require('express');
var router = express.Router();
var config = require('../config/config');

// This route returns the config of the server
router.get('/config', function(req, res, next) {
    res.send(JSON.stringify(config));
});

router.get('/config/devices', function(req, res, next) {
    res.send(JSON.stringify(config.devices));
});

router.get('/config/devices/:id', function(req, res, next) {
    res.send(JSON.stringify(config.devices[req.params.id]));
});

module.exports = router;