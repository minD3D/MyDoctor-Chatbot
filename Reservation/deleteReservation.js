// import { stringify } from "querystring";

"use strict"

var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Sidomari93',
    database: 'medicine_test'
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
                    conversation.reply({ text: '예약 된게 없습니다.\n' });
                }
                else{
                conversation.reply({ text: '예약 취소완료.\n' });
                }

            } catch(e){ //db에서 null값을 가져올 경우
                conversation.reply({ text: '에러 발생.' });
            }

            conversation.transition();
            done();
        });
    }
};

