//POSTMAN CODE

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://api.musixmatch.com/ws/1.1/track.search?apikey=2d5aab3db0ef66942e77f09e6372efda&q=",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "86d37139-361c-0e1f-bc05-0a826abaa0b6",
    // "origin": "Access-Control-Allow-Origin"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});




// OLD CODE

// var musixKey = "2d5aab3db0ef66942e77f09e6372efda"

// function getMusixSongId(song){
// 	var musixKey = "2d5aab3db0ef66942e77f09e6372efda"
// 	var song = "certain shade of green"
// 	var queryURL = "https://crossorigin.me/api.musixmatch.com/ws/1.1/track.search?q=" + song + "&apikey=" + musixKey;
// 	$.ajax(
// 		{
// 			url: queryURL, 
// 			method: 'GET',	
// 			crossDomain: true,
// 			// headers: {
// 			// 	Origin: "Access-Control-Allow-Origin"
// 			// }
// 		}
// 		).done(function(response) {
// 		console.log(response);

// 		var musixId = response.track_list.track.track_id
// 	});
// };

// getMusixSongId ();


