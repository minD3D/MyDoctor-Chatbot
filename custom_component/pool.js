"use strict"

var mysql = require('mysql');
var express = require("express");
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1q2w3e4r5t',
    database: 'myDoctor'
});

var getConnection = function (cb) {
    pool.getConnection((err, connection) => {
        //if(err) throw err;
        //pass the error to the cb instead of throwing it
        if (err) {
            return cb(err);
        }
        cb(null, connection);
    });
};
module.exports = {
    getConnection
}