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


// Watches Firebase and runs this upon initial page load + when an employee is added
database.ref().on("child_added", function(snapshot) {

	// Initialize variables
	var monthsWorked = 0;
	var totalBilled = 0;

	// Log everything that's coming out of snapshot
	console.log(snapshot.val().name);
	console.log(snapshot.val().role);
	console.log(snapshot.val().startDate);
	console.log(snapshot.val().monthlyRate);

	// Insert fancy math here to calculate monthsWorked for each employee



	// Calculates totalBilled for each employee
	totalBilled = monthsWorked * snapshot.val().monthlyRate;
	console.log("Total Billed: $" + totalBilled);

	// Display each employee's data in the table
	$("#employeeTable > tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" 
		+ snapshot.val().role + "</td><td>" 
		+ snapshot.val().startDate + "</td><td>"
		+ monthsWorked + "</td><td>"
		+ snapshot.val().monthlyRate + "</td><td>" 
		+ totalBilled + "</td></tr>");


// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
})