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
        var sql = 'select r.name as u_name, (select d.name from department d where d.id= r.dept_id) as d_name, (select p.name from professors p where p.id= r.prof_id) as p_name, r.date from reservation r where r.user_id ='+user_id+';';
        connection.query(sql, (err, rows) => {
            if(err){
                reject(new Error(err));
            }
            else{
                show_arr = rows;
                resolve();
            }
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "ShowReservation",
        "properties": {
            "show": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _show_arr = [];
        var user_id = conversation.userId();
        console.log('---------------------------------------------------------------------------------------------');
        console.log('!!!!!!!!');
        console.log(user_id);
        console.log('---------------------------------------------------------------------------------------------');

        var promise = hitQuery(user_id).then(() => {
            try{
                conversation.reply({ text: show_arr[0].u_name + '님께서는 ' + show_arr[0].d_name + show_arr[0].p_name + '교수님으로 \n' + show_arr[0].date + '에 예약 되셨습니다.\n' });
             
            } catch(e){ 
                conversation.reply({ text: '예약 된게 없습니다.' });
            }

            conversation.transition();
            done();
        });
    }
};

