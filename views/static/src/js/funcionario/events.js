var checkbox = document.getElementById("toggle");

// Handle Window load
window.addEventListener("load", function() {
	onCreate();
});
/*
document.addEventListener("DOMContentLoaded", function () {
	let isChecked = checkbox.checked;
	if (checkbox) {
		checkbox.addEventListener("change", async function () {
		try {
			await onChange(); // Assuming onChange is a function defined elsewhere
			sendDataToServer(); // Assuming sendDataToServer is a function defined elsewhere
		} catch (error) {
			console.error("Error obtaining geolocation data:", error);
		}
		});
	} else {
		console.error("Checkbox element not found in the DOM.");
	}
});
*/
// Handle checkbox changes

checkbox.addEventListener("change", async function () {
    const isChecked = checkbox.checked;
    try {
        await onChange(); // Assuming onChange is a function defined elsewhere
        sendDataToServer(); // Assuming sendDataToServer is a function defined elsewhere
    } catch (error) {
        console.error("Error obtaining geolocation data:", error);
    }
});

// Function to execute when the window loads
function onCreate() {
	getPermissions();
	getCookies();
	checkboxStatus();
	getLocation();
}

// Function to execute when the checkbox changes
function onChange() {
	checkboxStatus(); 
	setCookies();
	verification();
	//sendDataToServer();
}	

// Function to execute in background
function onListen() {
  //
}	
