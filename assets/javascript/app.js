$(document).ready(function() {

// Global Variables
//-----------------------------------------------------------------------

var search = "";
var musixTrackId = "";
var spotifyTrackId = "";
var musicBrainzId = "";
var lyrics = "";
var copyright = "";
var artist = "";
var album = "";
var song = "";
var albumArt = "";
var releaseDate = "";


// Functions
//-----------------------------------------------------------------------

// MusixMatch API(Phil)

// Search MusixMatch for track and return first track ID
function getMusicInfo(search) {
	// console.log("Searching for: " + search);
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://crossorigin.me/http://api.musixmatch.com/ws/1.1/track.search?apikey=2d5aab3db0ef66942e77f09e6372efda&q=" + search,
		"method": "GET",
		"dataType": "json",

		"headers": {
			// "cache-control": "no-cache",
			"postman-token": "86d37139-361c-0e1f-bc05-0a826abaa0b6",
		}
	}

	$.ajax(settings).done(function (response) {
		musixTrackId = response.message.body.track_list["0"].track.track_id;
		spotifyTrackId = response.message.body.track_list["0"].track.track_spotify_id;
		musicBrainzId = response.message.body.track_list["0"].track.artist_mbid;
		artist = response.message.body.track_list["0"].track.artist_name;
		album = response.message.body.track_list["0"].track.album_name;
		song = response.message.body.track_list["0"].track.track_name;
		albumArt = response.message.body.track_list["0"].track.album_coverart_800x800;
		releaseDate = response.message.body.track_list["0"].track.first_release_date;
		document.getElementById("player").innerHTML = '<iframe src="https://embed.spotify.com/?uri=spotify:track:' + spotifyTrackId + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
		document.getElementById("player header").innerHTML = "Spotify ID: " + spotifyTrackId;
		//***Testing/Debugging***

		console.log(response)
		console.log('spotifyTrackId: ' + spotifyTrackId)
		console.log('musixTrackId: ' + musixTrackId)
		console.log('artist: '+ artist)
		console.log('song: ' + song)

		// $.each(response.message.body.track_list, function(k, value) {
		// 		console.log('Track ' + k, value);
		// });

		// console.log("Lyrics Get for ID: " + musixTrackId)
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "http://crossorigin.me/http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=2d5aab3db0ef66942e77f09e6372efda&track_id=" + musixTrackId,
			"method": "GET",
			"dataType": "json",
			"headers": {
				// "cache-control": "no-cache",
				"postman-token": "ffd2e704-d442-cb45-5451-3dbcc0be3c89"
			}
		}

		$.ajax(settings).done(function (response) {
			lyrics = response.message.body.lyrics.lyrics_body;
			copyright = response.message.body.lyrics.lyrics_copyright;
			document.getElementById("Lyrics").innerHTML = "<pre>" + lyrics + "</pre><br><br><small>" + copyright + "</small>";
			document.getElementById("lyrics header").innerHTML = "Lyrics for: " + artist + " - " + song;


			//***Testing/Debugging
			// console.log('lyrics response: ' + lyrics)
			// console.log('musix Copyright: ' + copyright)

		});
	});
}

// App Logic
//-----------------------------------------------------------------------

// Places the focus in the big searchInput text-box
$("#searchInput").focus();

// resultsPage is loaded but automatically hidden at page load
/*$("#resultsPage").hide();*/

// Event Listener for hitting Enter key to initiate searching
$("#searchInput").keyup(function(event) {
    if ( event.keyCode === 13 ) {
    	// console.log("Enter key pushed!");
    	$("#searchButton").click();
    }
});

// Capture Button Click to initiate searching
$("#searchButton").on("click", function() {

	search = $('#searchInput').val().trim()

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

	// Don't refresh the page!
	return false;
});


// Modal
//-----------------------------------------------------------------------

var modal = $('.modal');

// Capture Button Click to Login to Spotify (via modal)
$("#loginButton").on("click", function() {
	modal.show();
	$("#cemail").focus();
});

// Capture Button Click on "X" to close modal
$(".close").on("click", function() {
	$("#cemail").val("");
	$("#cpassword").val("");
	$("#cemail-error").empty();
	$("#cpassword-error").empty();	
	modal.hide();
});

// Capture Button Click anywhere outside of the modal to close it
$(window).on("click", function(event) {
	if ( $(event.target).is(modal) ){
		$(".close").click();
	}
});

// User Input Validation for Spotify Login Modal
//-----------------------------------------------------------------------

$("#loginForm").validate({
	rules: {
		email: {
			required: true,
			email: true
		},

		password: {
			required: true,
		}
	},
	messages: {
		email: {
			required: "Please provide an email address"
		},

		password: {
			required: "Please provide a password"
		}
	}
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

});