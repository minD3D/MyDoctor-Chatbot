"use strict";

// const moment = require('moment');

// const DATA_ROOT = './data/';


var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'medicine_test'
});

// var medicine_list = [];

function hitQuery(callback) {
    var medicine_name;
    connection.connect();

    connection.query('SELECT * FROM medicine_list WHERE name = "유카본정"', function (err, rows) {
        if (!err) {
            medicine_name = rows;

        }
        else {
            console.log(err);
        }

    });

    return medicine_name;
}
module.exports = {
    medicines: (callback) => {
        var test = hitQuery();

        // console.log(hitQuery());
        // console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
        return test;
        // console.log(hitQuery());

    }
    // medicines: (name) => {
    //     if (name !== undefined) {
    //         // let filteredMedicines = Object.assign([], MEDICINES_BASE);
    //         let filteredMedicines = Object.assign([]);
    //         MEDICINES.forEach((medicine) => {
    //             // if (medicine.name === name) {
    //                 filteredMedicines.push(medicine);
    //             // }
    //         });
    //         return filteredMedicines;
    //     }

    //     return MEDICINES;
    // }

    // medicines: (name) => {

    // medicines: (name) => {
    //     if (name !== undefined) {
    //         let filteredMedicines = Object.assign([], MEDICINES_BASE);
    //         MEDICINES.forEach((medicine) => {
    //             if (medicine.name === name) {
    //                 filteredMedicines.push(medicine);
    //             }
    //         });
    //         return filteredMedicines;
    //     }

    //     return MEDICINES;
    // }

    // paymentAccounts: () => {
    //     return PAYMENT_ACCOUNTS;
    // }
}

// function roundToTwo(num) {
//     return +(Math.round(num + "e+2") + "e-2");
// }

// const MEDICINES_BASE = {
//     netBalance: function () {
//         var net = 0.0;
//         this.forEach((medicine) => {
//             net += medicine.balance();
//         });
//         return roundToTwo(net);
//     }
// };

// const MEDICINES = Object.assign(require(DATA_ROOT + 'medicines.json'), MEDICINES_BASE);
// const MEDICINES = Object.assign(hitQuery());
// const MEDICINES = hitQuery();

// const PAYMENT_ACCOUNTS = require(DATA_ROOT + 'paymentAccounts.json');

/*

filter is:
{
  type:
  category:
  duration:
}
Duration is:
{
  from: "date string",
  to: "date string"
}
*/

// const MEDICINE_BASE = {
//     balance: function (filter) {
//         var txns = this.filterTransactions(filter);
//         var balance = 0.0;
//         for (let i = 0; i < txns.length; ++i) {
//             balance += txns[i].amount;
//         }
//         return roundToTwo(balance);
//     },

//     largestTxn: function (filter) {
//         var txns = this.filterTransactions(filter);
//         var largest = 0;
//         for (let i = 0; i < txns.length; ++i) {
//             if (Math.abs(txns[i].amount) >
//                 Math.abs(txns[largest].amount)) {
//                 largest = i;
//             }
//         }
//         return txns[largest];
//     },

//     lastNTxns: function (n, filter) {
//         var txns = this.filterTransactions(filter);
//         return txns.slice(-n);
//     },

//     filterTransactions: function (filter) {
//         if (filter === undefined) return this.transactions;

//         let filtered = [];
//         for (let i = 0; i < this.transactions.length; ++i) {
//             let txn = this.transactions[i];
//             // test the txn against all keys (conditions) in the filter
//             let includeTxn = true;
//             Object.keys(filter).forEach((key) => {
//                 if (key === 'duration' && filter.duration) {
//                     console.log('AccountService: filterTransactions applying duration=' + JSON.stringify(filter.duration));
//                     if (!moment(txn.date).isBetween(filter.duration.from, filter.duration.to, null, '[]')) {
//                         includeTxn = false;
//                     }
//                 }
//                 else {
//                     if (txn[key] !== filter[key]) {
//                         includeTxn = false;
//                     }
//                 }
//             });
//             if (includeTxn) {
//                 filtered.push(txn);
//             }
//         }
//         return filtered;
//     },

// remainingLimit: function() {
//     return (this.type === 'credit card') ? this.limit + this.balance() : undefined;
// }
// }

// Load data

// for (let i = 0; i < MEDICINES.length; ++i) {
//     var medicine = MEDICINES[i];
//     try {
//         // medicine.transactions = require(DATA_ROOT + medicine.id + '.json');
//         medicine.transactions = medicine.name;
//     }
//     catch (error) {
//         // probably module not found, that's ok, no transactions..
//         medicine.transactions = [];
//     }
//     // MEDICINES[i] = Object.assign(Object.create(MEDICINE_BASE), medicine);
//     MEDICINES[i] = Object.assign(medicine);
// }


