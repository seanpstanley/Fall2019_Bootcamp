'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

  // copied from listing.model.test, used to grab the database uri from the config file and connect to the database
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */

fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err) throw err;
  // parses the JSON info from the file and stores it in listingData
  var listingData = JSON.parse(data);
  // grabs each entry of listingData 
  listingData.entries.forEach(function(entry) {
    // instantiates a mongoose model for the individual entry of listingData and stores it in dbEntry
    var dbEntry = Listing(entry);
    // saves the entry to the database
    dbEntry.save(function(err){
      if(err) throw err;
      // logs to console after each entry has successfully been saved (note: occurs after log at line 45)
      console.log("Entry successfully saved to database.");
    });
    // logs each element grabbed to the console
    console.log(entry);
  });
});

/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */