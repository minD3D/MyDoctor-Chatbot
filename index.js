"use strict";

var Components = require('./components.js');

// Create a server instance
var server = Components('/components');

// Start the server listening..
server.listen(process.env.SERVICE_PORT || 8800);

var request = require('request');

// 각자 Bot에 맞는 page access token을 넣어준다. 
var PAGE_ACCESS_TOKEN = 'EAAUtdP1mufQBAJZAlqWTpT5xAvdXNXINQ8pVkdmqUDh9GwybxaP681TlAhjf4yzYaNl3MGpG3wDJOvMpYvVyUcAPQV6TZC2KXHBXXBDVXnZAO1N6VXjfViUlQlqxykMxcVDwtZCout7Dxsh3nRfIjKFgfxF55CjaTfI5ZAsYVr3H5ZArBk7gZCb';
//민지 EAAUtdP1mufQBAJZAlqWTpT5xAvdXNXINQ8pVkdmqUDh9GwybxaP681TlAhjf4yzYaNl3MGpG3wDJOvMpYvVyUcAPQV6TZC2KXHBXXBDVXnZAO1N6VXjfViUlQlqxykMxcVDwtZCout7Dxsh3nRfIjKFgfxF55CjaTfI5ZAsYVr3H5ZArBk7gZCb

// Set FB bot greeting text
facebookThreadAPI('./fb-greeting-text.json', 'Greating Text');
// Set FB bot get started button
facebookThreadAPI('./fb-get-started-button.json', 'Get Started Button');
// Set FB bot persistent menu
facebookThreadAPI('./fb-persistent-menu.json', 'Persistent Menu');

// Calls the Facebook graph api to change various bot settings
function facebookThreadAPI(jsonFile, cmd){
    // Start the request
    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token='+ PAGE_ACCESS_TOKEN, //process.env.FB_PAGE_ACCESS_TOKEN
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        form: require(jsonFile)
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(cmd+": Updated.");
            console.log(body);
        } else { 
            // TODO: Handle errors
            console.log(cmd+": Failed. Need to handle errors.");
            console.log(body);
        }
    });
}