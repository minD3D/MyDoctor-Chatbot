"use strict";

var Components = require('./components.js');

// Create a server instance
var server = Components('/components');

// Start the server listening..
server.listen(process.env.SERVICE_PORT || 8886);
