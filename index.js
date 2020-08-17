const {argv} = require('yargs');
const repl = require('repl');
const optimizely = require('@optimizely/optimizely-sdk');
const { on } = require('events');

const sdkKey = '864stri3CRupHT7JVwgSpt'; // Your SDK Key here

optimizely.setLogger(optimizely.logging.createLogger());
optimizely.setLogLevel(optimizely.enums.LOG_LEVEL.DEBUG);

const cli = repl.start({
    prompt: "sandbox("+sdkKey+") > "
});

const onDecision = (decisionType, userId, attributes, decisionInfo) => {
    console.log('[EVENT] - DECISION');
    console.log(decisionType);
    cli.displayPrompt();
};

const onActivate = (experiment, userId, attributes, varation, event) => {
    console.log('[EVENT] - ACTIVATE');
    cli.displayPrompt();
};

const onTrack = (event) => {
    console.log('[EVENT] - TRACK');
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


