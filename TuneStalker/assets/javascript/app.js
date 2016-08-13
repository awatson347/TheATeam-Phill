// Initialize Firebase
/*var config = {

};
firebase.initializeApp(config);

var database = firebase.database();*/

// Capture Button Click
$("#searchButton").on("click", function() {

/*	var name = $('#nameinput').val().trim();
	var email = $('#emailinput').val().trim();
	var age = $('#ageinput').val().trim();
	var comment = $('#commentinput').val().trim();

	// Code for the push
	database.ref().push({
		name: name,
		email: email,
		age: age,
		comment: comment,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});*/

	console.log("Search button pushed!");

	// Redirects to / Refreshes the music page with search results
	window.location.assign("searchResults.html");

/*	// Clears the input text boxes
	$('#nameinput').val("");
	$('#emailinput').val("");
	$('#ageinput').val("");
	$('#commentinput').val("");*/

	// Don't refresh the page!
	return false;
});

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