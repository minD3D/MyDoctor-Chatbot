"use strict"
var express = require("express");
var FBTemplate = require('../FacebookTemplate.js')

module.exports = {
    metadata: () => ({
        "name": "Swear",
        "properties": {
            "swearword": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {


        console.log('==================시작버튼 포스트백==========================');
       // console.log(conversation.payload().postback.title);
        //console.log(conversation.payload().postback.payload);
        //conversation.reply(conversation.payload().postback.payload);

        

        //만약 이 챗봇과 처음 대화하는 사람이라면 이 안내문구를 보냄. 
        //fb_persistent_menu.json의 페이로드 가져옴. 

            var randomReply = Math.floor((Math.random() * 10));
            var replyConversation=[
                "너무행ㅠㅠ",
                "죄송합니다 이해하기 어려워요T_T",
                "무슨 기분 나쁜일 있으신가요?",
                "저한테 마음껏 욕하세요!",
                "힘든일 있으신가요? 화이팅!",
                "죄송해요ㅜㅜ화내지마세용ㅠ",
                "워워 릴렉스",
                "사랑합니다!ㅎㅎ",
                "죄송해요ㅠㅠ제가 뭘 잘못했나요?",
                "더 똑똑한 봇이 되도록 할게요ㅠ 죄송합니다ㅠ"
            ]
            var inner=[];
            inner.push(FBTemplate.buttonInnerFBT( "병원예약", "병원예약"));
            inner.push(FBTemplate.buttonInnerFBT( "약검색", "약검색"));
            inner.push(FBTemplate.buttonInnerFBT( "FAQ" , "FAQ"));
            conversation.reply(FBTemplate.buttonFBT(replyConversation[randomReply] ,inner));

            conversation.transition();
            done();
    }
};