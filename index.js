const config = require('./config/config');
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var ledstripRouter = require('./routes/ledstrip.route.js');
var systemRouter = require('./routes/system.route.js');

app.use('/led', ledstripRouter);
app.use('/', systemRouter);

// return null for favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// return server version, name and port for /
app.get('/', (req, res) => res.send(`${config.server.name} ${config.server.version} listening on port ${config.server.port}!`));

app.listen(config.server.port, function () {
    console.log(`${config.server.name} ${config.server.version} listening on port ${config.server.port}!`);
});