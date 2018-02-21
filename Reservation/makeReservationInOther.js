"use strict"

// var hangul = require('../hangul_processing/hangultest.js');
var express = require('express');
var mysql = require('mysql');
var database = require('./pool.js');

function setReservation(user_id,doctor,dept,date,name,phone) {
    return new Promise((resolve, reject) => {
        //var sql = 'INSERT INTO reservation (user_id, prof_id, dept_id, date, name, phone) VALUES (\''+user_id+'\',(select p.id from professors p where p.name= \''+doctor+'\'),(select d.id from department d where d.name like \''+dept+'%\'),\''+date+'\',\''+name+'\',\''+phone+'\');';
        var sql = 'INSERT INTO reservation (user_id, prof_id, dept_id, date, user_name, phone) VALUES (\''+user_id+'\',(select p.id from professors p where p.name= \''+doctor+'\'),'+dept+',\''+date+'\',\''+name+'\',\''+phone+'\');';
        
        database.getConnection((err, con) => {
            if (err) {
                console.log('..............................Error in connecting........................................')
            }
            
            con.query(sql, (err, rows) => {
                if (err) {
                    console.log('..............................Error in querying........................................')
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
        "name": "MakeReservationInOther",
        "properties": {
            "reservationDate": { "type": "string", "required": true },
            "professorName": { "type": "string", "required": true },
            "subjectName": { "type": "string", "required": true },
            "diseaseName": { "type": "string", "required": true },
            "userName":  { "type": "string", "required": true },
            "userPhone": { "type": "string", "required": true }
            // "myUserId": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // 'mm/dd/yyyy hh:mm AM'
        var date = conversation.properties().reservationDate;
        var doctor = conversation.properties().professorName;
        var dept = conversation.properties().subjectName;
        var disease = conversation.properties().diseaseName;
        var name = conversation.properties().userName;
        var phone = conversation.properties().userPhone;
        
        var user_id = conversation.userId();
        
        // id of chatbot user

        console.log('---------------------------------------------------------------------------------------------');
        //console.log(userId);
        console.log('!!!!!!!!');
        console.log(date);
        console.log(doctor);
        console.log(dept);
        console.log(disease);
        console.log(name);
        console.log(phone);
        console.log(user_id);
        console.log('---------------------------------------------------------------------------------------------');
        conversation.variable("isReservation", "false"); //예약 플로우를 초기상태로
        var promise = setReservation(user_id,doctor,dept,date,name,phone).then(() => {
            conversation.reply({ text: '예약이 완료되었습니다.'});
            // 대화를 다시 돌림
            conversation.transition();
            done();
        }).catch(err => {
            conversation.reply({text: '예약에 실패했습니다....' + err});
            
            conversation.transition();
            done();
        });


    }
}