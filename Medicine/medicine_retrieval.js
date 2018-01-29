// import { stringify } from "querystring";

"use strict"

var Hangultest = require('../hangultest.js');

// var MedicineService = require('./MedicineService');

var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t',
    database: 'medicineData'
});

//if(connection.state === 'disconnected'){
//    return respond(null, {status:'fail', message:'server down'});
//}

var medicine_name = [];
var searching_medicine = '';

function hitQuery(medicine_question) {

    return new Promise((resolve, reject) => {
        //console.log(medicine_question+'*********************************');
        //connection.query('SELECT * FROM medicine_list WHERE name ='+searching_medicine+'', 
        //connection.query('SELECT * FROM medicine_list WHERE name = "'+ searching_medicine +'"'
        connection.query('SELECT * FROM medicine_list WHERE synonyms = "'+ medicine_question +'"', (err, rows) => {
            //console.log(rows);
            //console.log('---WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            // if (err) {
            //     reject();
            //     throw err;
            // }

            medicine_name = rows;
            console.log(rows);

            resolve();
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "MedicineRetrieval",
        "properties": {
            "medicines": { "type": "string", "required": true },
            "lastQuestion": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _medicine_name = [];
        var medicine_question = conversation.messagePayload().text;
        var synonyms = Hangultest.hanguler(medicine_question);
        console.log(medicine_question);
        console.log(synonyms);
        
        var promise = hitQuery(synonyms).then(() => {
            // _medicine_name = medicine_name;
            // console.log(medicine_name);
            // console.log('---WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            // return _medicine_name;
            // var medicines = MedicineService.medicines();
            
            //conversation.reply({ text: JSON.stringify(searching_medicine) + ' '});
            conversation.reply({ text: JSON.stringify(medicine_name[0].name) + '의 정보가 궁금하시군요! 잠시만요~\n(컴포넌트에서 출력)'});
            conversation.reply({ text: '[효능효과]\n' + JSON.stringify(medicine_name[0].efficacy) + '\n' });
            conversation.reply({ text: '[용법용량]\n' + JSON.stringify(medicine_name[0].howtouse) + '\n' });
            conversation.reply({ text: '[주의사항]\n' + JSON.stringify(medicine_name[0].precaution) });

            done();
        }).catch(err => {
            reject(err);
        });


    }
};