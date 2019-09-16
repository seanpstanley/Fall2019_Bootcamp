/* Add all the required libraries*/
'use strict';

var mongoose = require('mongoose'), 
  Schema = mongoose.Schema, 
  Listing = require('./ListingSchema.js'), 
  config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.find({ name: 'Library West' }, function(err, listing) {
    if (err) throw err;
  
    // object of the user
    console.log('Libary West Listing:');
    console.log(listing + '\n');
  });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  // search for the listing by code and remove it
  Listing.findOneAndDelete({ code: 'CABL' }, {new : false}, function(err, listing) {
    if (err) throw err;

    console.log('CABL Listing:');
    console.log(listing);
    
    console.log('Listing successfully removed.\n');
    });
};
var updatePhelpsLab = function() {
  /*
    Phelps Lab's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
  Listing.findOneAndUpdate({ name: 'Phelps Laboratory' }, { address: '1953 Museum Rd, Gainesville, FL 32603, United States', coordinates: {latitude: 29.644890, longitude: -82.348834} }, {new : true}, function(err, listing) {
    if (err) throw err;
    
    console.log('Updated Phelps Lab Listing:');
    // we have the updated user returned to us
    console.log(listing + '\n');
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   // get all the listings and store them in the listings object
  Listing.find({}, function(err, listings) {
    if (err) throw err;
    
    console.log('All listings:');
    // log the object containing all of the listings
    console.log(listings);
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();