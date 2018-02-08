"use strict"
var express = require("express");
var FBTemplate = require('../FacebookTemplate.js')

module.exports = {
    metadata: () => ({
        "name": "UndefinedServiceRetrieval",
        "properties": {
            "lastQuestion": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {


        var randomReply = Math.floor((Math.random() * 10));
        var replyConversation=[
            "무슨말인지 모르겠어요ㅠㅠ\n이중에 원하시는 기능이 있나요?",
            "죄송합니다 이해하기 어려워요T_T",
            "잘 못들었습니다! 키워드로 검색해보시겠어요?",
            "이해하기 어렵네요...",
            "죄송합니다 더 공부해 올게요 \n원하시는 기능이 있으신가요?",
            "어려운 말이네요...다음중 원하는 메뉴를 골라주세요",
            "더 준비해 오겠습니다!",
            "미안해요ㅠㅠ 이해할수 없어요",
            "Sorry! I can't understand T_T",
            "다음 메뉴중에 원하는 기능이 있으신가요?"
        ]
        var inner=[]
        inner.push(FBTemplate.buttonInnerFBT( "병원예약", "병원예약"));
        inner.push(FBTemplate.buttonInnerFBT( "약검색", "약검색"));
        inner.push(FBTemplate.buttonInnerFBT( "FAQ" , "FAQ"));
        conversation.reply(FBTemplate.buttonFBT(replyConversation[randomReply] ,inner));

        conversation.transition();
        done();
    }
};