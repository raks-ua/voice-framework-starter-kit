'use strict';

let appModel = require('../app');
let eventDispatcher = require('voice-framework').eventDispatcher;
let Request = require('voice-framework').entities.Request;

eventDispatcher.add('onAfterRequest', (event, callback) => {
    /** @var request {Request} */
    let request = event.getData().request;
    if (event.getData().err) {
        return request.getResponse().sendError(event.getData().err);
    }
    request.getResponse().sendSuccess();
    callback && callback();
});

module.exports = {

};