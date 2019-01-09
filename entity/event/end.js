'use strict';

let appModel = require('../app');
let eventDispatcher = require('voice-framework').eventDispatcher;

eventDispatcher.add('onEnd', (event, callback) => {
    //console.log('onEnd', event);
//    console.log('end');
    callback && callback();
});


module.exports = {

};