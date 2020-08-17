const {argv} = require('yargs');
const repl = require('repl');
const optimizely = require('@optimizely/optimizely-sdk');

const sdkKey = ''; // Your SDK Key here

optimizely.setLogger(optimizely.logging.createLogger());
optimizely.setLogLevel(optimizely.enums.LOG_LEVEL.DEBUG);

const cli = repl.start({
    prompt: "sandbox("+sdkKey+") > "
});

const onDecision = (decisionObject) => {
    console.group();
    console.log('[EVENT] - DECISION');
    console.log(decisionObject);
    console.groupEnd();
    cli.displayPrompt();
};

const onActivate = (experiment) => {
    console.group();
    console.log('[EVENT] - ACTIVATE');
    console.log(experiment);
    console.groupEnd();
    cli.displayPrompt();
};

const onTrack = (event) => {
    console.group();
    console.log('[EVENT] - TRACK');
    console.log(event);
    console.groupEnd();
    cli.displayPrompt();
};

const onConfigUpdate = () => {
    console.log('[EVENT] - CONFIG_UPDATE');
    cli.displayPrompt();
};

const optimizelyInstance = optimizely.createInstance({
    sdkKey: sdkKey
});

optimizelyInstance.onReady().then(() => {
    optimizelyInstance.notificationCenter.addNotificationListener(optimizely.enums.NOTIFICATION_TYPES.DECISION, onDecision);
    optimizelyInstance.notificationCenter.addNotificationListener(optimizely.enums.NOTIFICATION_TYPES.ACTIVATE, onActivate);
    optimizelyInstance.notificationCenter.addNotificationListener(optimizely.enums.NOTIFICATION_TYPES.TRACK, onTrack);
    optimizelyInstance.notificationCenter.addNotificationListener(optimizely.enums.NOTIFICATION_TYPES.OPTIMIZELY_CONFIG_UPDATE, onConfigUpdate);
    cli.context.optimizely = optimizelyInstance;
    cli.context.sdkKey = sdkKey;
    cli.displayPrompt();
});


