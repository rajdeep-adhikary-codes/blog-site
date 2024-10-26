
let dataAPI;
const mode = process.env.NODE_ENV;
const mongoose = require('mongoose');
const server = require('../rest/server');
const appConfig = require('../../config/appConfig');
const db = {};
const redis = require('redis');


const startDB = (app,db_type)=>{
    switch(db_type){
        case "mongo" :
            console.log(`Environment : ${process.env.NODE_ENV} Database : ${process.env.DATABASE_TYPE}`);
            try{
                /**
                 * database connection settings
                 */

                mongoose.connect(appConfig.db.uri,{ useNewUrlParser: true});
                //mongoose.set('debug', true);

                console.log(`DB URL : ${appConfig.db.uri}`);
                
                
                mongoose.connection.on('error', function (err) {
                    console.log(`database error:${err}`);
                    process.exit(1)
                }); // end mongoose connection error
                
                mongoose.connection.on('open', function (err) {
                if (err) {
                    console.log(`database error:${JSON.stringify(err)}`);
                    process.exit(1)
                } else {
                    console.log("database connection open success");
                    /**
                     * Create HTTP server.
                     */
                    server.startServer(app);
                }
                }); // end mongoose connection open handler
            }catch(err){
                console.log(`Database Connection Open Error : ${err}`);
            }
            break;

        default:
            console.log('No Database Connected,webserver will not start!');
    }
}
mongoose.set('debug', true);


module.exports = {
    startDB : startDB
}