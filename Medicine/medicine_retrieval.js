// import { stringify } from "querystring";
"use strict"

// var MedicineService = require('./MedicineService');
var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t',
    database: 'medicinedata'
});

var medicine_name = [];

function hitQuery() {
    return new Promise((resolve, reject) => {
        // connection.connect();
        connection.query('SELECT * FROM medicine_list WHERE name = "유카본정"', (err, rows) => {
            medicine_name = rows;

            resolve();
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "MedicineRetrieval",
        "properties": {
            "medicineName": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _medicine_name = [];
        var promise = hitQuery().then(() => {
            // _medicine_name = medicine_name;
            // console.log(medicine_name);
            // console.log('---WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            // return _medicine_name;
            // var medicines = MedicineService.medicines();
            conversation.reply({ text: '컴포넌트에서 출력한 대답입니다.' + JSON.stringify(medicine_name[0].name) });
            
            done();
        }).catch(err => {
            reject(err);
        });
        
        
    }
};