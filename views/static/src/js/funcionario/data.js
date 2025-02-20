// src/js/funcionario/data.js

function getUrlParameters(parameter, staticURL, decode) {
  var currLocation = staticURL && staticURL.length ? staticURL : window.location.search;
  var urlParams = new URLSearchParams(currLocation);

  // Check if the parameter exists and return its value (decoded if necessary)
  if (urlParams.has(parameter)) {
    let value = urlParams.get(parameter);
    
    // If the value is 'false' (string), return boolean false
    if (value === 'false') {
      return false;
    }
    
    // Return the value (decoded if necessary)
    return decode ? decodeURIComponent(value) : value;
  }

  // Return boolean false if the parameter is not found
  return false;
}

const isDebugMode = getUrlParameters('debug', '', false);
const isChecked = getUrlParameters('checked', '', true);
const isVerbose = getUrlParameters('verbose', '', false);
