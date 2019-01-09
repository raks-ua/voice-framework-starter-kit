'use strict';

let appModel = require('../app');
let eventDispatcher = require('voice-framework').eventDispatcher;

eventDispatcher.add('onBeforeRequest', (event, callback) => {
    let request = appModel.getRequest(event.getData().app, event.getData().appEvent, {context: event.getData().appContext, callback: event.getData().appCallback});
    event.data.request = request;
    callback && callback();
});

module.exports = {

};