// import { stringify } from "querystring";

"use strict"

var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t',
    database: 'myDoctor'
});

//if(connection.state === 'disconnected'){
//    return respond(null, {status:'fail', message:'server down'});
//}

var show_arr = [];

function hitQuery(user_id) {

    return new Promise((resolve, reject) => {
        var sql = 'delete from reservation where user_id = '+user_id+';'
        connection.query(sql, (err, result) => {
            if(err){
                reject(new Error(err));
            }
            else{
                show_arr = result;
                resolve();
            }
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "DeleteReservation",
        "properties": {
            "delete": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _show_arr = [];
        var user_id = conversation.userId();
        
        var promise = hitQuery(user_id).then(() => {
            try{
                if(show_arr.affectedRows == 0){
                    conversation.reply({ text: '예약하신 정보가 없어요\n' });
                }
                else{
                conversation.reply({ text: '예약 취소가 완료되었어요!\n' });
                }

            } catch(e){ //db에서 null값을 가져올 경우
                conversation.reply({ text: '예약취소 과정에 오류가 생겼습니다\n다시 시도해주세요~' });
            }

            conversation.transition();
            done();
        });
    }
};

