var express = require('express');
var router = express.Router();
var config = require('../config/config');

// GET /led
router.get('/', function(req, res, next) {
    res.send('This is the default LED Strip route');
});

// GET /led

router.get('/led', function(req, res, next) {
    res.send(config.devices);
});

// GET /led/:led
router.get('/led/:led', function(req, res, next) {
    res.send(config.devices[req.params.led]);
});

module.exports = router;