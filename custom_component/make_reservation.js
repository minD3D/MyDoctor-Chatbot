"use strict"

// var hangul = require('../hangul_processing/hangultest.js');
var express = require('express');
var mysql = require('mysql');
var database = require('./pool.js');

function hitQuery(date) {
    return new Promise((resolve, reject) => {
        var sql = 'INSERT INTO reservation (user_id, dept_id, date) VALUES (1,2,' + date + ')';

        database.pool.query(sql, (err, rows) => {
            // when data is null
            if (err) {
                reject(Error(err));
            }
            // when data is not null
            else {
                medicine_name = rows;
                resolve();
            }
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
        var date = conversation.properties().reservationDate;
        // id of chatbot user
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

        console.log('-------------------------------------------------------------------');
        console.log(userid);
        console.log('-------------------------------------------------------------------');


    }
}