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
}
}
