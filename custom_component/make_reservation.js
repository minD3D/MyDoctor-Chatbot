"use strict"

// var hangul = require('../hangul_processing/hangultest.js');
var express = require('express');
var mysql = require('mysql');
var getConnection = require('./pool.js');

function hitQuery(date) {
    return new Promise((resolve, reject) => {
        var sql = 'INSERT INTO reservation (user_id, prof_id, date) VALUES (1,2,' + date + ')';

        getConnection((err, con) => {
            if (err) { /* handle your error here */ }

            con.query(sql, (err, rows) => {
                if (err) {
                    reject(Error(err));
                }
                else {
                    resolve();
                }
                // con.release();
            });

        });
    });
}

module.exports = {
    metadata: () => ({
        "name": "MakeReservation",
        "properties": {
            "reservationDate": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var date = conversation.properties().reservationDate.date;
        // id of chatbot user

        console.log('-----------------------------------------------------------------------------------------');
        console.log('' + date);
        console.log('-----------------------------------------------------------------------------------------');

        var userid = conversation.payload();

        var promise = hitQuery(date).then(() => {
            conversation.reply({
                text: '예약이 완료되었습니다.'
            });

            // 대화를 다시 돌림
            conversation.transition();
            done();
        }).catch(err => {
            conversation.reply({
                text: '예약에 실패했습니다.'
            });

            conversation.transition();
            done();
        });


    }
}