var request = require('request');
var repl = require('repl');
var util = require('util');
var optimizely = require('@optimizely/optimizely-sdk');
var defaultLogger = require('@optimizely/optimizely-sdk/lib/plugins/logger');
var optimizelyEnums = require('@optimizely/optimizely-sdk/lib/utils/enums');

var datafile, optimizelyClient, replServer;

var datafileUrl = "";
var projectId = datafileUrl.substring(datafileUrl.indexOf('/s/')+4, datafileUrl.indexOf('.json'));

var enableListeners = (process.argv[2] == 'listeners' ? true : false)

request({
    url: datafileUrl,
    json: true
}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        datafile = body;
        Main(body);
    } else {
        console.log(error + " : " + response.statusCode);
    }
});

function getActiveExperiments() {
	for (i=0;i<datafile.experiments.length;++i) {
		if(datafile.experiments[i].status == "Running") console.log(datafile.experiments[i].key);
	}
};

function onActivate(activateObject) {
    console.log();
    console.log('Activate Listener Triggered: \n', util.inspect(activateObject,{depth: null}),'\n');
}

function onTrack(trackObject) {
    console.log();
    console.log('Track Listener Triggered: \n', util.inspect(trackObject,{depth: null}),'\n');
}

function Main(datafile) {
	
    console.log("---------------------------------------");
    console.log("Client ready using Project: "+projectId);
    console.log("Active Experiments:");
    getActiveExperiments();
    console.log("---------------------------------------");
    

    optimizelyClient = optimizely.createInstance({ 
    	datafile: datafile,
    	logger: defaultLogger.createLogger({logLevel:1}),
    });

    if (enableListeners) {
        var activateId = optimizelyClient.notificationCenter.addNotificationListener(
              optimizelyEnums.NOTIFICATION_TYPES.ACTIVATE,
              onActivate
        );

        var trackId = optimizelyClient.notificationCenter.addNotificationListener(
              optimizelyEnums.NOTIFICATION_TYPES.TRACK,
              onTrack
        );
    }

    
    replServer = repl.start({
        prompt: "optimizely-fullstack-sandbox(" + projectId + ") > "
    });

    replServer.context.optimizely = optimizely;
    replServer.context.optimizelyClient = optimizelyClient;
    replServer.context.projectId = projectId;
    replServer.context.datafile = datafile;
    replServer.context.getActiveExperiments = getActiveExperiments;
    replServer.displayPrompt();
};
