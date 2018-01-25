"use strict";

var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'medicine_test'
});


var medicine_name = [];

function hitQuery() {
    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM medicine_list WHERE name = "유카본정"', (err, rows) => {
            // console.log(rows);
            // console.log('---WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            // connection.release();
            if (err) {
                reject();
                throw err;
            }

            medicine_name = rows;

            resolve();
        });


    });

}


module.exports = {
    medicines: () => {

        var _medicine_name = [];
        var promise = hitQuery().then(() => {
            _medicine_name = medicine_name;
            console.log(_medicine_name);
            console.log('---WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            return _medicine_name;
        }).catch(err => {
            reject(err);
        });
        // message_generation(intent).then(
        //     function () { }, {})

    }
}
