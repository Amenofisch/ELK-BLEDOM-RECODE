const { json } = require('express');
var express = require('express');
var router = express.Router();
var config = require('../config/config');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// This route returns the config of the server
router.get('/config', function(req, res, next) {
    res.send(config);
});

router.get('/config/devices', function(req, res, next) {
    res.send(config.devices);
});

router.get('/config/devices/:id', function(req, res, next) {
    res.send(config.devices[req.params.id]);
});

module.exports = router;