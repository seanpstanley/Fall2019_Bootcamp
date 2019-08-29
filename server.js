var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
    // parse the url to find the path
    var parsedUrl = url.parse(request.url);
    
    // if the path of the url is /listings and request type is get, send JSON
    if (request.method == 'GET' && parsedUrl.pathname == '/listings') {
        // specify the content type and send the listing data
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(listingData);

    }
    // if the path of the url is not /listings and the request type is not get, send 404 error
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Bad gateway error'); 
    }  
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    if (err) throw err;
    // grab the JSON info from the file
    listingData = data;

    // creates (not starts) server
    server = http.createServer(requestHandler);

    // stars server and listens for requests on port 8080
    server.listen(port, function() {
        // executes callback function after server is listening
        console.log('Server listening on: http://127.0.0.1:' + port);
    });
});