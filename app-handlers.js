let appModel = require('./entity/app');

let launchHandler = require('./entity/handler/speech/launch_handler');
let welcomeHandler = require('./entity/handler/speech/welcome_handler');
let stopHandler = require('./entity/handler/speech/stop_handler');
let helpHandler = require('./entity/handler/speech/help_handler');


appModel.addHandler(launchHandler);
appModel.addHandler(welcomeHandler);
appModel.addHandler(stopHandler);
appModel.addHandler(helpHandler);

exports = {};