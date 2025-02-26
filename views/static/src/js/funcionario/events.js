// src/js/funcionario/events.js

// Handle Window load
window.addEventListener("load", function() {
	onCreate();
});

// Handle checkbox changes
checkbox.addEventListener("change", function () {
    try {
        onChange(); 
    } catch (error) {
        console.error("Error obtaining geolocation data:", error);
    }
});

// Handle Listen
window.addEventListener('push', function(event) {
	listenerEvent();
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
