"use strict"
var express = require("express");
var FBTemplate = require('../FacebookTemplate.js')

module.exports = {
    metadata: () => ({
        "name": "UndefinedServiceRetrieval",
        "properties": {
            "lastQuestion": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
        try {            
        //만약 이 챗봇과 처음 대화하는 사람이라면 이 안내문구를 보냄. 
        //fb_persistent_menu.json의 페이로드 가져옴. 
        
        if(conversation.payload().postback.payload =='first_chat_started'){
            
            conversation.reply("반갑습니다! \n MyDoctor에서는 병원 예약 부터 약 검색까지 각종 의료 서비스를 제공해드립니다. B)");

            var inner=[]
            inner.push(FBTemplate.buttonInnerFBT( "병원 예약", "병원 예약"));
            inner.push(FBTemplate.buttonInnerFBT( "약 검색하기", "약 검색"));
            inner.push(FBTemplate.buttonInnerFBT( "FAQ" , "FAQ"));
            conversation.reply(FBTemplate.buttonFBT("무엇을 도와드릴까요?",inner));
            inner=[]
            inner.push(FBTemplate.buttonInnerFBT( "병명으로 과 찾아보기", "병명으로 과 찾아보기"));
            inner.push(FBTemplate.buttonInnerFBT( "교수님 찾아보기", "교수님 찾아보기"));
            inner.push(FBTemplate.buttonInnerFBT( "키워드로 질문검색" , "키워드로 질문검색"));
            conversation.reply(FBTemplate.buttonFBT("이런기능도 있어요!",inner));
    
            conversation.transition();
            done();
        }

        else{
            var randomReply = Math.floor((Math.random() * 10));
            var replyConversation=[
                "무슨말인지 모르겠어요ㅠㅠ\n이중에 원하시는 기능이 있나요?",
                "죄송합니다 이해하기 어려워요T_T",
                "잘 못들었습니다! 키워드로 검색해보시겠어요?",
                "이해하기 어렵네요...",
                "죄송합니다 더 공부해 올게요 \n원하시는 기능이 있으신가요?",
                "어려운 말이네요...다음중 원하는 메뉴를 골라주세요",
                "더 준비해 오겠습니다!",
                "미안해요ㅠㅠ 이해할수 없어요",
                "Sorry! I can't understand T_T",
                "다음 메뉴중에 원하는 기능이 있으신가요?"
            ]
            var inner=[]
            inner.push(FBTemplate.buttonInnerFBT( "병원 예약", "병원 예약"));
            inner.push(FBTemplate.buttonInnerFBT( "약 검색", "약 검색"));
            inner.push(FBTemplate.buttonInnerFBT( "FAQ" , "FAQ"));
            conversation.reply(FBTemplate.buttonFBT(replyConversation[randomReply] ,inner));
            inner=[]
            inner.push(FBTemplate.buttonInnerFBT( "병명으로 과 찾아보기", "병명으로 과 찾아보기"));
            inner.push(FBTemplate.buttonInnerFBT( "교수님 찾아보기", "교수님 찾아보기"));
            inner.push(FBTemplate.buttonInnerFBT( "키워드로 질문검색" , "키워드로 질문검색"));
            conversation.reply(FBTemplate.buttonFBT("이런기능도 있어요!",inner));
    
            conversation.transition();
            done();
        }    
        
        }
        catch (e) { //db에서 null값을 가져올 경우
            var randomReply = Math.floor((Math.random() * 10));
            var replyConversation=[
                "무슨말인지 모르겠어요ㅠㅠ\n이중에 원하시는 기능이 있나요?",
                "죄송합니다 이해하기 어려워요T_T",
                "잘 못들었습니다! 키워드로 검색해보시겠어요?",
                "이해하기 어렵네요...",
                "죄송합니다 더 공부해 올게요 \n원하시는 기능이 있으신가요?",
                "어려운 말이네요...다음중 원하는 메뉴를 골라주세요",
                "더 준비해 오겠습니다!",
                "미안해요ㅠㅠ 이해할수 없어요",
                "Sorry! I can't understand T_T",
                "다음 메뉴중에 원하는 기능이 있으신가요?"
            ]
            var inner=[]
            inner.push(FBTemplate.buttonInnerFBT( "병원예약", "병원예약"));
            inner.push(FBTemplate.buttonInnerFBT( "약검색", "약검색"));
            inner.push(FBTemplate.buttonInnerFBT( "FAQ" , "FAQ"));
            conversation.reply(FBTemplate.buttonFBT(replyConversation[randomReply] ,inner));
            inner=[]
            inner.push(FBTemplate.buttonInnerFBT( "병명으로 과 찾아보기", "병명으로 과 찾아보기"));
            inner.push(FBTemplate.buttonInnerFBT( "교수님 찾아보기", "교수님 찾아보기"));
            inner.push(FBTemplate.buttonInnerFBT( "키워드로 질문검색" , "키워드로 질문검색"));
            conversation.reply(FBTemplate.buttonFBT("이런기능도 있어요!",inner));
    
            conversation.transition();
            done();
        }
        
        
        
    }
};