// import { stringify } from "querystring";

"use strict"

var express = require("express");
var mysql = require('mysql');
var FBTemplate = require('../FacebookTemplate.js')
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

var FAQ_arr = [];
var searching_FAQ = '';

function hitQuery(FAQ_question) {

    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM FAQ_list WHERE Question like ' +"'%" + FAQ_question+"%'";
        connection.query(sql, (err, rows) => {
            if(err){
                reject(new Error(err));
            }
            else{
                FAQ_arr = rows;
 
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
        // var _FAQ_arr = [];
        var FAQ_question = conversation.messagePayload().text;
        
        var promise = hitQuery(FAQ_question).then(() => {
            try{
                if(FAQ_arr.length==1|FAQ_arr.length==0){
                    conversation.reply({ text: '[질문]\n' + FAQ_arr[0].Question + '\n' });    
                    if(FAQ_arr[0].Answer!=null)
                    conversation.reply({ text: '[답변]\n' + FAQ_arr[0].Answer + '\n' });
                    //conversation.reply({ text: '[페이지보기]\n' + FAQ_arr[0].url });
                }
                else{
                    conversation.reply({ text: FAQ_arr.length + '개의 관련 질문이 있어요.' });
                    
                    var inner=[]
                    for(var i=0; i<FAQ_arr.length;){
                        var hospital_imgurl='http://storage.iseverance.com/2013_obj_sev/top/logo_severance.gif';
                            inner.push(FBTemplate.listInnerFBT( FAQ_arr[i].Question , FAQ_arr[i].Answer,FAQ_arr[i].url));
                            i++;
                            if(i==FAQ_arr.length|i==10) 
                                conversation.reply(FBTemplate.listFBT(inner));
                            
                    }
                    // var inner =[FBTemplate.genrInnerFBT(FAQ_arr[0].imageurl , FAQ_arr[0].name , FAQ_arr[0].efficacy,'자세히 보기',FAQ_arr[0].url),
                    // FBTemplate.genrInnerFBT(FAQ_arr[1].imageurl , FAQ_arr[1].name , FAQ_arr[1].efficacy,'자세히 보기',FAQ_arr[1].url),
                    // FBTemplate.genrInnerFBT(FAQ_arr[2].imageurl , FAQ_arr[2].name , FAQ_arr[2].efficacy,'자세히 보기',FAQ_arr[2].url)];
                    
                }
                
            } catch(e){ //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + FAQ_question + '의 정보를 가져오지 못했어요. 죄송해요 :(' });
       
            }

            conversation.transition();
            done();
        });
    }
};

