'use strict';

const config = require('config');
let Express = require('express');

var app = require('express')();
var http = require('http').Server(app);
let io = require('socket.io')(http);

let appServerGoogle = require('./app-server-google');
let appServerClova = require('./app-server-clova');
let express = Express();


let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();


let eventDispatcher = require('voice-framework').eventDispatcher;
require('./entity/event/init');
require('./entity/event/end');
require('./entity/event/error');

eventDispatcher.handleServerInitRequest(function (err, data) {
    console.log('HANDLE', err, data);
});

//TODO: call events to init


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

app.get('/check', function (req, res, next) {
    res.send('OK');
});

app.post('/api/google', jsonParser, function (req, res, next) {
    //console.log(req);
    if (!req.body) return res.sendStatus(400);
    let t = Date.now();

    console.log('API GOOGLE POST request');
    console.log(JSON.stringify(req.body));
    appServerGoogle.run(req.body, (err, request) => {
        console.log('[RESULT]', err, request);
        let message = request.getResponse().getMessage();
        if (!message) message = messageModel.getError();

        let displayText = message.getMessage('text');
        let displaySSML = message.getMessage('ssml');
        let resp = {
            "richResponse": {
                "items": [
                    {
                        "simpleResponse": {
                            "ssml": displaySSML,
                            "displayText": displayText
                        }
                    }
                ]
            }
        };

        let suggestions = request.getSession().getParam('suggestions');
        if (suggestions && suggestions.length > 0) {
            resp.richResponse.suggestions = suggestions;
        }
        let d = {
            "speech": displaySSML,
            "displayText": displayText,
            "data": {
                "google": resp
            }
        };
        res.contentType('application/json');
        console.log('[RESPONSE]', JSON.stringify(d));
        console.log('[RESPONSE TIME]', (Date.now() - t) / 1000);
        res.send(JSON.stringify(d));
    });

});

app.post('/api/google/v2', jsonParser, function (req, res, next) {
    //console.log(req);
    if (!req.body) return res.sendStatus(400);
    let t = Date.now();

    console.log('API GOOGLE POST request');
    console.log(JSON.stringify(req.body));
    appServerGoogle.run(req.body, (err, request) => {
        console.log('[RESULT]', err, request);
        let message = request.getResponse().getMessage();
        if (!message) message = messageModel.getError();

        let displayText = message.getMessage('text');
        let displaySSML = message.getMessage('ssml');
        let resp = {
            "platform": "ACTIONS_ON_GOOGLE",
            "conversationToken": "[]",
            "responseMetadata": {
                "queryMatchInfo": {
                    "queryMatched": true,
                }
            },
            'richResponse': {
                'items': [
                    {
                        'simpleResponse': {
                            'ssml': displaySSML,
                            'displayText': displayText
                        }
                    }
                ]
            }
        };

        let suggestions = request.getSession().getParam('suggestions');
        if (suggestions && suggestions.length > 0) {
            resp.richResponse.suggestions = suggestions;
        }
        let d = {
            "payload": {
                "google": resp
            },
        };
        res.contentType('application/json');
        console.log('[RESPONSE]', JSON.stringify(d));
        console.log('[RESPONSE TIME]', (Date.now() - t) / 1000);
        res.send(JSON.stringify(d));
    });

});

express.post('/api/clova', jsonParser, function (req, res, next) {
    function clovaProcess() {
        appServerClova.run(req.body, (err, request) => {
            console.log('[RESULT]', err, request);
            res.contentType('application/json');
            let d = request.getResponse().getResponse();
            res.send(JSON.stringify(d));
        });
    }

    if (!req.body) return res.sendStatus(400);
    let t = Date.now();

    if (config.CLOVA && config.CLOVA.CHECK_SIGNATURE && config.CLOVA.CHECK_SIGNATURE === true) {
        let signature = req.headers['signaturecek'];
        let signatureURL = req.headers['signaturecekcertchainurl'];
        if (!signature) return res.sendStatus(403);
        if (!signatureURL) {
            if (config.CLOVA.CHECK_SIGNATURE_URL) {
                signatureURL = config.CLOVA.CHECK_SIGNATURE_URL;
            } else {
                return res.sendStatus(403);
            }
        }
        return appServerClova.verify(signature, signatureURL, JSON.stringify(req.body), (err, isValid) => {
            if (isValid === false) {
                return res.sendStatus(403);
            }
            return clovaProcess();
        });
    }
    clovaProcess();
});

app.use(function (req, res, next) {
    console.log('Not found');
    console.log(req);
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log('Not catched request');
    res.status(err.status);
    res.send({message: err.message});
});





http.listen(config['SERVER']['PORT']);
