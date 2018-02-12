"use strict"
var express = require("express");

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
        //var returnarr = returnpayload.split(',');
        
        conversation.reply({ text:  returnpayload+'교수님께 예약하시겠어요?' });
        conversation.variable("professorName", returnpayload);
        //conversation.variable("subjectName", returnarr[0]);
        
        conversation.transition();
        done();
    }
};