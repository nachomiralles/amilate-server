/**
 * Created by NachoGeotec on 16/10/2015.
 */
var mongoose =  require('mongoose');
var dbURL = 'mongodb://localhost/amilatedb'
var connection = null;

module.exports = {

    connect: function connect() {
       connection = mongoose.connect(dbURL, function(err, res){
            if(err)
                throw new Error('ERROR connecting to: ' + dbURL + '. ' + err);
            console.log('Connected to: ' + dbURL);
        });

    },

    disconnect: function disconnect() {
        if(!connection) throw new Error("Please Connect Before");
        connection.disconnect();
    }
};
