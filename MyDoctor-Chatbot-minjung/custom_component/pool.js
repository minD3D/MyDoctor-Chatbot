"use strict"

var mysql = require('mysql');
var express = require("express");
var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'medicine_test'
});


module.exports = {
    pool
}