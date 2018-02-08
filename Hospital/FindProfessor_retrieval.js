"use strict"

var FBTemplate = require('../FacebookTemplate.js')
var express = require("express")    ;
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t',
    database: 'medicineData'
});


var Hospital_arr = [];
var searching_Hospital = '';

function hitQuery(professor_name) {
    return new Promise((resolve, reject) => {
        //select * from professors where dept_id = (select dept_id from professors where name = '대장항문외과') or dept_id in (select dept_id from professors where major like '%대장항문외과%');
        var sql = 'SELECT * FROM professors WHERE name like ' +"'%" + professor_name +"%'";
        connection.query(sql, (err, rows) => {
            Hospital_arr = rows;
            console.log(rows);

            resolve();
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "FindProfessorRetrieval",
        "properties": {
            "professor": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _Hospital_arr = [];
        var professor_name = conversation.messagePayload().text;
        var promise = hitQuery(professor_name).then(() => {
            try {            
                if(Hospital_arr.length==1|Hospital_arr.length==0){
                    conversation.reply({ text: '[병명]\n' + Hospital_arr[0].name });
                    conversation.reply(FBTemplate.genericFBT( Hospital_arr[0].pimg , Hospital_arr[0].name , Hospital_arr[0].major,'자세히 보기',Hospital_arr[0].purl ));
                    
                }
                else{
                    conversation.reply({ text: Hospital_arr.length + '명의 교수님이 있습니다.' });
                    
                    var inner=[]
                    for(var i=0; i<Hospital_arr.length;){
                        if(Hospital_arr[i].imageurl!='undefined')
                            inner.push(FBTemplate.genrInnerFBT(Hospital_arr[i].pimg , Hospital_arr[i].name , Hospital_arr[i].major, '자세히 보기', Hospital_arr[i].purl));
                            i++;
                            if(i==Hospital_arr.length|i==10)
                            conversation.reply(FBTemplate.cardFBT( inner ));
                       }
                    
                }
            

            }
            catch (e) { //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + professor_name + '의 정보를 가져오지 못했어요. 죄송해요ㅠ' });

            }
            conversation.transition();
            done();

        }).catch(err => {
            reject(err);
        });


    }
};

