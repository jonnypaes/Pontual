var checkbox = document.getElementById("toggle");

// Handle Window load
window.addEventListener("load", function() {
	onCreate();
});

window.addEventListener('push', function(event) {
	listenerEvent();
});

// Handle checkbox changes

checkbox.addEventListener("change", async function () {
    const isChecked = checkbox.checked;
    try {
        await onChange(); 
        // sendDataToServer();
    } catch (error) {
        console.error("Error obtaining geolocation data:", error);
    }
});

// Function to execute when the window loads
function onCreate() {
	getLanguage();
	getPermissions();
	getCookies();
	getCheckState();
	onListen();
}

// Function to execute when the checkbox changes
function onChange() {	
	getCheckState(); 
	setCookies();
	verification();
}	

// Function to execute in background
function onListen() {
	runListener();
}	
