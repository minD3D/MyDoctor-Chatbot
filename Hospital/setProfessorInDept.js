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
        conversation.reply({ text:  returnpayload+'교수님께 예약하시겠어요?' });
        conversation.variable("professorName", returnpayload); 
        conversation.transition();
        done();
    }
};