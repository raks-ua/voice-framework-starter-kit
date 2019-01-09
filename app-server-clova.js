'use strict';
//Using for Clova Server
let eventDispatcher = require('voice-framework').eventDispatcher;

require('./entity/event/before_request');
require('./entity/event/request');
require('./entity/event/after_request');

require('./app-handlers');

exports.run = function (event, callback) {
    eventDispatcher.handleServerAppRequest('clova', event, callback);
};
