'use strict';
//Using for Alexa AWS Lambda
let eventDispatcher = require('voice-framework').eventDispatcher;

require('./entity/event/init');
require('./entity/event/before_request');
require('./entity/event/request');
require('./entity/event/after_request');
require('./entity/event/end');
require('./entity/event/error');

require('./app-handlers');

exports.handler = function (event, context, callback) {
    eventDispatcher.handleAlexaAppRequest(event, context, callback);
};