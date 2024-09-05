function getLocation() {
    return new Promise(async (resolve, reject) => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
					
                    document.getElementById("latitude").value = latitude;
                    document.getElementById("longitude").value = longitude;
                    resolve();
                }, function (error) {
                    reject(error); 
                });
            } else {
                throw new Error("Geolocation is not supported by this browser.");
            }
        } catch (error) {
            reject(error);
        }
    });
}
	
function sendDataToServer() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/funcionario", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    getLocation()
	var data = {
		"latitude": latitude,
		"longitude": longitude,
		"isChecked": isChecked
	};

    try {
        xhr.send(JSON.stringify(data));
    } catch (error) {
        console.error("Error sending the request:", error);
    }

    xhr.onload = function () {
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

	xhr.onload = function () {
		if (xhr.status === 200) {
			console.log("200 - OK");
		} else {
			console.error("code:" + xhr.status);
		}
	};
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        if ("Notification" in window) {
            const permission = await Notification.requestPermission();
            handlePermission(permission);
        } else {
            console.log("Notifications API is not supported in this browser.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

function handlePermission(permission) {
    switch (permission) {
        case "granted":
            //showNotification();
            break;
        case "denied":
            console.log("The user denied permission for notifications.");
            break;
        default:
            console.log("Notification permission status: " + permission);
    }
}

function showNotification() {
    try {
        new Notification("Pontual!", {
            body: "Test notification",
            icon: "icons/icon.png"
        });
    } catch (notificationError) {
        console.log('Error creating notification:', notificationError);
    }
}