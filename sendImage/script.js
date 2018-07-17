// Copyright (C) 2018 Cristobal Valenzuela
// 
// This file is part of RunwayML.
// 
// RunwayML is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// RunwayML is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with RunwayML.  If not, see <http://www.gnu.org/licenses/>.
// 
// ===============================================================
//
// Runway: OpenPose Single Image Demo
// This example sends one image to Runway and draw all humans detected in the image
// p5.js is used to draw the human data sent from Runway
// You should select HTTP from the Input Panel
// 
// Cristóbal Valenzuela
// cris@runwayml.com
//
// ===============================================================

//let canv;
//let img;
let socket;
let imageToggle = 0;
let yourKey = "AIzaSyA-J6H4RpYlo3LShNr345wfy1fjj4wP4wU";
let yourID = "006492290114220674113:v5hcbcsea2y";
let query = "woman standing in a room holding a nintendo wii controller .";

// Wait until the page is loaded
//document.addEventListener("DOMContentLoaded", function(event) {
//  init();
//  
//  // A variable to hold the status of the connection
//  var status = document.getElementById('status');
//
//  // Create a connection with Runway
//  // *You should update this address to match the URL provided by the app
//  // 192.168.1.40:33100
//   socket = io.connect('http://10.12.8.31:33100/query');
//   
//
//  // When a connection is established
//  socket.on('connect', function() {
//    status.innerHTML = 'Connected';
//  });
//  // Handle connection error (in case something is wrong and we can't connect to Runway)
//  socket.on('connect_error', (error) => {
//    console.error(error);
//  });
//  // Handle connection timeout (in case something is wrong and it's taking ages connecting to Runway)
//  socket.on('connect_timeout', (timeout) => {
//    console.warn(socket.io.uri,"connect_timeout",timeout);
//  });
//
//  // When there is new data coming in, update the log element
//  // With im2text, an object is returned in the format:
//  // {
//  //   "results": [
//  //     {
//  //       "caption": "caption 01",
//  //       "prob": 0.0014072401693329688
//  //     },
//  //     {
//  //       "caption": "caption 02",
//  //       "prob": 0.0005297117344185971
//  //     },
//  //     {
//  //       "caption": "caption 03",
//  //       "prob": 0.0005098398921959475
//  //     }
//  //   ]
//  // }
//  socket.on('update_response', function(data) {
//    // Use the most probable result
//    let caption = data.results[0].caption;
//    
//    // Generate a cpation
//    createCaption( caption );
//    
//    // Redundant, but assign the caption to the google query vairable
//    query = caption;
//    
//    //googleImage();
//  });
//});

// Initiate the machine learning loop
function init() {
  createImage( "person3.jpg" );
}

// Main function for creating an image that can be passed to Runway
function createImage( link ) {
  // Create an image tag
  let img = document.createElement( "img" );
  // Set the source of the iamge
  img.src = link;
  
  // Check if the image has loaded, then call loaded, throw an error if not
  if( img.complete) {
    loaded();
  }
  else {
    img.addEventListener( "load", loaded );
    img.addEventListener( "error", function() {
      console.log( "error" );
    } );
  }
  
  // Helper function that runs only when the image has been loaded
  function loaded() {
    // Flag the image for CORS
    img.crossOrigin = "anonymous" ;
    // Scale the image
    img = proportionallyScale( img );
    
    // Create a new canvas
    let canvas = document.createElement( "canvas" );
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext( "2d" );

    // Draw the image to the canvas, height and widht must be provided
    ctx.drawImage( img, 0, 0, img.width, img.height );
    // Add the image to the page
    document.body.appendChild( canvas );
    
    // Send the Canvas to be converted for Runway
    sendImgToRunway( canvas );
  }  
}

// Once the image has loaded
function sendImgToRunway( img ) {
  // Send the image to Runway and specify the model to use
//  socket.emit( 'update_request', {
//    data: img.toDataURL('image/jpeg'),
//  } );
  img.toDataURL('image/jpeg');
}

function googleImage() {
  let googleSearch = `https://www.googleapis.com/customsearch/v1?key=${yourKey}&cx=${yourID}&num=1&searchType=image&fileType=jpg&q=${query}`;
  
  console.log( googleSearch );
  
  // Using the Google Search API and fetch to pull a JSON file for a single image
  let googleImage = fetch( googleSearch ).then( result => {
    return result.json()
  }).then(
    // Parse the JSON
    parsedJSON => parsedJSON.items["0"].link
  ).then(
    // Create the image
    link => createImage(link)
  )
}

function proportionallyScale( img ) {
  // If the image is not 500px wide
  if( img.width != 500  ) {
    // Deterimne the ratio of height to width
    const scalar = img.height / img.width;

    // Make the width 500px
    img.width = 500;

    // Scale the height accordingly
    img.height = 500 * scalar;
  }

  return img;
}

function createCaption( string ) {
  // Create a div element
  const div = document.createElement( "div" );

  // Fill it with the caption that was passed in
  div.innerHTML = string;

  // Append the div to the document
  document.body.appendChild( div );
}

googleImage();




























// p5 setup function
function setup() {  // Create a button to toggle between two images
  //  let button = createButton( "Swap Image" );
  //  // Assign functionality to button
  //  button.mousePressed( swapImages );

  //  // Create a canvas
  //   canv = createCanvas( 100, 100 );

  // Load the image, then send it to a callback function
  //  loadImage( "person3.jpg", function( img ){
  //    // Create an approprietly sized canvas
  //    let canv = createCanvas( img.width, img.height );
  //    // Draw the image to the canvas
  //    image(img, 0, 0);
  //    // Send the image to Runway and specify the model to use
  //    img.loadPixels();
  //    
  //    // Send a Base64 image to Runway
  //    socket.emit('update_request', {
  //      data: img.canvas.toDataURL('image/jpeg'),
  //    });
  //  } );


}