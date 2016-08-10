var database = firebase.database();

// Initial Values
var empName = "";
var role = "";
var startDate = 0;
var monthlyRate = 0;

// Capture Button Click
$("button").on("click", function() {

	empName = $('#empName').val().trim();
	role = $('#role').val().trim();
	startDate = $('#startDate').val().trim();
	monthlyRate = $('#monthlyRate').val().trim();

	console.log("Submit button pushed!");

	// Code for the push
	database.ref().push({
		name: empName,
		role: role,
		startDate: startDate,
		monthlyRate: monthlyRate,
	});

	// Don't refresh the page!
	return false;
});


//Firebase watcher + initial loader
database.ref().on("child_added", function(snapshot) {

	// Log everything that's coming out of snapshot
	console.log(snapshot.val().name);
	console.log(snapshot.val().role);
	console.log(snapshot.val().startDate);
	console.log(snapshot.val().monthlyRate);

	// Change the HTML to reflect
	$(".table").append("<tr>");
	$(".table").append("<td>" + snapshot.val().name + "</td>");
	$(".table").append("<td>" + snapshot.val().role + "</td>");
	$(".table").append("<td>" + snapshot.val().startDate + "</td>");
	$(".table").append("<td>" + snapshot.val().monthlyRate + "</td></tr>");


// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
})