var Hangul = require('./hangul.js');

var input ='아무거나 아무꺼냐 아뮤겨냐';
var wordToLetter = Hangul.disassemble(input);
console.log(input);
//console.log(wordToLetter);

//자모음을 단일화
function stronger(x){
    if(x == 'ㅑ') return 'ㅏ';
    if(x == 'ㅕ') return 'ㅓ';
    if(x == 'ㅛ') return 'ㅗ';
    if(x == 'ㅠ') return 'ㅜ';
    if(x == 'ㅐ' || x == 'ㅖ'|| x == 'ㅒ') return 'ㅔ';

    if(x == 'ㄲ' || x == 'ㅋ') return 'ㄱ';
    if(x == 'ㄸ') return 'ㄷ';
    if(x == 'ㅃ' || x == 'ㅍ') return 'ㅂ';
    if(x == 'ㅆ') return 'ㅅ';
    if(x == 'ㅉ' || x == 'ㅊ') return 'ㅈ';
    
    return x;
  }

//다시 합친다
var output = Hangul.assemble(wordToLetter)
console.log(Hangul.assemble(Hangul.disassemble(input).map(stronger)));