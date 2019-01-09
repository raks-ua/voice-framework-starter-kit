let config = require('config');
let AppModel = require('voice-framework').models.AppModel;

let appModel = new AppModel({
    alexa: {
        appId: config.ALEXA.APP_ID
    }
});


module.exports = appModel;
