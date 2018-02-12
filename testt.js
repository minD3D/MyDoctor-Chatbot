var express    =  require("express");  
var mysql      = require('mysql');  
var pool = mysql.createPool({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : '1q2w3e4r5t',
    database:'medicinedata',
    connectionLimit:20,
    waitForConnections:false
});

var test=isNaN(1);

console.log(test);