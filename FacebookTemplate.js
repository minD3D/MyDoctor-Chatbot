"use strict";
var express = require("express");
var path = require('path');
module.exports= {


genericFBT: function genericFBT(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL ){
  //입력된 부분을 generic 템플릿 형식으로 변환

  function genericTemplate(imgurl, title, subtitle, buttonname, buttonurl){
    
    // var arSplitUrl = imgurl.split("/");    // "/" 로 전체 url 을 나눈다
    // var nArLength = arSplitUrl.length;
    // var arFileName = arSplitUrl[nArLength-1];   // 나누어진 배열의 맨 끝이 파일명이다
    // var arSplitFileName = arFileName.split(".");   // 파일명을 다시 "." 로 나누면 파일이름과 확장자로 나뉜다
    // var sFileName = arSplitFileName[0];         // 파일이름
    // var sFileExtension = arSplitFileName[1];     // 확장자
    
    // var sFileName_new = sFileName.replace(/\s+/g, '%20'); //공백을 '%'문자로 치환해주어야 사진이 제대로 출력됨.
    // var img_url_fin = sFileName_new+"."+sFileExtension;



    var reply = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type":"generic",
                "elements":[
                   {
                    "title": title,
                    "image_url": refineUrl(imgurl),
                    "subtitle": subtitle,
                    "buttons":[
                        {
                            "type":"web_url",
                            "url": buttonurl,
                            "title":buttonname
                          }
                          // ,{
                          //       "type":"postback",
                          //       "title":"안녕",
                          //       "payload":"안녕"
                          //   }
                        ]
                    }]      
                  
              }
        }
    }
  return reply
}
  
  return genericTemplate(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL );
},

genericTwoFBT: function genericTwoFBT(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL, genericButtonName2nd ){
  //입력된 부분을 generic 템플릿 형식으로 변환

  function genericTwoTemplate(imgurl, title, subtitle, buttonname, buttonurl, buttonname2nd){

    var reply = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type":"generic",
                "elements":[
                   {
                    "title": title,
                    "image_url": refineUrl(imgurl),
                    "subtitle": subtitle,
                    "buttons":[
                        {
                            "type":"web_url",
                            "url": buttonurl,
                            "title":buttonname
                          },{
                            "type":"postback",
                            "title": buttonname2nd,
                            "payload": title
                          }    
                        ]
                    }]      
                  
              }
        }
    }
  return reply
}
  
  return genericTwoTemplate(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL, genericButtonName2nd );
},


genrInnerFBT: function genrInnerFBT(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL ){
    //입력된 부분을 generic 템플릿 형식으로 변환
  
    function genericInnerTemplate(imgurl, title, subtitle, buttonname, buttonurl){
      
      var reply = {                      
                      "title": title,
                      "image_url": refineUrl(imgurl),
                      "subtitle": subtitle,
                      "buttons":[
                          {
                              "type":"web_url",
                              "url": buttonurl,
                              "title":buttonname
                            }    
 
                          ]}
      
    return reply
  }
    
    return genericInnerTemplate(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL );
  },


  //url버튼 1개, postback버튼 1개 조합
  genrInnerTwoFBT: function genrInnerTwoFBT(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL, genericButtonName2nd){
    //입력된 부분을 generic 템플릿 형식으로 변환
  
    function genericInnerTwoTemplate(imgurl, title, subtitle, buttonname, buttonurl, buttonname2nd){
      
      var reply = {                      
                      "title": title,
                      "image_url": refineUrl(imgurl),
                      "subtitle": subtitle,
                      // "default_action": {
                      //   "type": "web_url",
                      //   "url": buttonurl,
                      //   "messenger_extensions": true,
                      //   "webview_height_ratio": "tall",
                      //   "fallback_url": buttonurl
                      // },
                      "buttons":[
                            {
                              "type":"web_url",
                              "url": buttonurl,
                              "title":buttonname
                            },{
                              "type":"postback",
                              "title": buttonname2nd,
                              "payload": title
                            }    
 
                          ]}
      
    return reply
  }
    
    return genericInnerTwoTemplate(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL, genericButtonName2nd);
  },


  ////






  cardFBT: function cardFBT(input){
    //입력된 부분을 card 템플릿 형식으로 변환 
    //10 이하의 카드 generic template의 payload 인자(json)이 순서로 들어간다 
    var reply = {
        "attachment": {
            "type": "template",
            "payload": {
                  "template_type":"generic",
                  "elements": input     
            } 
        }
    }

    return reply;
  },
    
  

