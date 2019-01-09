'use strict';

let Handler = require('voice-framework').entities.Handler;
let {intentTypes} = require('voice-framework').entities.IntentTypes;
let Router = require('voice-framework').entities.Router;

let messageModel = require('../../../model/message_model');
let router = new Router((request) => {
    let p = new Promise((resolve, reject) => {
        resolve({
            ok: true
        });
    });
    return p;
});

class HelpHandler extends Handler {
    /**
     *
     * @param request {Request}
     * @param callback {Function<error>}
     */
    call(request, callback) {
        messageModel.getHelp((err, message) => {
            request.getResponse().ask(message);
            callback && callback(undefined);
        });
    }
}

let handler = new HelpHandler(intentTypes.TYPE_SPEECH, ['AMAZON.HelpIntent'], router);

module.exports = handler;
