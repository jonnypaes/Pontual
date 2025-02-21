// src/js/funcionario/functions.js

// Function to set a local storage parameter
function setLocalStorageParam(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

// Function to get a local storage parameter
function getLocalStorageParam(key, defaultValue) {
	let storedValue = localStorage.getItem(key);
	return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
}

// Function to check if the checkbox is checked
function getCheckState() {
	let checkState = checkbox.checked;
	
	if (checkState) {
		document.body.classList.remove("false");
		document.body.classList.add("true");
	} else {
		document.body.classList.remove("true");
		document.body.classList.add("false");
	}
	return checkState;
}

function getCookies() {
	checkState = getLocalStorageParam("toggle-state", isChecked);
	checkbox.checked = checkState;
}

function setCookies() {
	setLocalStorageParam("toggle-state", checkState);
}

async function getPermissions() {
    try {
        const locationPermission = await getLocation(); 
        console.log('Location permission granted:', locationPermission);
        
        const notificationPermission = await getNotification(); 
        console.log('Notification permission granted:', notificationPermission);
        // await requestPush();  // Uncomment if needed
    } catch (error) {
        console.error('Error requesting permissions:', error);
    }
}

function scheduleNotification(hour, minute, content) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hour, minute, 0, 0);
    const timeUntilNotification = targetTime - now;

    setTimeout(function () {
        showScheduledNotification(content);
    }, timeUntilNotification);
}

function showScheduledNotification(content) {
    self.registration.showNotification('Scheduled Notification', {
        body: content
    });
}
