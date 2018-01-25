"use strict"

// var MedicineService = require('./MedicineService');

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
    
    

    metadata: () => ({
        "name": "MedicineRetrieval",
        "properties": {
            "medicineName": { "type": "string", "required": true }
        },
        "supportedActions": [

        ]
    }),

    invoke: (conversation, done) => {
        // var _medicine_name = [];
        var promise = hitQuery().then(() => {
            // _medicine_name = medicine_name;
            console.log(medicine_name);
            console.log('---WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            // return _medicine_name;
            // var medicines = MedicineService.medicines();
            conversation.reply({ text: '컴포넌트에서 출력한 대답입니다.' + medicine_name });
        }).catch(err => {
            reject(err);
        });





        done();
    }
};