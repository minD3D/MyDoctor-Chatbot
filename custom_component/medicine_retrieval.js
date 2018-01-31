"use strict"

var hangul = require('../hangul_processing/hangultest.js');
var express = require("express");
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'medicine_test'
});

// array for searched medicine's info
var medicine_name = [];

function hitQuery(GeneralMedicineName) {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM medicine_list WHERE generalname like "' + GeneralMedicineName + '%"';

        pool.query(sql, (err, rows) => {
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

// testing callback: not affect to the bot
function hitQueryReturnRows(GeneralMedicineName, callback) {
    pool.query('SELECT * FROM medicine_list WHERE generalname = "' + GeneralMedicineName + '"', (err, rows) => {
        callback(null, rows);
    });

}

module.exports = {

    metadata: () => ({
        "name": "MedicineRetrieval",
        "properties": {
            // "medicineName": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // process input name to general name
        var InputMedicineName = conversation.messagePayload().text;
        var GeneralMedicineName = hangul.hanguler(InputMedicineName);

        // callback testing
        console.log('----------------------------------------------------------------------------------------------------------');
        var _data = hitQueryReturnRows(GeneralMedicineName, (err, data) => {
            console.log(data);
        });
        // console.log(_data);
        console.log('----------------------------------------------------------------------------------------------------------');

        var promise = hitQuery(GeneralMedicineName).then(() => {
            var name = medicine_name[0].name;
            var efficacy = medicine_name[0].efficacy;
            var howToUse = medicine_name[0].howtouse;
            var precaution = medicine_name[0].precaution;
            var originalUrl = medicine_name[0].originalurl;
            var imgUrl = medicine_name[0].imgurl;

            var _attachment = {
                type: 'image',
                url: imgUrl
            }
            // reply in facebook
            conversation.reply({
                text: '약이름 : ' + name
            });
            conversation.reply({
                type: 'attachment',
                attachment: _attachment
            });
            conversation.reply({
                text: '효능 : ' + efficacy
            });
            conversation.reply({
                text: '용법 : ' + howToUse
            });
            conversation.reply({
                text: '주의사항 : ' + precaution
            });
            conversation.reply({
                text: '자세한 정보 : ' + originalUrl
            });

            conversation.transition();
            done();
        }).catch(err => {
            // when data is null
            conversation.reply({
                text: '해당하는 약이 없습니다.'
            });

            conversation.transition();
            done();
        });
    }
};



/* // test in kakaotalk
conversation.reply({
    message: {
        text: '약이름 : ' + name,
        photo: { url: '' + imgUrl, width: 640, height: 480 }
    }
}); */