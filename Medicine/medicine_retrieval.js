// import { stringify } from "querystring";
"use strict"

var Hangultest = require('../hangul_processing/hangultest.js');
var FBTemplate = require('../FacebookTemplate.js')
var express = require("express");
var mysql = require('mysql');
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

var medicine_arr = [];
var searching_medicine = '';

function hitQuery(medicine_question) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM medicine_list WHERE synonyms like ' + "'%" + medicine_question + "%'";
        connection.query(sql, (err, rows) => {
            medicine_arr = rows;
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
            //   "medicines": { "type": "string", "required": true },
            "lastQuestion": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _medicine_arr = [];
        var medicine_question = conversation.messagePayload().text;
        var synonyms = Hangultest.hanguler(medicine_question);
        var promise = hitQuery(synonyms).then(() => {
            try {            
                if(medicine_arr.length==1|medicine_arr.length==0){
                    conversation.reply({ text: '[효능효과]\n' + medicine_arr[0].efficacy + '\n' });
                    conversation.reply({ text: '[용법용량]\n' + medicine_arr[0].howtouse + '\n' });
                    conversation.reply({ text: '[주의사항]\n' + medicine_arr[0].precaution });
                    conversation.reply(FBTemplate.genericFBT( medicine_arr[0].imageurl , medicine_arr[0].name , medicine_arr[0].efficacy,'자세히 보기',medicine_arr[0].url ));
                    
                }
                else{
                    conversation.reply({ text: medicine_arr.length + '개의 약이있어요.' });
                    
                    var inner=[]
                    for(var i=0; i<medicine_arr.length;){
                        if(medicine_arr[i].imageurl!='undefined')
                            inner.push(FBTemplate.genrInnerFBT(medicine_arr[i].imageurl , medicine_arr[i].name , medicine_arr[i].efficacy,'자세히 보기',medicine_arr[i].url));
                            i++;
                            if(i==medicine_arr.length|i==10)
                            conversation.reply(FBTemplate.cardFBT( inner ));
                       }
                    // var inner =[FBTemplate.genrInnerFBT(medicine_arr[0].imageurl , medicine_arr[0].name , medicine_arr[0].efficacy,'자세히 보기',medicine_arr[0].url),
                    // FBTemplate.genrInnerFBT(medicine_arr[1].imageurl , medicine_arr[1].name , medicine_arr[1].efficacy,'자세히 보기',medicine_arr[1].url),
                    // FBTemplate.genrInnerFBT(medicine_arr[2].imageurl , medicine_arr[2].name , medicine_arr[2].efficacy,'자세히 보기',medicine_arr[2].url)];
                    
                }
                
                // //generic ex
                // conversation.reply(FBTemplate.genericFBT( medicine_arr[0].imageurl , medicine_arr[0].name , medicine_arr[0].efficacy,'자세히 보기',medicine_arr[0].url ));
                // //button ex
                // conversation.reply(FBTemplate.buttonFBT( '페이지 보기' , medicine_arr[0].url , "자세히 보시겠어요?" ))
                // //card ex
                // var inner =[FBTemplate.genrInnerFBT(medicine_arr[0].imageurl , medicine_arr[0].name , medicine_arr[0].efficacy,'자세히 보기',medicine_arr[0].url),
                // FBTemplate.genrInnerFBT(medicine_arr[0].imageurl , medicine_arr[0].name , medicine_arr[0].efficacy,'자세히 보기',medicine_arr[0].url),
                // FBTemplate.genrInnerFBT(medicine_arr[0].imageurl , medicine_arr[0].name , medicine_arr[0].efficacy,'자세히 보기',medicine_arr[0].url)];
                // conversation.reply(FBTemplate.cardFBT( inner ));
                // generic 인자
                // function genericFBT(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL )
                
                

            }
            catch (e) { //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + medicine_question + '의 정보를 가져오지 못했어요. 죄송해요ㅠ' });

            }
            conversation.transition();
            done();

        }).catch(err => {
            reject(err);
        });


    }
};



// import { stringify } from "querystring";

// "use strict"

// var Hangultest = require('../hangultest.js');

// var express = require("express");
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     // connectionLimit: 100,
//     host: 'localhost',
//     user: 'root',
//     password: '1q2w3e4r5t',
//     database: 'MedicineData'
// });

// //if(connection.state === 'disconnected'){
// //    return respond(null, {status:'fail', message:'server down'});
// //}

// var medicine_arr = [];
// var searching_medicine = '';

// function hitQuery(medicine_question) {

//     return new Promise((resolve, reject) => {
//         var sql = 'SELECT * FROM medicine_list WHERE synonyms like ' +"'%" + medicine_question+"%'";
//         connection.query(sql, (err, rows) => {

//                 medicine_arr = rows;
//                 resolve();  
//         });
//         // connection.release();
//     });

// }

// module.exports = {

//     metadata: () => ({
//         "name": "MedicineRetrieval",
//         "properties": {
//             "medicines": { "type": "string", "required": true },
//             "lastQuestion": { "type": "string", "required": true }
//         },
//         "supportedActions": []
//     }),

//     invoke: (conversation, done) => {
//         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        
//         // var _medicine_arr = [];
//         var medicine_question = conversation.messagePayload().text;
//         var synonyms = Hangultest.hanguler(medicine_question);
//         console.log(synonyms);
//         var promise = hitQuery(synonyms).then(() => {
//             // var imgUrl = medicine_arr[0].imageurl;

//             // var _attachment = {
//             //     type: 'image',
//             //     url: imgUrl
//             // }
//             try{
//                 conversation.reply({ text: JSON.stringify(medicine_arr[0].name) + '의 정보가 궁금하시군요! 잠시만요~ \n'});
//                 /*
//                 conversation.reply({
//                     type: 'attachment',
//                     attachment: {
//                         type: 'image',
//                         url: JSON.stringify(medicine_arr[0].imageurl)
//                     }
//                 });
//                 */
//                 conversation.reply({ text: '[효능효과]\n' + JSON.stringify(medicine_arr[0].efficacy) + '\n' });
//                 conversation.reply({ text: '[용법용량]\n' + JSON.stringify(medicine_arr[0].howtouse) + '\n' });
//                 conversation.reply({ text: '[주의사항]\n' + JSON.stringify(medicine_arr[0].precaution) });
            
//             } catch(e){ //db에서 null값을 가져올 경우
//                 conversation.reply({ text: '요청하신 ' + medicine_question + '의 정보를 가져오지 못했어요. 죄송해요 :(' });
       
//             }
//             //conversation.transition();
//             done();

//         });
//     }
// };
