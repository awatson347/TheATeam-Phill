// Global Variables
//-----------------------------------------------------------------------

var search = "";
var musixTrackId = "";
var spotifyTrackId = "";
var lyrics = "";
var copyright = "";


// Functions
//-----------------------------------------------------------------------

// MusixMatch API(Phil)

// Search MusixMatch for track and return first track ID
function getMusicInfo(search) {
	console.log("Searching for: " + search);
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://api.musixmatch.com/ws/1.1/track.search?apikey=2d5aab3db0ef66942e77f09e6372efda&q=" + search,
		"method": "GET",
		"dataType": "json",
		"headers": {
			"cache-control": "no-cache",
			"postman-token": "86d37139-361c-0e1f-bc05-0a826abaa0b6",
		}
	}

	$.ajax(settings).done(function (response) {
		musixTrackId = response.message.body.track_list["0"].track.track_id,
		spotifyTrackId = response.message.body.track_list["0"].track.track_spotify_id,
		console.log('global var spotifyTrackId: ' + spotifyTrackId)
		console.log('global var musixTrackId: ' + musixTrackId)

		//***Testing/Debugging***

		console.log(response)

		// $.each(response.message.body.track_list, function(k, value) {
		// 		console.log('Track ' + k, value);
		// });
		
		console.log("Lyrics Get for ID: " + musixTrackId)
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=2d5aab3db0ef66942e77f09e6372efda&track_id=" + musixTrackId,
			"method": "GET",
			"dataType": "json",
			"headers": {
				"cache-control": "no-cache",
				"postman-token": "ffd2e704-d442-cb45-5451-3dbcc0be3c89"
			}
		}

		$.ajax(settings).done(function (response) {
			lyrics = response.message.body.lyrics.lyrics_body,
			copyright = response.message.body.lyrics.lyrics_copyright,

			//***Testing/Debugging
			console.log('lyrics response: ' + lyrics)
			console.log('musix Copyright: ' + copyright)
		});
	});
}

// App Logic
//-----------------------------------------------------------------------

// resultsPage is loaded but automatically hidden at page load
$("#resultsPage").hide();

// Capture Button Click
$(".searchButton").on("click", function() {

	search = $('.searchInput').val().trim()

/*	// Code for the push
	database.ref().push({
		name: name,
		email: email,
		age: age,
		comment: comment,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});*/



	// Run the getMusicInfo function
	getMusicInfo(search);

	// Gets Lyrics
	// getLyrics(search);

	// console.log("Search button pushed!");

	// Empties the startPage div and shows the resultsPage div
	// window.location.assign("searchResults.html?"+ search);
	$("#startPage").empty();
	$("#resultsPage").show();

	// Don't refresh the page!
	return false;
});


// Initialize Firebase
/*var config = {

};
firebase.initializeApp(config);

var database = firebase.database();*/





/*//Firebase watcher + initial loader HINT: this behaves similarly .on("value")
database.ref().on("child_added", function(childSnapshot) {

	// Log everything that's coming out of snapshot
	console.log(childSnapshot.val());
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().email);
	console.log(childSnapshot.val().age);
	console.log(childSnapshot.val().comment);
	console.log(childSnapshot.val().dateAdded);

	// Update the "All Members" HTML
	$('#full-member-list').append("<div><span id='name'> " + childSnapshot.val().name
	+ " </span><span id='email'> " + childSnapshot.val().email
	+ " </span><span id='age'> " + childSnapshot.val().age
	+ " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");

// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
})

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot){
	// Update the "Most Recent Member" HTML
	$("#namedisplay").html(childSnapshot.val().name);
	$("#emaildisplay").html(childSnapshot.val().email);
	$("#agedisplay").html(childSnapshot.val().age);
	$("#commentdisplay").html(childSnapshot.val().comment);
});*/