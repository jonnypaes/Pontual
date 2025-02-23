// src/js/funcionario/api.js

function getLocation() {
  return new Promise((resolve, reject) => {
    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by this browser."));
    }

    // Return cached coordinates if already available
    if (getLocation.cachedCoordinates) {
      return resolve(getLocation.cachedCoordinates);
    }

    // Define options for the geolocation request
    const options = {
      enableHighAccuracy: false,
      timeout: 10000, // 10-second timeout
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Cache the coordinates for future calls
        getLocation.cachedCoordinates = { latitude, longitude };

        // Update UI elements if they exist
        const latElem = document.getElementById("latitude");
        const lonElem = document.getElementById("longitude");
        if (latElem) latElem.value = latitude;
        if (lonElem) lonElem.value = longitude;

        resolve({ latitude, longitude });
      },
      (error) => {
        // Provide a clearer error message for permission denial
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error("Location permission denied."));
        } else {
          reject(error);
        }
      },
      options
    );
  });
}

async function getNotification() {
    return new Promise(async (resolve, reject) => {
        try {
            if ("Notification" in window) {
                const permission = await Notification.requestPermission();
                console.log("Notification permission status:", permission);
                if (permission === 'granted') {
                    resolve(permission);
                } else {
                    reject(new Error("Notification permission denied."));
                }
            } else {
                reject(new Error("Notifications are not supported by this browser."));
            }
        } catch (error) {
            reject(error);
        }
    });
}

function showNotification(notificationText) {
    if (!("Notification" in window)) {
        console.log("Notifications API is not supported in this browser.");
        return;
    }

    if (Notification.permission === "granted") {
        try {
            new Notification("Pontual!", {
                body: notificationText || "Test notification",
                icon: "public/icons/icon.png"
            });
        } catch (error) {
            handleNotificationError(error, notificationText);
        }
    } else {
        console.log("Notification permission is not granted.");
        getNotification(); // Request permission if not granted
    }
}

function handlePermission(permission) {
    switch (permission) {
        case "granted":
            // showNotification('Notification Granted', 'Notifications are allowed');
            break;
        case "denied":
            alert("The user denied permission for notifications.");
            break;
        default:
            alert("Notification permission status: " + permission);
    }
}

function handleNotificationError(error, notificationText) {
    if (error instanceof TypeError && error.message.includes("Illegal constructor")) {
        console.log("Error creating notification, falling back to service worker:", error);

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("Pontual!", {
                    body: notificationText || "Test notification",
                    icon: "public/icons/icon.png"
                });
            }).catch((error) => {
                console.log("Error showing notification via Service Worker:", error);
            });
        } else {
            console.log("Service workers are not supported.");
        }
    } else {
        console.error("Error creating notification:", error);
    }
}

async function sendDataToServer() {
    const checkbox = document.getElementById('checkbox');
    if (!checkbox) {
        console.error('Checkbox element not found');
        return;
    }
    const isChecked = checkbox.checked;
    const inputElement = document.getElementById('box').value;

    try {
        // await getLocation(); // Make sure this function populates `latitude` and `longitude`
    } catch (error) {
        console.error("Error getting location:", error);
        // Handle location error (e.g., set default values)
        latitude = null;
        longitude = null;
    }

    const data = {
        latitude: latitude,
        longitude: longitude,
        isChecked: isChecked,
        userInput: inputElement,
        userAgent: navigator.userAgent
    };

    try {
        const response = await fetch("/funcionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Data sent successfully to the server.");
        } else {
            throw new Error("Failed to send data to the server.");
        }
    } catch (error) {
        console.error("Error sending the request:", error);
        // If sending fails, save to IndexedDB
        saveDataToIndexedDB(data);
    }
}
