/*
 *  Author: Melanie Garvey
 *  Date: 2/22/17
 *  Project Name: Great Giphy API Search
 *  Project Criteria:
        Display four random still gifs on page load.
        Include feature to play gifs on mouseover.
        Enable users to search gifs by rating.
        Enable users to reset search.
        Display a maximum of search result 24 gifs per page.
*/

function requestPage (queryURL) { 
  return $.ajax({url: queryURL, method: 'GET'});
}

var image_via_dom = function (item) {
  // Create image DOM object.
  var img = document.createElement('img');
    // Set objects values.
    img.src = item.images.fixed_height_still.url;
    img.dataset.id = item.id;
    img.classList.add('thumb');
    img.dataset.animated = item.images.fixed_height.url;
  
  // Create title DOM object.  
  var title = document.createElement('div');
    // Set object values.
    title.innerHTML = item.bitly_url;

  // Create div to append image & title to the DOM.
  var div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(title);
  
  // Create event listeners for click & mouseover.
  img.addEventListener('click', function (e) {
    console.log(e.target.dataset.id + ' was clicked via the addEventListener inside image_via_dom()');
  });
  
  img.addEventListener('mouseover', function (e) {
    console.log(e.target);
    e.target.src = e.target.dataset.animated;    
  });
  
  // Return object.
  return (div);
};

function oops () {
  // Assign variable for random api url.
  var api = 'https://api.giphy.com/v1/gifs/search?q=oops';
  
  // Set limit for maximum amount of search results displayed on one page.
  var limit = '&limit=1';
  
  // Set rating for y.
  var rating = '&rating=y';
  
  // Assign json as the format for returned data.
  var format = '&fmt=json';

  // API public key.
  var key = '&api_key=dc6zaTOxFJmzC';
  
  // Create new variable called queryURL which pieces together all of the above variables.
  var queryURL = api + limit + rating + format + key;
  
  requestPage(queryURL).done(function(response) {
    var wrap = document.getElementById('feedback');
    // Loop through images & add to DOM.
    for(var i = 0; i < response.data.length; i++) {            
      wrap.appendChild(image_via_dom(response.data[i]));
    }
  console.log(response.data);
  });
}

function ratedR () {
  // Assign variable for random api url.
  var api = 'https://api.giphy.com/v1/gifs/search?q=naughty';
  
  // Set limit for maximum amount of search results displayed on one page.
  var limit = '&limit=1';
  
  // Set rating for y.
  var rating = '&rating=y';
  
  // Assign json as the format for returned data.
  var format = '&fmt=json';

  // API public key.
  var key = '&api_key=dc6zaTOxFJmzC';
  
  // Create new variable called queryURL which pieces together all of the above variables.
  var queryURL = api + limit + rating + format + key;
  
  requestPage(queryURL).done(function(response) {
    var wrap = document.getElementById('feedback');
    // Loop through images & add to DOM.
    for(var i = 0; i < response.data.length; i++) {            
      wrap.appendChild(image_via_dom(response.data[i]));
    }
  console.log(response.data);
  });
}


function search (e) {
  /* Start to construct URL that will actually be utilized in the funtion by making individual variables 
    (some of which are dynamic) that define the search criteria. */
  var api = 'https://api.giphy.com/v1/gifs/search?q=';

  // Assign variable for userQuery so it can be dynamically applied to the url.
  var userInput = $('#userQuery').val().trim();
    // Convert input for a sucessful API call.
    userInput = userInput.replace(/ /g, "+");

  // Set limit for maximum amount of search results displayed on one page.
  var limit = '&limit=24';

  // Assign variable for userRating so it can be dynamically applied to the url.
  var userRating = '&rating=' + $('#userRating option:selected').text();
  
  // Assign json as the format for returned data.
  var format = '&fmt=json';

  // API public key.
  var key = '&api_key=dc6zaTOxFJmzC';

  // Create new variable called queryURL which pieces together all of the above variables.
  var queryURL = api + userInput + limit + userRating + format + key;
          
  requestPage(queryURL).done(function(response) {
    var wrap = document.getElementById('feedback');
      if (response.data.length > 0) {
        // Loop through images & add to DOM.
        for(var i = 0; i < response.data.length; i++) {            
          wrap.appendChild(image_via_dom(response.data[i]));
        }
      // Links search function to oops function.
      }else {
        document.getElementById('feedback').innerHTML = 'oops';
        oops ();
      }
      // Links search function to ratingR function.
      if (userRating == '&rating=R') {
        document.getElementById('feedback').innerHTML = 'naughty';
        document.getElementById('searchButton').style.display = 'none';
        ratedR ();
      }
      
    console.log(queryURL);
    
  });
  
  e.preventDefault();
}

function reset () {
  // Grab the img using the id and change the src to empty to remove the image.
  //$('feedback').attr('src','');
  $('#feedback').empty();
}

function ratingCheck (e) {
  if (e.target.value !== 'r') {
    document.getElementById('searchButton').style.display = 'block';
    reset ();
  }
  search();
}

$(document).ready(function randomLoad () {
  // Start to construct URL for random gifs to load on the initial page load.
  // Assign variable for random api url.
  var api = 'https://api.giphy.com/v1/gifs/search?q=cat';
  
  // Set limit for maximum amount of search results displayed on one page.
  var limit = '&limit=4';
  
  // Set rating for y.
  var rating = '&rating=y';
  
  // Assign json as the format for returned data.
  var format = '&fmt=json';

  // API public key.
  var key = '&api_key=dc6zaTOxFJmzC';

  // Create new variable called queryURL which pieces together all of the above variables.
  var queryURL = api + limit + rating + format + key;
  
  requestPage(queryURL).done(function(response) {
    var wrap = document.getElementById('feedback');
    // Loop through images & add to DOM.
    for(var i = 0; i < response.data.length; i++) {            
      wrap.appendChild(image_via_dom(response.data[i]));
    }
  console.log(response.data);
  });
});        
  
$(document).ready(function() {
  $('#searchButton').on('click', search);
  $('#resetButton').on('click', reset);
  $('#userRating').on('change', ratingCheck);
});
