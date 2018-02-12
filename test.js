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
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req,res){
    pool.getConnection(function(err,connection){
        var query = connection.query('select * from medicine_list', function (err, rows) {
            if(err){
                connection.release();
                throw err;
            }
            console.log(rows);
            res.json(rows);
            connection.release();
        });
       // console.log(query);
    });
});

app.listen(3000);