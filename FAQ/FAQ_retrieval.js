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
    database: 'medicineDate'
});

//if(connection.state === 'disconnected'){
//    return respond(null, {status:'fail', message:'server down'});
//}

var FAQ_name = [];
var searching_FAQ = '';

function hitQuery(FAQ_question) {

    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM FAQ_list WHERE Question like ' +"'%" + FAQ_question+"%'";
        connection.query(sql, (err, rows) => {

            FAQ_name = rows;
            console.log(rows);

            resolve();
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "FAQRetrieval",
        "properties": {
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _FAQ_name = [];
        var FAQ_question = conversation.messagePayload().text;
        
        var promise = hitQuery(FAQ_question).then(() => {
            try{
                conversation.reply({ text: JSON.stringify(FAQ_name[0].name) + ' 정보가 궁금하시군요! \n'});
                conversation.reply({ text: '[질문]\n' + JSON.stringify(FAQ_name[0].Question) + '\n' });
                if(FAQ_name[0].Answer!=null)
                conversation.reply({ text: '[답변]\n' + JSON.stringify(FAQ_name[0].Answer) + '\n' });
                conversation.reply({ text: '[페이지보기]\n' + JSON.stringify(FAQ_name[0].url) });
            
            } catch(e){ //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + FAQ_question + '의 정보를 가져오지 못했어요. 죄송해요 :(' });
       
            }

            conversation.transition();
            done();

        }).catch(err => {
            reject(err);
        });
    }
};
