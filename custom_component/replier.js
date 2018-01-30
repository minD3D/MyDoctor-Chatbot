"use strict"

var MedicineRetrieval = require('./medicine_retrieval.js');

module.exports = {
    metadata: () => ({
        "name": "replier",
        "properties": {
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        var InputMedicineName = conversation.messagePayload().text;
        var GeneralMedicineName = hangul.hanguler(InputMedicineName);

        MedicineRetrieval.hitQueryTest(GeneralMedicineName).then(() => {
            // var name = medicine_name[0].name;
            // var efficacy = medicine_name[0].efficacy;
            // var howToUse = medicine_name[0].howtouse;
            // var precaution = medicine_name[0].precaution;
            // var originalUrl = medicine_name[0].originalurl;
            // var imgUrl = medicine_name[0].imgurl;

            var channelType = conversation.channelType();
            var fbReply = {};
            var ktReply = {};
            if (channelType == 'facebook') {
                conversation.reply(fbReply);
            }
            else if (channelType == 'kakaotalk') {
                conversation.reply(ktReply);
            }
        })
    }
}