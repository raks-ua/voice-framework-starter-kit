'use strict';

let Handler = require('voice-framework').entities.Handler;
let {intentTypes} = require('voice-framework').entities.IntentTypes;
let Router = require('voice-framework').entities.Router;

let welcomeHandler = require('./welcome_handler');

class LaunchHandler extends Handler {

    /**
     *
     * @param request {Request}
     * @param callback {Function<error>}
     */
    call(request, callback){
        console.log('Launch Handler');
    }
}

let router = new Router((request)=>{
    let p = new Promise((resolve, reject) => {
        resolve({
            ok: false,
            handler: welcomeHandler
        });
    });
    return p;
});


let handler = new LaunchHandler(intentTypes.TYPE_SPEECH, 'LaunchRequest', router);

module.exports = handler;