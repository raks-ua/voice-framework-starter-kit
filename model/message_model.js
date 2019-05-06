'use strict';

let Message = require('voice-framework').entities.Message;

const config = require('config');

class MessageModel {

    getSuccessResponse(callback){
        callback && callback(undefined, new Message({ok: true}));
    }

}

module.exports = new MessageModel();