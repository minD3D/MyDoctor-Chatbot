"use strict"

// var hangul = require('../hangul_processing/hangultest.js');
var express = require("express");
var mysql = require('mysql');
var database = require('./pool.js');

module.exports = {
    metadata: () => ({
        "name": "MakeReservation",
        "properties": {
            "reservationDate": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var test = conversation.properties().reservationDate;

        conversation.reply({
            text: '예약날짜' + test.date
        });
    }
}