// src/js/funcionario/api.js

function sendDataToServer() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/funcionario", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var isChecked = checkbox.checked;
	var inputElement = document.getElementById('box').value;
	getLocation()
	var data = {
		"latitude": latitude,
		"longitude": longitude,
		"isChecked": isChecked,
		"descricao": inputElement,
		"user-agent" : navigator.userAgent
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

function getNotification() {
    if (!("Notification" in window)) {
        console.log("Notifications API is not supported in this browser.");
        return;
    }

    if (Notification.permission === "default") {
        Notification.requestPermission()
            .then((permission) => {
                console.log("Notification permission status:", permission);
            })
            .catch((error) => {
                console.error("Error requesting notification permission:", error);
            });
    } else {
        console.log("Notification permission already:", Notification.permission);
    }
}

function showNotification(notificationText) {
    if (!("Notification" in window)) {
        console.log("Notifications API is not supported in this browser.");
        return;
    }

    if (Notification.permission === "granted") {
        try {
            // Try using the Notifications API directly
            new Notification("Pontual!", {
                body: notificationText || "Test notification",
                icon: "public/icons/icon.png"
            });
        } catch (error) {
            // If an error occurs (such as the 'Illegal constructor' error), fallback to service worker
            if (error instanceof TypeError && error.message.includes("Illegal constructor")) {
                console.log("Error creating notification, falling back to service worker:", error);

                // Fallback to service worker notification
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
    } else {
        console.log("Notification permission not granted.");
        getNotification(); // Request permission if not granted
    }
}
