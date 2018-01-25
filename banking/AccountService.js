"use strict";

const moment = require('moment');

const DATA_ROOT = './data/';

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

const ACCOUNTS_BASE = {
    netBalance: function() {
        var net = 0.0;
        this.forEach((account) => {
            net += account.balance();
        });
        return roundToTwo(net);
    }
};

const ACCOUNTS = Object.assign(require(DATA_ROOT + 'accounts.json'), ACCOUNTS_BASE);

const PAYMENT_ACCOUNTS = require(DATA_ROOT + 'paymentAccounts.json');

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

const ACCOUNT_BASE = {
    balance: function(filter) {
        var txns = this.filterTransactions(filter);
        var balance = 0.0;
        for (let i=0; i < txns.length; ++i) {
            balance += txns[i].amount;
        }
        return roundToTwo(balance);
    },

    largestTxn: function(filter) {
        var txns = this.filterTransactions(filter);
        var largest = 0;
        for (let i=0; i < txns.length; ++i ) {
            if (Math.abs(txns[i].amount) >
                Math.abs(txns[largest].amount)) {
                largest = i;
            }
        }
        return txns[largest];
    },

    lastNTxns: function(n, filter) {
        var txns = this.filterTransactions(filter);
        return txns.slice(-n);
    },

    filterTransactions: function(filter) {
        if (filter === undefined) return this.transactions;

        let filtered = [];
        for (let i=0; i < this.transactions.length; ++i ) {
            let txn = this.transactions[i];
            // test the txn against all keys (conditions) in the filter
            let includeTxn = true;
            Object.keys(filter).forEach( (key) => {
                if (key === 'duration' && filter.duration) {
                    console.log('AccountService: filterTransactions applying duration=' + JSON.stringify(filter.duration));
                    if (!moment(txn.date).isBetween(filter.duration.from, filter.duration.to, null, '[]')) {
                        includeTxn = false;
                    }
                }
                else {
                    if (txn[key] !== filter[key]) {
                        includeTxn = false;
                    }
                }
            });
            if (includeTxn) {
                filtered.push(txn);
            }
        }
        return filtered;
    },

    remainingLimit: function() {
        return (this.type === 'credit card') ? this.limit + this.balance() : undefined;
    }
}

// Load data

for (let i=0 ; i < ACCOUNTS.length ; ++i) {
    var account = ACCOUNTS[i];
    try {
        account.transactions = require(DATA_ROOT + account.id + '.json');
    }
    catch (error) {
        // probably module not found, that's ok, no transactions..
        account.transactions = [];
    }
    ACCOUNTS[i] = Object.assign(Object.create(ACCOUNT_BASE), account);
}

module.exports = {
    accounts: (type) => {
        if (type !== undefined) {
            let filteredAccounts = Object.assign([], ACCOUNTS_BASE);
            ACCOUNTS.forEach((account) => {
                if (account.type === type) {
                    filteredAccounts.push(account);
                }
            });
            return filteredAccounts;
        }

        return ACCOUNTS;
    },

    paymentAccounts: () => {
        return PAYMENT_ACCOUNTS;
    }
}
