"use strict"
var express = require("express");
var FBTemplate = require('../FacebookTemplate.js')

module.exports = {
    metadata: () => ({
        "name": "StartServiceRetrieval",
        "properties": {
            "lastQuestion": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {

        var inner=[]
        inner.push(FBTemplate.buttonInnerFBT( "병원예약", "병원예약"));
        inner.push(FBTemplate.buttonInnerFBT( "약검색", "약검색"));
        inner.push(FBTemplate.buttonInnerFBT( "FAQ" , "FAQ"));
        conversation.reply(FBTemplate.buttonFBT("무엇을 도와드릴까요?",inner));

        
        inner=[]
        inner.push(FBTemplate.buttonInnerFBT( "병명으로 과 찾아보기", "병명으로 과 찾아보기"));
        inner.push(FBTemplate.buttonInnerFBT( "교수님 찾아보기", "교수님 찾아보기"));
        inner.push(FBTemplate.buttonInnerFBT( "키워드로 질문검색" , "키워드로 질문검색"));
        conversation.reply(FBTemplate.buttonFBT("이런기능도 있어요!",inner));

        conversation.transition();
        done();
    }
};