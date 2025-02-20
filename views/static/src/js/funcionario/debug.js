let lineAdjust = ' \n';
let isDebugMode = true; // Ensure it's defined

// Override console.log
const originalLog = console.log;
console.log = function(...args) {
    originalLog.apply(console, args);
    alert('Console: ' + args.join(' '));
};

// Override console.error
const originalError = console.error;
console.error = function(...args) {
    originalError.apply(console, args);
    alert('Error: ' + args.join(' '));
};

// Override console.debug
const originalDebug = console.debug;
console.debug = function(...args) {
    if (isDebugMode) {
        originalDebug.apply(console, args);
        alert('Debug: ' + args.join(' '));
    }
};

// Function to handle errors
function handleErrors(error) {
    if (error && !(error instanceof ReferenceError) && !(error instanceof SyntaxError)) {
        alert('Caught Exception: ' + error.name + lineAdjust + error.message + lineAdjust + error.stack);
    }
}

// Override global error handling
window.onerror = function(message, source, lineno, colno, error) {
    handleErrors(error);
    alert('Global Exception: ' + error.name + lineAdjust + error.message + lineAdjust + error.stack);
};
