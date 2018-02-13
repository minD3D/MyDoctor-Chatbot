"use strict"
var express = require("express");

//과-교수 루트로 예약을 진행할 때 Instant App에 과/교수 인자를 넘겨주기 위함.
//그 루트가 아닐때는 setProfessorInOther.js 로.
module.exports = {
    metadata: () => ({
        "name": "SetProfessorInDept",
        "properties": {
            "professor_result": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var returnpayload = conversation.messagePayload().postback;
        conversation.reply({ text:  returnpayload+'교수님께 예약하시겠어요?' });
        conversation.variable("professorName", returnpayload); 
        conversation.transition();
        done();
    }
};