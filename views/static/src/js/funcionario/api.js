// src/js/funcionario/api.js

async function getLocation() {
  return new Promise(async (resolve, reject) => {
    if (!latitude || !longitude) {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              document.getElementById("latitude").value = latitude;
              document.getElementById("longitude").value = longitude;
              resolve({ latitude, longitude });
            },
            function (error) {
              reject(error);
            },
            { enableHighAccuracy: false }
          );
        } else {
          throw new Error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        reject(error);
      }
    } else {
      resolve({ latitude, longitude });
    }
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

function sendDataToServer() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/funcionario", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	var inputElement = document.getElementById('box').value;
	getLocation()
	var data = {
		"latitude": latitude,
		"longitude": longitude,
		"isChecked": checkbox.checked,
		"userInput": inputElement,
		"userAgent" : navigator.userAgent
	};

    try {
        xhr.send(JSON.stringify(data));
    } catch (error) {
        console.error("Error sending the request:", error);
    }
	
    xhr.onload = async function () {
        try {
            if (xhr.status === 200) {
                console.log("200 - OK");
            } else {
                console.error("Code:" + xhr.status);
            }
        } catch (error) {
            console.error("Error in xhr.onload:", error);
        }
    };
}
