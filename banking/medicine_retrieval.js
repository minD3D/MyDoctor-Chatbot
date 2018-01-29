"use strict"

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

function hitQuery(medicine) {
    return new Promise((resolve, reject) => {
        // connection.connect();
        connection.query('SELECT * FROM medicine_list WHERE name = "' + medicine + '"', (err, rows) => {
            // console.log(rows);
            // console.log('---WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            // if (err) {
            //     reject();
            //     throw err;
            // }

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
            "medicineName": { "type": "string", "required": true },
            "lastQuestion": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _medicine_name = [];
        var uk_url = 'http://dbscthumb.phinf.naver.net/3323_000_2/20160623151337534_GZC8PHM54.jpg/0bg84r2ws0vza02.jpg?type=m250&wm=N';

        var _attachment = {
            type: 'image',
            url: uk_url
        }
        
        var medicine = conversation.properties().lastQuestion;
        
        console.log(conversation.properties().lastQuestion);
        console.log('----------------------------------------------------------------------------------------------');

        var promise = hitQuery(medicine).then(() => {
            
            conversation.reply({ text: '약이름 : ' + JSON.stringify(medicine_name[0].name) });
            
            // 카카오톡에서 에러남.
            // conversation.reply({ type: 'attachment', attachment: _attachment });
            
            done();
        }).catch(err => {
            reject(err);
        });
        
    }
};