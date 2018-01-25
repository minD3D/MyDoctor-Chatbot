"use strict"

var MedicineService = require('./MedicineService');

module.exports = {

    metadata: () => ({
        "name": "MedicineRetrieval",
        "properties": {
            "medicineName": { "type": "string", "required": true }
        },
        "supportedActions": [

        ]
    }),

    invoke: (conversation, done) => {
        //사용자가 입력한 문장에서(properties) medicineName 엔티티를 추출한다.
        // var medicineName = conversation.properties().medicineName;
        // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBB' + medicineName);
        

        // var medicines = MedicineService.medicines(medicineName);
        var medicines = MedicineService.medicines();
        // console.log(medicines);
        // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
        // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB' + medicine);
        // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB' + medicine[0]);
        // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB' + medicine.name);
        // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBB' + medicine[0].name);
        // if(medicines) {
            // var medicine = medicines[0];
            conversation.reply({text: '컴포넌트에서 출력한 대답입니다.' + medicines});
        // } 
        // else {
            // conversation.reply({text: '컴포넌트에서 출력한 대답입니다. medicine가 비어있습니다.'});
        // }
        

        // conversation.transisition();

        done();
    }
};