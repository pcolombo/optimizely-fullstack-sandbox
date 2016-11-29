# Optimizely Full Stack Sandbox
A CLI implementation of Optimizely's NodeJS FullS stack SDK. 

[Optimizely Node SDK Documentation](https://developers.optimizely.com/x/solutions/sdks/reference/?language=node)

## Installation
1. Run `npm install`
2. Open `index.js` and set `projectId` to your Full Stack project ID

## Usage
1. Run `npm start`
2. Sandbox will fetch your datafile and initialize the Optimizely SDK as `optimizelyClient`
3. Call any SDK method on `optimizelyClient`, e.g. `optimizelyClient.activate('my_experiment','some_user_id')`
