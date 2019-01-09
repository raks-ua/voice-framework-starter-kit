'use strict';

let appModel = require('../app');
let eventDispatcher = require('voice-framework').eventDispatcher;


eventDispatcher.add('onError', (event, callback) => {
    //console.log('onError', event);
    appModel.setError(event.getData().err);
    callback && callback();
});

module.exports = {

};