buttonFBT: function buttonFBT(buttonName, buttonURL, buttonText){
  //입력된 부분을 button 템플릿 형식으로 변환
  function buttonTemplate(name, url, text){
      var reply =  {
            "attachment":{
                "type":"template",
                "payload":{
                  "template_type":"button",
                  "text": text,
                  "buttons":[
                    {
                      "type": "web_url",
                      "url": url,
                      "title": name
                    }
                  ]
                }
              }
        }
      return reply
    }
      
    return buttonTemplate(buttonName,buttonURL, buttonText);
},

listFBT: function listFBT(input){
  //입력된 부분을 button 템플릿 형식으로 변환
      var reply =  {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "list",
      "top_element_style": "compact",
      "elements": input
    }
  }
}
      return reply
  },
  
listInnerFBT: function listInnerFBT(Question, Answer, url){
  //입력된 부분을 generic 템플릿 형식으로 변환
   var reply = {
      "title": Question,
      "subtitle": Answer,
      "buttons":[
        {
          "type": "web_url",
          "url": url,
          "title": "자세히 보기"
        }
      ]
    }
    
  return reply
}
        
}

//파일url경로 정제 작업
//파일명에 띄어쓰기가 포함된 사진이 있는 것에 주의해야 함 
//공백 문자 아스키코드 = '%20'
function refineUrl(input_url){
  var fileNameRefined = path.basename(input_url, path.extname(input_url)).replace(/\s+/g, '%20');
  var final_img_url = path.dirname(input_url) + "/" + fileNameRefined + path.extname(input_url);
  return final_img_url;
}





// "message": {
//   "attachment": {
//     "type": "template",
//     "payload": {
//       "template_type": "list",
//       "top_element_style": "compact",
//       "elements": [
//         {
//           "title": "Classic T-Shirt Collection",
//           "subtitle": "See all our colors",
//           "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",          
//           "buttons": [
//             {
//               "title": "View",
//               "type": "web_url",
//               "url": "https://peterssendreceiveapp.ngrok.io/collection",
//               "messenger_extensions": true,
//               "webview_height_ratio": "tall",
//               "fallback_url": "https://peterssendreceiveapp.ngrok.io/"            
//             }
//           ]
//         },
//         {
//           "title": "Classic White T-Shirt",
//           "subtitle": "See all our colors",
//           "default_action": {
//             "type": "web_url",
//             "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
//             "messenger_extensions": false,
//             "webview_height_ratio": "tall"
//           }
//         },
//         {
//           "title": "Classic Blue T-Shirt",
//           "image_url": "https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
//           "subtitle": "100% Cotton, 200% Comfortable",
//           "default_action": {
//             "type": "web_url",
//             "url": "https://peterssendreceiveapp.ngrok.io/view?item=101",
//             "messenger_extensions": true,
//             "webview_height_ratio": "tall",
//             "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
//           },
//           "buttons": [
//             {
//               "title": "Shop Now",
//               "type": "web_url",
//               "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
//               "messenger_extensions": true,
//               "webview_height_ratio": "tall",
//               "fallback_url": "https://peterssendreceiveapp.ngrok.io/"            
//             }
//           ]        
//         }
//       ],
//        "buttons": [
//         {
//           "title": "View More",
//           "type": "postback",
//           "payload": "payload"            
//         }
//       ]  
//     }
//   }
// }