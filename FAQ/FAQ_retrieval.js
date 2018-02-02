// import { stringify } from "querystring";

"use strict"

var express = require("express");
var mysql = require('mysql');
var facebookTemplate = require('../FacebookTemplate.js')
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t',
    database: 'MedicineData'
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
            if(err){
                reject(new Error(err));
            }
            else{
                FAQ_name = rows;
 
                resolve();
            }
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "FAQRetrieval",
        "properties": {
            "Questions": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _FAQ_name = [];
        var FAQ_question = conversation.messagePayload().text;
        
        var promise = hitQuery(FAQ_question).then(() => {
            try{
                conversation.reply({ text: '[질문]\n' + FAQ_name[0].Question + '\n' });
                
                if(FAQ_name[0].Answer!=null)
                conversation.reply({ text: '[답변]\n' + FAQ_name[0].Answer + '\n' });
                //conversation.reply({ text: '[페이지보기]\n' + FAQ_name[0].url });
                conversation.reply({
                    "attachment":{
                        "type":"template",
                        "payload":{
                          "template_type":"button",
                          "buttons":[
                            {
                              "type": "web_url",
                              "url": FAQ_name[0].url,
                              "title": "페이지 보기"
                            }
                          ]
                        }
                      }
                });
              
            
            } catch(e){ //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + FAQ_question + '의 정보를 가져오지 못했어요. 죄송해요 :(' });
       
            }

            conversation.transition();
            done();
        });
    }
};
