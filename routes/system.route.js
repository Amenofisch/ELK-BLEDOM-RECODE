var express = require('express');
var router = express.Router();
var config = require('../config/config');

// This route returns the config of the server
router.get('/config', function(req, res, next) {
    res.send(config);
});


module.exports = router;