"use strict"

var AccountService = require('./AccountService');

module.exports = {

    metadata: () => ({
        "name": "BalanceRetrieval",
        "properties": {
            "accountType": { "type": "string", "required": true }
        },
        "supportedActions": [
        ]
    }),

    invoke: (conversation, done) => {
        var accountType = conversation.properties().accountType;
        conversation.logger().info('BalanceRetrieval: getting balance for account type=' + accountType);

        //날짜를 받아와 월급날까지를 계산     
        var today = new Date();
        var dd = today.getDate();
        var daysLeft = 25 - dd;
        if (daysLeft < 0) daysLeft += 30;

        var accounts = AccountService.accounts(accountType);
        if (accounts.length > 0) {
            var account = accounts[0];
            conversation.logger().info('BalanceRetrieval: account id ' + account.id + ' balance=' + account.balance());
            if (accountType === 'credit card') {
                conversation.reply({ text: '신용카드의 (' + account.id + ') 남은 한도는 $' + String(account.remainingLimit()) + '입니다.' });
                //대답 하는 부분 수정
                conversation.reply({ text: 'test월급 날인 25일까지는 (' + daysLeft + ")일 이 남았습니다. 힘내세요!" });
            }
            else conversation.reply({ text: accountType + '의 (' + account.id + ') 잔액은 $' + String(account.balance()) + ' 입니다.' });

        }
        else {
            conversation.logger().info('BalanceRetrieval: no accounts of specified type found!');
            conversation.reply({ text: '죄송합니다, ' + accountType + ' 라는 계좌가 존재하지 않아요.' });
        }
        conversation.transition();

        done();
    }
};
