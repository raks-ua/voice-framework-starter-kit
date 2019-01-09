'use strict';

let Handler = require('voice-framework').entities.Handler;
let {intentTypes} = require('voice-framework').entities.IntentTypes;
let Router = require('voice-framework').entities.Router;
let Message = require('voice-framework').entities.Message;

let messageModel = require('../../../model/message_model');

class WelcomeHandler extends Handler {

    /**
     *
     * @param request {Request}
     * @param callback {Function<error>}
     */
    call(request, callback) {
        messageModel.getWelcome((err, message) => {
            request.getResponse().ask(message);
            callback && callback(undefined);
        });
    }
}

let handler = new WelcomeHandler(intentTypes.TYPE_SPEECH, 'WelcomeIntent');

module.exports = handler;
