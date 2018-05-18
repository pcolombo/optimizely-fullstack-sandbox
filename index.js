var request = require('request');
var repl = require('repl');
var optimizely = require('@optimizely/optimizely-sdk');
var defaultLogger = require('@optimizely/optimizely-sdk/lib/plugins/logger');

var datafile, optimizelyClient, replServer;

var datafileUrl = "";
var projectId = datafileUrl.substring(datafileUrl.indexOf('/s/')+4, datafileUrl.indexOf('.json'));

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
