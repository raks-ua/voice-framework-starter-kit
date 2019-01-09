'use strict';

let appModel = require('../app');
let eventDispatcher = require('voice-framework').eventDispatcher;
let Request = require('voice-framework').entities.Request;

eventDispatcher.add('onRequest', (event, callback) => {
    try {
        /** @var request {Request} */
        let request = event.getData().request;
        if(!request) return callback && callback('No request');
        appModel.process(event.getData().app, request).then(() => {
            callback && callback();
        }).catch((err) => {
            callback && callback(err);
        });
    } catch (err) {
        console.log(err);
        callback && callback(err);
    }
});

module.exports = {

};