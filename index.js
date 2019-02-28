var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(port);
console.log(`HTTP started on port ${port}.`);

if (process.env.NODE_ENV !== 'production') {
    var https = require('https');
    var selfsigned = require('selfsigned');
    var attrs = [{ name: 'commonName', value: 'contoso.com' }];
    var pems = selfsigned.generate(attrs, { days: 365 });
    var options = {
        key: pems.private,
        cert: pems.cert
    };

    console.log('Key', options.key)
    console.log('cert', options.cert)

    https.createServer(options, app).listen(port + 1);
    console.log(`HTTPS started on port ${port + 1}`);
}