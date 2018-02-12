"use strict"

var FBTemplate = require('../FacebookTemplate.js')
var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t',
    database: 'myDoctor'
});


var Hospital_arr = [];
var searching_Hospital = '';

function hitQuery(dept_name) {
    return new Promise((resolve, reject) => {
        //var sql2 = 'select * from professors where dept_id = (select dept_id from depts where name = '+ dept_name +') or dept_id in (select dept_id from professors where major like ' +"'%" + dept_name + "%')"
        //select * from professors where dept_id = (select dept_id from depts where name = '대장항문외과') or dept_id in (select dept_id from professors where major like '%대장항문외과%');

        var sql = 'SELECT * FROM professors WHERE dept_id = (SELECT id FROM department WHERE name like ' +"'%" + dept_name +"%'" + ')';
        connection.query(sql, (err, rows) => {
            Hospital_arr = rows;
            console.log(rows);
            console.log(sql);        
            console.log('========================================');

            resolve();
        });
        // connection.release();
    });

}

module.exports = {

    metadata: () => ({
        "name": "ProfessorInDeptRetrieval",
        "properties": {
            "professor_result": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _Hospital_arr = [];
        var dept_name='';
        try{
            //System.List 진료과 버튼 클릭 받아오기 
            dept_name = conversation.messagePayload().postback.action;

        } catch(e){
            //사용자가 직접 진료과를 입력
            dept_name = conversation.messagePayload().text;
        }
        conversation.variable("subjectName", dept_name); 
        var promise = hitQuery(dept_name).then(() => {
            try {            
                if(Hospital_arr.length==1|Hospital_arr.length==0){
                    conversation.reply(FBTemplate.genericTwoFBT( Hospital_arr[0].pimg , Hospital_arr[0].name , Hospital_arr[0].major,'자세히 보기', Hospital_arr[0].purl,'예약하기')); 
                }
                else{
                    conversation.reply({ text: Hospital_arr.length + '명의 의료진이 기다리고 있습니다!\n선택해주세요 B)' });
                    

                    //conversation.reply('유저세션: ' + conversation.channelConversation.userId);

                    var inner=[]
                    for(var i=0; i<Hospital_arr.length;){

                        if(Hospital_arr[i].imageurl!='undefined'){
                            //inner.push(FBTemplate.genrInnerFBT(Hospital_arr[i].pimg , Hospital_arr[i].name , Hospital_arr[i].major, '자세히 보기', Hospital_arr[i].purl));
                            //genrInnerTwoFBT
                            inner.push(FBTemplate.genrInnerTwoFBT(Hospital_arr[i].pimg , Hospital_arr[i].name , Hospital_arr[i].major, '자세히 보기', Hospital_arr[i].purl, '예약하기'));
                    
                            if(i==9){ break; } //10명이상이면 더보기 버튼 or 대화로 의료진 리스트 링크 줌. 
                            
                        }
                        
                        i++;
                            // if(i==Hospital_arr.length|i==10)
                            // conversation.reply(FBTemplate.cardFBT( inner ));
                    }

                    conversation.reply(FBTemplate.cardFBT( inner ));
                    
                }
                
            
            }
            catch (e) { //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + dept_name + '의 정보를 가져오지 못했어요. 죄송해요 :(' });

                conversation.transition();
                done();
            }
            conversation.transition();
            done();

        }).catch(err => {
            reject(err);
        });


    }
};