'use strict';

let Handler = require('voice-framework').entities.Handler;
let {intentTypes} = require('voice-framework').entities.IntentTypes;
let ErrorRPC =  require('voice-framework').entities.rpc.ErrorRPC;
let messageModel = require('../../../model/message_model');


class AppRequestHandler extends Handler {

    /**
     *
     * @param request {Request}
     * @param callback {Function<error>}
     */
    call(request, callback) {
	messageModel.getSuccessResponse((err, message) => {
            request.getResponse().ask(message);
            callback && callback();
        });
    }
}

let handler = new AppRequestHandler(intentTypes.TYPE_API, 'appRequest');

module.exports = handler;
