"use strict"

var express = require("express");
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'medicine_test'
});

module.exports = {

    metadata: () => ({
        "name": "Reservation",
        "properties": {
            // "medicineName": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {

        // id of chatbot user
        var userid = conversation.payload().sender.id;
    }
}

