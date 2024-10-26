const dbConfig = require('./dbConfig.json')[process.env.NODE_ENV]

let appConfig = {};

appConfig.redis_url = dbConfig.redis_url;
appConfig.allowedCorsOrigin = "*";
appConfig.apiVersion = '/api/v1';
appConfig.sessionExpTime = (120 * 120);
appConfig.db = {
    uri: `mongodb+srv://${dbConfig.username}:${dbConfig.password}@chatbotx.acjt1z0.mongodb.net/`

};



module.exports = appConfig;