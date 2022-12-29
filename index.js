const config = require('./config/config');
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var ledstripRouter = require('./routes/ledstrip.route.js');

app.use('/', ledstripRouter);

app.get('/', function (req, res) {
    res.send('Hello World!');
    }
);

app.listen(config.server.port, function () {
    console.log(`${config.server.name} ${config.server.version} listening on port ${config.server.port}!`);
    }
);