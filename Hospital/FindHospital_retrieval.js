"use strict"

var FBTemplate = require('../FacebookTemplate.js')
var express = require("express")    ;
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

function hitQuery(disease_name) {
    return new Promise((resolve, reject) => {
        //select * from professors where dept_id = (select dept_id from diseases where name = '대장항문외과') or dept_id in (select dept_id from professors where major like '%대장항문외과%');
        var sql = 'SELECT * FROM professors WHERE major like ' +"'%" + disease_name +"%'";
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
        "name": "FindHospitalRetrieval",
        "properties": {
            "disease": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        // var _Hospital_arr = [];
        var disease_name = conversation.messagePayload().text;
        var promise = hitQuery(disease_name).then(() => {
            try {            
                if(Hospital_arr.length==1|Hospital_arr.length==0){
                    conversation.reply({ text:  disease_name +'을 진료하는 의사를 추천해드릴게요' });
                    conversation.reply(FBTemplate.genericTwopayFBT(Hospital_arr[0].pimg , Hospital_arr[0].name , Hospital_arr[0].major, '자세히 보기', Hospital_arr[0].purl, '예약하기',  Hospital_arr[0].dept_id+','+ Hospital_arr[0].name));    
 
                }
                else{
                    conversation.reply({ text: Hospital_arr.length + '명의 담당 교수님이 있습니다.' });
                    
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
                                           //conversation.reply({ text: '예약을 진행하시겠어요?' });
                       
                    
                }
                
                conversation.reply({ text: '예약을 진행하시겠어요? \n예약하시려면 예약하기 버튼을 눌러주세요:)' });
                
            }
            catch (e) { //db에서 null값을 가져올 경우
                conversation.reply({ text: '요청하신 ' + disease_name + '의 정보를 가져오지 못했어요. 죄송해요ㅠ' });
            }
            conversation.transition();
            done();

        }).catch(err => {
            reject(err);
        });


    }
};

