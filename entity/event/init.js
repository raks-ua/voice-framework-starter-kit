'use strict';

let appModel = require('../app');
let eventDispatcher = require('voice-framework').eventDispatcher;

eventDispatcher.add('onInit', (event, callback) => {
    callback && callback();
});

module.exports = {

};