"use strict"
var express = require("express");

module.exports = {
    metadata: () => ({
        "name": "SetProfessorInOther",
        "properties": {
            "professor_result": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var returnpayload = conversation.messagePayload().postback;
        var returnarr = returnpayload.split(',');
        
        conversation.reply({ text: returnarr[1]+'교수님께 예약하시겠어요?' });
        conversation.variable("professorName", returnarr[1]);
        conversation.variable("subjectName", returnarr[0]);
        
        conversation.transition();
        done();
    }
};