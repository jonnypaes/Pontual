function getUrlParameters(parameter, staticURL, decode) {
  var currLocation = staticURL && staticURL.length ? staticURL : window.location.search;

  // Attempt to get the substring after '?' and safely split it into 'key=value' parts
  var parArr = currLocation.split("?")[1]?.split("&");
  if (!parArr) {
    return null; // Return null if there are no parameters at all
  }

  // Iterate over each 'key=value' pair
  for (var i = 0; i < parArr.length; i++) {
    var parr = parArr[i].split("=");

    // Check if the current parameter name matches the one we're looking for
    if (parr[0] === parameter) {
      // Return an empty string if the parameter is present but has no value after '='
      // This handles cases like 'key='
      if (parr.length === 1 || parr[1] === '') {
        return "";
      } else {
        // If the parameter has a value, return it (decoded if necessary)
        return decode ? decodeURIComponent(parr[1]) : parr[1];
      }
    }
  }

  // Return null if the parameter is not found
  return null;
}

const isDebugMode = getUrlParameters('debug', '', false);
const isChecked = getUrlParameters('checked', '', true);