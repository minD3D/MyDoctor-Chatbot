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

        conversation.transition();
        done();
    }
};