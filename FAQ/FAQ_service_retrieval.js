"use strict"

var FBTemplate = require('../FacebookTemplate.js')
var express = require('express');
var mysql = require('mysql');
var database = require('../Reservation/pool.js');

// var connection = mysql.createConnection({
//     // connectionLimit: 100,
//     host: 'localhost',
//     user: 'root',
//     password: '1q2w3e4r5t',
//     database: 'myDoctor'
// });


var faqData = [];
function hitQuery(faqIndex) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM faq WHERE id=' + faqIndex;

        
        database.getConnection((err, con) => {
            if (err) { }

            con.query(sql, (err, rows) => {
                if (err) {
                    reject(Error(err));
                }
                else {
                    faqData = rows;
                    console.log('======================faqIndex번호============================');
                    console.log(faqData);
                    console.log('==================================================');
                    
            
                    resolve();
                }
            });

        });
    });
}

module.exports = {
    metadata: () => ({
        "name": "FAQServiceRetrieval",
        "properties": {
            // "reservationDate": { "type": "string", "required": true }
            // "myUserId": { "type": "string", "required": true }
            "faqQuestions": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // ex) FAQ28
        var faq_string = '' + conversation.nlpResult().intentMatches()[0].intent; //intent
        console.log(faq_string);
        console.log('-------------------------------------------------------------------');
        
        var faq_index = faq_string.slice(3);

        var promise = hitQuery(faq_index).then(() => {
            conversation.reply({text: 'Q: ' + faqData[0].Question});
            conversation.reply({text: 'A: ' + faqData[0].Answer});

            conversation.transition();
            done();
        }).catch(err => {
            conversation.reply({
                text: '실패'
            });

            conversation.transition();
            done();
        })
        console.log('-------------------------------------------------------------------');
        console.log(faq_index);
        console.log('-------------------------------------------------------------------');
    }
}