$( document ).ready(function() {
// Initialize Firebase
/*var config = {

};
firebase.initializeApp(config);

var database = firebase.database();*/

// Place focus on big searchInput text-box
$('.focus1').focus();

// resultsPage is loaded but automatically hidden at page load
$("#resultsPage").hide();

// Capture Button Click
$(".searchButton").on("click", function() {

/*	// Code for the push
	database.ref().push({
		name: name,
		email: email,
		age: age,
		comment: comment,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});*/

	console.log("Search button pushed!");

	// Grab the Search Text-box info
	var search = $('.searchInput').val().trim();

	// Run the getMusicInfo function
	getMusicInfo(search);

	// Empties the startPage div and shows the resultsPage div
	// window.location.assign("searchResults.html?"+ search);
	$("#startPage").empty();
	$("#resultsPage").show();

	// Clears the navbar searchInput text-box and places the focus there
	$('.searchInput').val("");
	$('.focus2').focus();

	// Don't refresh the page!
	return false;
});

function getMusicInfo(search) {
	console.log("Searching for: " + search);
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://api.musixmatch.com/ws/1.1/track.search?apikey=2d5aab3db0ef66942e77f09e6372efda&q=" + search,
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
}

// MusixMatch API (working / Phil)



// End Phil's API


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