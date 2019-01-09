'use strict';

let Message = require('voice-framework').entities.Message;

const config = require('config');

class MessageModel {

    getAppName() {
        return 'Your app name';
    };

    getWelcome(callback) {
        let appName = this.getAppName();
        let msgText = 'Welcome to ' + appName;
        let message = new Message(msgText);
        message.setMessageSSML(msgText);
        message.setMessageRepromptSSML(msgText);
        callback && callback(undefined, message);
    }

    getStop(callback) {
        let msgText = 'Stop message';
        let message = new Message(msgText);
        message.setMessageSSML(msgText);
        message.setMessageRepromptSSML(msgText);
        callback && callback(undefined, message);
    }

    getError() {
        let msgText = 'Try again';
        let message = new Message(msgText);
        message.setMessageSSML(msgText);
        message.setMessageRepromptSSML(msgText);
        return message;
    };

    getHelp(callback){
        let msgText = 'Help message';
        let message = new Message(msgText);
        message.setMessageSSML(msgText);
        message.setMessageRepromptSSML(msgText);
        callback && callback(undefined, message);
    }
}

module.exports = new MessageModel();