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