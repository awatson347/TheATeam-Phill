// Initialize Firebase
var config = {
    apiKey: "AIzaSyAFhxY7vLPtWwBROEeqfkQwadzDOrA3iEg",
    authDomain: "employeedb-29830.firebaseapp.com",
    databaseURL: "https://employeedb-29830.firebaseio.com",
    storageBucket: "employeedb-29830.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

// Capture Button Click
$("#addEmpButton").on("click", function() {

	// Grabs user input
	var empName = $('#empNameInput').val().trim();
	var empRole = $('#roleInput').val().trim();
	var empStartDate = $('#startDateInput').val().trim();
	var empMonthlyRate = $('#monthlyRateInput').val().trim();

	console.log("Submit button pushed!");

	// Push the Add Employee data to FB db
	database.ref().push({
		name: empName,
		role: empRole,
		startDate: empStartDate,
		monthlyRate: empMonthlyRate,
	});

	// Alert
	alert("Employee added!");

	// Clears the input text boxes
	$('#empNameInput').val("");
	$('#roleInput').val("");
	$('#startDateInput').val("");
	$('#monthlyRateInput').val("");

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