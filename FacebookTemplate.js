"use strict";
var express = require("express");
module.exports= {
genericFBT: function genericFBT(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL ){
  //입력된 부분을 generic 템플릿 형식으로 변환

  function genericTemplate(imgurl, title, subtitle, buttonname, buttonurl){
    var reply = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type":"generic",
                "elements":[
                   {
                    "title": title,
                    "image_url": imgurl,
                    "subtitle": subtitle,
                    "buttons":[
                        {
                            "type":"web_url",
                            "url": buttonurl,
                            "title":buttonname
                          }    
                        // {
                        //         "type":"postback",
                        //         "title":"안녕",
                        //         "payload":"안녕"
                        //     }
                        ]
                    }]      
                  
              }
        }
    }
  return reply
}
  
  return genericTemplate(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL );
},

genrInnerFBT: function genrInnerFBT(genericImgUrl, genericTitile, genericSubtitile, genericButtonName, genericButtonURL ){
    //입력된 부분을 generic 템플릿 형식으로 변환
  
    function genericInnerTemplate(imgurl, title, subtitle, buttonname, buttonurl){
      var reply = {                      
                      "title": title,
                      "image_url": imgurl,
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