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

class StopHandler extends Handler {
    /**
     *
     * @param request {Request}
     * @param callback {Function<error>}
     */
    call(request, callback) {
        messageModel.getStop((err, message) => {
            request.getResponse().tell(message);
            callback && callback(undefined);
        });
    }
}

let handler = new StopHandler(intentTypes.TYPE_SPEECH, ['AMAZON.CancelIntent', 'AMAZON.StopIntent'], router);

module.exports = handler;
