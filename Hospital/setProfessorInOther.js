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
        try {            

            var returnpayload = conversation.messagePayload().postback;
            console.log("ddddddddddddddddddddddddddddddddddddddddddddddddd!!!!!!!!!!!!!!!!!!dd");
            console.log(returnpayload);
            var returnarr = returnpayload.split(',');
            conversation.reply({ text: returnarr[1]+'교수님께 예약하시겠어요?' });
            conversation.variable("professorName", returnarr[1]);
            conversation.variable("subjectName", returnarr[0]);
            conversation.variable("isReservation", "true");
            conversation.transition();
            done();    
        }
        catch (e) { //db에서 null값을 가져올 경우
            conversation.variable("isReservation", "false");
            conversation.transition();
            done();
        }
    }
};