"use strict"

var hangul = require('../hangul_processing/hangultest.js');
// var channelInterface = require('./channel_interface.js');

var express = require("express");
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'medicine_test'
});

var medicine_name = [];

function hitQuery(GeneralMedicineName) {
    return new Promise((resolve, reject) => {
        // connection.connect();
        var sql = 'SELECT * FROM medicine_list WHERE generalname like "' + GeneralMedicineName + '%"';
        pool.query(sql, (err, rows) => {

            medicine_name = rows;
            resolve();
            // }

        });
        // connection.release();
    });

}

var test = [];
function hitQueryReturnRows(GeneralMedicineName, callback) {
    pool.query('SELECT * FROM medicine_list WHERE generalname = "' + GeneralMedicineName + '"', (err, rows) => {
        if (err)
            callback(err, null);
        else {
            callback(null, rows);
        }
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

        var InputMedicineName = conversation.messagePayload().text;
        var GeneralMedicineName = hangul.hanguler(InputMedicineName);

        // console.log('----------------------------------------------------------------------------------------------------------');
        var _rows = hitQueryReturnRows(GeneralMedicineName, (err, rows) => {
            _rows = rows;
        });
        console.log(_rows);
        // console.log('----------------------------------------------------------------------------------------------------------');


        var promise = hitQuery(GeneralMedicineName).then(() => {
            if (medicine_name == 'no data') {
                conversation.reply({ text: 'no data' });
            }
            else {
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

                // test in kakaotalk -> success
                // conversation.reply({
                //     message: {
                //         text: '약이름 : ' + name,
                //         photo: { url: '' + imgUrl, width: 640, height: 480 }
                //     }
                // });

                conversation.transition();

                done();

            }

        }).catch(err => {
            reject(err);
        });
    }

};

