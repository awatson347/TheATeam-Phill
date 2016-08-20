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
	var empStartDate = moment($('#startDateInput').val().trim(), "MM/DD/YY").format("X");
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

	// Store the child's snapshot data in local variables to make life easier
	var empName = snapshot.val().name;
	var empRole = snapshot.val().role;
	var empStartDate = snapshot.val().startDate;
	var empMonthlyRate = snapshot.val().monthlyRate;

	// Log everything that's coming out of snapshot
	console.log(empName);
	console.log(empRole);
	console.log(empStartDate);
	console.log(empMonthlyRate);

	// Convert the UNIX Start Date back to the American date format for readability
	var empStartAmerican = moment.unix(empStartDate).format("MM/DD/YY");

	// Calculate monthsWorked for each employee
	var monthsWorked = moment().diff(moment.unix(empStartDate, "X"), "months");

	// Calculates totalBilled for each employee
	var totalBilled = monthsWorked * empMonthlyRate;
	console.log("Total Billed: $" + totalBilled);

	// Display each employee's data in the table
	$("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" 
		+ empRole + "</td><td>" 
		+ empStartAmerican + "</td><td>"
		+ monthsWorked + "</td><td>"
		+ empMonthlyRate + "</td><td>" 
		+ totalBilled + "</td></tr>");


// Handle the errors
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
})