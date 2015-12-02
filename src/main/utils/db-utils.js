'use strict';
const pg = require('pg');
const _ = require('lodash');

// DB configuration
pg.defaults.poolSize = 10;
pg.defaults.poolIdleTimeout = 2;

const connectionConfiguration = {
    user: 'amilate-user',
    password: '1234',
    //user: 'postgres',
    //password: 'nachosu',
    port: 5050,
    host: 'localhost',
    database: 'amilate-db'
};

// Default handlers
const defaultProcessRow = function(row) {
    return row;
};
const defaultProcessResult = function(result) {
    return result.rows;
};

const pgUtils = {

    executeQuery: (options) => {
        // Promise
        return new Promise((resolve, reject) => {

            if( ! options ) throw new Error('Bad query, no options');
            if( ! options.statement ) throw new Error('Bad query, no statement to be executed');

            // Default onRow
            const processRow = options.processRow && _.isFunction(options.processRow) ? options.processRow : defaultProcessRow;
            const processResult = options.processResult && _.isFunction(options.processResult) ? options.processResult : defaultProcessResult;

            pg.connect(connectionConfiguration, function(err, client, done) {

                if( err ) {
                    console.error('Error on pg.connect: ', err);
                    reject('Error connecting to the database');
                }

                client.query(options.statement)
                    .on('error', reject)
                    .on('row', (row, result) => {
                        // Call the fuction
                        const finalRow = processRow.call(null, row);
                        // Add the row to the result
                        result.addRow(finalRow);
                    })
                    .on('end', (result) => {
                        // Call the function
                        const finalResutl = processResult.call(null, result);
                        // Finish with Postgres
                        done();
                        // Resolve
                        resolve(finalResutl);
                    });

            });

        });

    }

};

module.exports = pgUtils;











///**
// * Created by NachoGeotec on 16/10/2015.
// */
//var mongoose =  require('mongoose');
//var dbURL = 'mongodb://localhost/amilatedb'
//var connection = null;
//
//module.exports = {
//
//    connect: function connect() {
//       connection = mongoose.connect(dbURL, function(err, res){
//            if(err)
//                throw new Error('ERROR connecting to: ' + dbURL + '. ' + err);
//            console.log('Connected to: ' + dbURL);
//        });
//
//    },
//
//    disconnect: function disconnect() {
//        if(!connection) throw new Error("Please Connect Before");
//        connection.disconnect();
//    }
//};
