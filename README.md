# Optimizely Full Stack Sandbox
A CLI implementation of Optimizely's NodeJS Full Stack SDK. 

[Optimizely Node SDK Documentation](https://docs.developers.optimizely.com/full-stack/docs/javascript-node-sdk)

[optimizely/javascript-sdk](https://github.com/optimizely/javascript-sdk)

## Installation
1. Run `npm install`
2. Open `index.js` and set `sdkKey` to your SDK key

## Usage
1. Run `npm start`
2. Sandbox will fetch your datafile and initialize the Optimizely SDK as `optimizely`
3. Call any SDK method on `optimizely`, e.g. `optimizely.activate('my_experiment','some_user_id')`