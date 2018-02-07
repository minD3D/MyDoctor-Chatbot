"use strict";
var Hangul = require('./hangul.js');

// var some ='아무거나 아무꺼냐 아뮤겨냐';

module.exports= {
  hanguler: function hanguler(input){
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
  return Hangul.assemble(Hangul.disassemble(input).map(stronger))
}
}

// var output = Hangul.assemble(wordToLetter)
// console.log(Hangul.assemble(Hangul.disassemble(input).map(stronger)));