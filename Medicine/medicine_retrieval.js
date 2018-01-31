// import { stringify } from "querystring";

"use strict"

var Hangultest = require('../hangultest.js');

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
        var sql = 'SELECT * FROM medicine_list WHERE synonyms like ' +"'%" + medicine_question+"%'";
        connection.query(sql, (err, rows) => {

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
            var imgUrl = medicine_name[0].imageurl;

            var _attachment = {
                type: 'image',
                url: imgUrl
            }

            try{
                conversation.reply({ text: JSON.stringify(medicine_name[0].name) + '의 정보가 궁금하시군요! 잠시만요~ B)\n(컴포넌트에서 출력)'});
                conversation.reply({
                    type: 'attachment',
                    attachment: {
                        type: 'image',
                        url: JSON.stringify(medicine_name[0].imageurl)
                    }
                });
                conversation.reply({ text: '[효능효과]\n' + JSON.stringify(medicine_name[0].efficacy) + '\n' });
                conversation.reply({ text: '[용법용량]\n' + JSON.stringify(medicine_name[0].howtouse) + '\n' });
                conversation.reply({ text: '[주의사항]\n' + JSON.stringify(medicine_name[0].precaution) });
            
            } catch(e){ //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + medicine_question + '의 정보를 가져오지 못했어요. 죄송해요 :(' });
       
            }

            conversation.transition();
            done();

        }).catch(err => {
            reject(err);
        });
    }
};
